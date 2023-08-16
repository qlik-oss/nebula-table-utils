import React, { useState, useCallback, useEffect } from 'react';
import useFieldSelection from './use-field-selection';
import RecursiveMenuList from './MenuList/RecursiveMenuList';
import { getMenuItemGroups } from './utils';
import Menu from '@qlik-trial/sprout/icons/Menu';
import { HeadCellMenuWrapper, StyledMenuButton } from './styles';
import {
  AdjustColumnSizeRelatedArgs,
  ExtendedLayout,
  FlagsArgs,
  HeadCellMenuProps,
  SearchRelatedArgs,
  SelectionRelatedArgs,
  SortingRelatedArgs,
} from './types';

const HeadCellMenu = <T extends HeadCellMenuProps>({
  column,
  tabIndex,
  anchorRef,
  translator,
  handleHeadCellMenuKeyDown,
  menuAvailabilityFlags,

  // sorting
  sortFromMenu,
  changeActivelySortedColumn,
  // search
  embed,
  listboxRef,
  interactions,
  // selection
  app,
  model,
  // adjust col size
  setFocusOnClosetColumnAdjuster,
}: T &
  FlagsArgs<T['menuAvailabilityFlags']> &
  SortingRelatedArgs &
  SearchRelatedArgs &
  SelectionRelatedArgs &
  AdjustColumnSizeRelatedArgs) => {
  const { headTextAlign, qLibraryId, fieldId } = column;
  const [openMenuDropdown, setOpenMenuDropdown] = useState(false);
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
  }, [embed, fieldId, qLibraryId]);

  useEffect(() => {
    if (!openMenuDropdown) resetSelectionActionsEnabledStatus();
  }, [openMenuDropdown, resetSelectionActionsEnabledStatus]);

  return (
    <HeadCellMenuWrapper rightAligned={headTextAlign === 'right'}>
      <StyledMenuButton
        size="small"
        tabIndex={tabIndex}
        id="sn-table-head-menu-button"
        aria-controls={openMenuDropdown ? 'sn-table-head-menu' : undefined}
        aria-expanded={openMenuDropdown ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleOpenDropdown}
        aria-label={translator.get('SNTable.Accessibility.ColumnOptions')}
      >
        <Menu />
      </StyledMenuButton>

      <RecursiveMenuList
        open={openMenuDropdown}
        anchorEl={anchorRef.current}
        onClose={() => setOpenMenuDropdown(false)}
        menuGroups={getMenuItemGroups({
          column,
          translator,
          menuAvailabilityFlags,
          setOpenMenuDropdown,

          // sort
          sortFromMenu,
          changeActivelySortedColumn,

          // search
          interactions,
          embedListbox,

          // selection
          fieldInstance,
          selectionActionsEnabledStatus,

          // Adjust col size
          anchorRef,
          setFocusOnClosetColumnAdjuster,
        })}
        ariaLabel="sn-table-head-menu-button"
        handleHeadCellMenuKeyDown={handleHeadCellMenuKeyDown}
      />
    </HeadCellMenuWrapper>
  );
};

export default HeadCellMenu;
