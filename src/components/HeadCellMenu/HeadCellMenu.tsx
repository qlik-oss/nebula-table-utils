import React, { useCallback, useEffect } from 'react';
import Menu from '@qlik-trial/sprout/icons/Menu';
import useFieldSelection from './use-field-selection';
import RecursiveMenuList from './MenuList/RecursiveMenuList';
import { getMenuItemGroups } from './utils';
import { HeadCellMenuWrapper, StyledMenuButton } from './styles';
import type { HeadCellMenuProps } from './types';
import { useTranslations } from '../../hooks';
import { HEAD_CELL_MENU_BUTTON_CLASS } from '../../constants';

const HeadCellMenu = ({
  open,
  setOpen,
  anchorRef,
  headerData,
  translator,
  interactions,
  handleHeadCellMenuKeyDown,
  menuAvailabilityFlags,
  shouldShowMenuIcon = true,

  sortRelatedArgs,
  searchRelatedArgs,
  selectionRelatedArgs,
  adjustHeaderSizeRelatedArgs,
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
    if (!open) {
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
  }, [open, resetSelectionActionsEnabledStatus, updateSelectionActionsEnabledStatus, selectionRelatedArgs?.model]);

  const handleOnClose = useCallback(
    (evt: React.MouseEvent) => {
      evt.stopPropagation();
      setOpen(false);
    },
    [setOpen]
  );

  if (!interactions.active) return null;

  return (
    <HeadCellMenuWrapper rightAligned={headTextAlign === 'right'} shouldShowMenuIcon={shouldShowMenuIcon}>
      {shouldShowMenuIcon && (
        <StyledMenuButton
          size="small"
          className={HEAD_CELL_MENU_BUTTON_CLASS}
          data-testid={HEAD_CELL_MENU_BUTTON_CLASS}
          aria-controls={open ? 'nebula-table-utils-head-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          isInteractionsActive={interactions.active ?? false}
        >
          <Menu />
        </StyledMenuButton>
      )}

      <RecursiveMenuList
        open={open}
        anchorEl={anchorRef.current}
        onClose={handleOnClose}
        menuGroups={getMenuItemGroups({
          headerData,
          translator: t,
          menuAvailabilityFlags,
          setOpen,
          // sort
          ...sortRelatedArgs,
          // search
          embedListbox,
          interactions,
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
