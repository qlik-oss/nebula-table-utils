import React, { useState, useMemo, useCallback, useEffect } from 'react';

import Menu from '@qlik-trial/sprout/icons/Menu';
import Descending from '@qlik-trial/sprout/icons/react/Descending';
import Ascending from '@qlik-trial/sprout/icons/react/Ascending';
import Search from '@qlik-trial/sprout/icons/react/Search';
import Selection from '@qlik-trial/sprout/icons/react/Selection';
import SelectAll from '@qlik-trial/sprout/icons/react/SelectAll';
import ClearSelections from '@qlik-trial/sprout/icons/react/ClearSelections';
import SelectPossible from '@qlik-trial/sprout/icons/react/SelectPossible';
import SelectAlternative from '@qlik-trial/sprout/icons/react/SelectAlternative';
import SelectExcluded from '@qlik-trial/sprout/icons/react/SelectExcluded';
import ColumnSize from '@qlik-trial/sprout/icons/react/ColumnSize';

import useFieldSelection from './use-field-selection';
import RecursiveMenuList from './MenuList/RecursiveMenuList';
import { Button } from '@mui/material';
import { HeadCellMenuWrapper } from './styles';
import {
  AdjustColumnSizeRelatedArgs,
  ExtendedLayout,
  FlagsArgs,
  HeadCellMenuProps,
  SearchRelatedArgs,
  MenuAvailabilityFlags,
  MenuItemGroup,
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

  // TODO:
  // maybe not needed!
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

  const menuItemGroups = useMemo<MenuItemGroup[]>(() => {
    const mGrps: MenuItemGroup[] = [];

    // check sorting flag
    if (menuAvailabilityFlags[MenuAvailabilityFlags.SORTING]) {
      mGrps.push([
        {
          id: 1,
          itemTitle: translator.get('SNTable.MenuItem.SortAscending'),
          onClick: (evt: React.MouseEvent<HTMLLIElement>) => {
            sortFromMenu(evt, 'A');
            setOpenMenuDropdown(false);
            changeActivelySortedColumn?.(column);
          },
          icon: <Ascending />,
          enabled: true,
          isActive: column.isActivelySorted && column.sortDirection == 'A',
        },
        {
          id: 2,
          itemTitle: translator.get('SNTable.MenuItem.SortDescending'),
          onClick: (evt: React.MouseEvent<HTMLLIElement>) => {
            sortFromMenu(evt, 'D');
            setOpenMenuDropdown(false);
            changeActivelySortedColumn?.(column);
          },
          icon: <Descending />,
          enabled: true,
          isActive: column.isActivelySorted && column.sortDirection == 'D',
        },
      ]);
    }

    // distinguish between measure and dim menu items
    if (column.isDim && interactions?.select) {
      const grp = [];
      // check searching flag
      if (menuAvailabilityFlags[MenuAvailabilityFlags.SEARCHING]) {
        grp.push([
          {
            id: 1,
            itemTitle: translator.get('SNTable.MenuItem.Search'),
            onClick: (evt: React.MouseEvent<HTMLLIElement>) => {
              evt.stopPropagation();
              setOpenMenuDropdown(false);
              setOpenListboxDropdown(true);
              embedListbox();
            },
            icon: <Search />,
            enabled: true,
          },
        ]);
      }

      // check selections flag
      if (menuAvailabilityFlags[MenuAvailabilityFlags.SELECTIONS]) {
        grp.push([
          {
            id: 1,
            itemTitle: translator.get('SNTable.MenuItem.Selections'),
            icon: <Selection />,
            enabled: true,
            subMenus: [
              [
                {
                  id: 1,
                  itemTitle: translator.get('SNTable.MenuItem.SelectAll'),
                  onClick: async () => {
                    setOpenMenuDropdown(false);
                    await fieldInstance?.selectAll();
                  },
                  icon: <SelectAll />,
                  enabled: selectionActionsEnabledStatus.canSelectAll,
                },
                {
                  id: 2,
                  itemTitle: translator.get('SNTable.MenuItem.SelectPossible'),
                  onClick: async () => {
                    setOpenMenuDropdown(false);
                    await fieldInstance?.selectPossible();
                  },
                  icon: <SelectPossible />,
                  enabled: selectionActionsEnabledStatus.canSelectPossible,
                },
                {
                  id: 3,
                  itemTitle: translator.get('SNTable.MenuItem.SelectAlternative'),
                  onClick: async () => {
                    setOpenMenuDropdown(false);
                    await fieldInstance?.selectAlternative();
                  },
                  icon: <SelectAlternative />,
                  enabled: selectionActionsEnabledStatus.canSelectAlternative,
                },
                {
                  id: 4,
                  itemTitle: translator.get('SNTable.MenuItem.SelectExcluded'),
                  onClick: async () => {
                    setOpenMenuDropdown(false);
                    await fieldInstance?.selectExcluded();
                  },
                  icon: <SelectExcluded />,
                  enabled: selectionActionsEnabledStatus.canSelectExcluded,
                },
              ],
              [
                {
                  id: 1,
                  itemTitle: translator.get('SNTable.MenuItem.ClearSelections'),
                  onClick: async () => {
                    setOpenMenuDropdown(false);
                    await fieldInstance?.clear();
                  },
                  icon: <ClearSelections />,
                  enabled: selectionActionsEnabledStatus.canClearSelections,
                },
              ],
            ],
          },
        ]);
      }

      if (grp.length > 0) mGrps.push(...grp);
    }

    // check adjustColumnSize flag
    if (menuAvailabilityFlags[MenuAvailabilityFlags.ADJUST_COLUMN_SIZE]) {
      mGrps.push([
        {
          id: 1,
          itemTitle: translator.get('SNTable.MenuItem.AdjustColumnSize'),
          onClick: (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
            evt.stopPropagation();
            evt.preventDefault();
            setOpenMenuDropdown(false);
            setFocusOnClosetColumnAdjuster(anchorRef);
          },
          icon: <ColumnSize />,
          enabled: true,
        },
      ]);
    }

    return mGrps;
  }, [translator, column, interactions?.select, selectionActionsEnabledStatus, menuAvailabilityFlags]);

  return (
    <HeadCellMenuWrapper rightAligned={headTextAlign === 'right'}>
      <Button
        style={{ minWidth: 'unset' }}
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
      </Button>

      <RecursiveMenuList
        open={openMenuDropdown}
        anchorEl={anchorRef.current}
        onClose={() => setOpenMenuDropdown(false)}
        menuGroups={menuItemGroups}
        ariaLabel="sn-table-head-menu-button"
        handleHeadCellMenuKeyDown={handleHeadCellMenuKeyDown}
      />
    </HeadCellMenuWrapper>
  );
};

export default HeadCellMenu;
