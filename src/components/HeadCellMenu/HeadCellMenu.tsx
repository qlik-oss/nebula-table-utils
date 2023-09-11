import React, { useCallback, useEffect } from 'react';
import Menu from '@qlik-trial/sprout/icons/Menu';
import useFieldSelection from './use-field-selection';
import RecursiveMenuList from './MenuList/RecursiveMenuList';
import { getMenuItemGroups } from './utils';
import { HeadCellMenuWrapper, StyledMenuButton } from './styles';
import type { HeadCellMenuProps } from './types';
import { useTranslations } from '../../hooks';

const HeadCellMenu = ({
  headerData,
  tabIndex,
  anchorRef,
  translator,
  handleHeadCellMenuKeyDown,
  menuAvailabilityFlags,
  sortRelatedArgs,
  searchRelatedArgs,
  selectionRelatedArgs,
  adjustHeaderSizeRelatedArgs,

  openMenuDropdown,
  setOpenMenuDropdown,
}: HeadCellMenuProps) => {
  const t = useTranslations({ translator });
  const { headTextAlign, qLibraryId, fieldId } = headerData;
  const {
    fieldInstance,
    selectionActionsEnabledStatus,
    resetSelectionActionsEnabledStatus,
    updateSelectionActionsEnabledStatus,
  } = useFieldSelection({ headerData, app: selectionRelatedArgs?.app });

  const embedListbox = useCallback(() => {
    const id = qLibraryId ? { qLibraryId, type: 'dimension' } : fieldId;
    if (searchRelatedArgs?.embed && searchRelatedArgs.listboxRef) {
      const { embed, listboxRef } = searchRelatedArgs;
      // @ts-expect-error TODO: no types for `__DO_NOT_USE__`, it will improve when it becomes stable
      embed.__DO_NOT_USE__.popover(listboxRef.current, id, {
        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
        transformOrigin: { vertical: 'top', horizontal: 'left' },
      });
    }
  }, [searchRelatedArgs, fieldId, qLibraryId]);

  useEffect(() => {
    if (!openMenuDropdown) {
      resetSelectionActionsEnabledStatus();

      if (selectionRelatedArgs?.model) {
        selectionRelatedArgs.model
          .getLayout()
          .then((layout) => {
            updateSelectionActionsEnabledStatus(layout as EngineAPI.IGenericHyperCubeLayout);
          })
          .catch((e) => console.error(e));
      }
    }
  }, [
    openMenuDropdown,
    resetSelectionActionsEnabledStatus,
    updateSelectionActionsEnabledStatus,
    selectionRelatedArgs?.model,
  ]);

  const handleOnClose = useCallback(
    (evt: React.MouseEvent) => {
      evt.stopPropagation();
      setOpenMenuDropdown(false);
    },
    [setOpenMenuDropdown]
  );

  return (
    <HeadCellMenuWrapper rightAligned={headTextAlign === 'right'}>
      <StyledMenuButton
        size="small"
        tabIndex={tabIndex}
        id="nebula-table-utils-head-menu-button"
        aria-controls={openMenuDropdown ? 'nebula-table-utils-head-menu' : undefined}
        aria-expanded={openMenuDropdown ? 'true' : undefined}
        aria-haspopup="true"
        data-testid="nebula-table-utils-head-menu-button"
      >
        <Menu />
      </StyledMenuButton>

      <RecursiveMenuList
        open={openMenuDropdown}
        anchorEl={anchorRef.current}
        onClose={handleOnClose}
        menuGroups={getMenuItemGroups({
          headerData,
          translator: t,
          menuAvailabilityFlags,
          setOpenMenuDropdown,
          // sort
          ...sortRelatedArgs,
          // search
          embedListbox,
          interactions: searchRelatedArgs?.interactions,
          // selection
          fieldInstance,
          selectionActionsEnabledStatus,
          // Adjust col size
          anchorRef,
          setFocusOnClosetHeaderAdjuster: adjustHeaderSizeRelatedArgs?.setFocusOnClosetHeaderAdjuster,
        })}
        ariaLabel="nebula-table-utils-head-menu-button"
        handleHeadCellMenuKeyDown={handleHeadCellMenuKeyDown}
      />
    </HeadCellMenuWrapper>
  );
};

export default HeadCellMenu;
