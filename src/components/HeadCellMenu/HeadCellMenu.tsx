import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import Menu from '@qlik-trial/sprout/icons/Menu';
import useFieldSelection from './use-field-selection';
import RecursiveMenuList from './MenuList/RecursiveMenuList';
import { Button } from '@mui/material';
import { HeadCellMenuWrapper } from './styles';
import { ExtendedLayout, HeadCellMenuProps } from './types';
import { tuneMenuItemGroups } from './utils';

const HeadCellMenu = ({
  column,
  tabIndex,
  menuItemGroups,
  anchorRef,
  embed,
  app,
  model,
  ariaLabel,
}: HeadCellMenuProps) => {
  const { headTextAlign, qLibraryId, fieldId } = column;

  // TODO:
  // this ref should come from table side -> to make it open from beganing of cell
  const listboxRef = useRef<HTMLDivElement>(null);
  const [openMenuDropdown, setOpenMenuDropdown] = useState(false);
  // TODO;
  // probably dont need this
  const [openListboxDropdown, setOpenListboxDropdown] = useState(false);

  const {
    fieldInstance,
    selectionActionsEnabledStatus,
    resetSelectionActionsEnabledStatus,
    updateSelectionActionsEnabledStatus,
  } = useFieldSelection({ column, app });

  const handleOpenDropdown = async () => {
    if (!openMenuDropdown && model) {
      const layout = await model.getLayout();
      updateSelectionActionsEnabledStatus(layout as ExtendedLayout);
    }
    setOpenMenuDropdown(!openMenuDropdown);
  };

  const embedListbox = useCallback(() => {
    const id = qLibraryId ? { qLibraryId, type: 'dimension' } : fieldId;
    // TODO:
    // @ts-ignore TODO: no types for `__DO_NOT_USE__`, it will improve when it becomes stable
    embed.__DO_NOT_USE__.popover(listboxRef.current, id, {
      anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
      transformOrigin: { vertical: 'top', horizontal: 'left' },
    });

    // @ts-ignore TODO: no types for popover related api until it becomes stable
    embed.on('fieldPopoverClose', () => {
      setOpenListboxDropdown(false);
    });
  }, [embed, fieldId, qLibraryId]);

  useEffect(() => {
    if (!openMenuDropdown) resetSelectionActionsEnabledStatus();
  }, [openMenuDropdown, resetSelectionActionsEnabledStatus]);

  return (
    <HeadCellMenuWrapper rightAligned={headTextAlign === 'right'}>
      <Button
        isVisible={true}
        ref={anchorRef}
        size="small"
        tabIndex={tabIndex}
        id="sn-table-head-menu-button"
        aria-controls={openMenuDropdown ? 'sn-table-head-menu' : undefined}
        aria-expanded={openMenuDropdown ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleOpenDropdown}
        aria-label={ariaLabel}
      >
        <Menu />
      </Button>
      <div ref={listboxRef} />

      <RecursiveMenuList
        open={openMenuDropdown}
        anchorEl={anchorRef.current}
        onClose={() => setOpenMenuDropdown(false)}
        ariaLabel="sn-table-head-menu-button"
        menuGroups={tuneMenuItemGroups({
          menuItemGroups,
          selectionActionsEnabledStatus,
          setOpenMenuDropdown,

          // callbacks which needs to run withing library scope
          sortingCallback: () => {},
          adsjustColumnSizeCallback: (evt) => {
            evt.stopPropagation();
            evt.preventDefault();
          },
          searchCallback: (evt) => {
            evt.stopPropagation();
            setOpenListboxDropdown(true);
            embedListbox();
          },
          selectAllCallback: async () => await fieldInstance?.selectAll(),
          selectPossibleCallback: async () => await fieldInstance?.selectPossible(),
          selectAlternativeCallback: async () => await fieldInstance?.selectAlternative(),
          selectExcludedCallback: async () => await fieldInstance?.selectExcluded(),
          clearSelectCallback: async () => await fieldInstance?.clear(),
        })}
      />
    </HeadCellMenuWrapper>
  );
};

export default HeadCellMenu;
