import { stardust } from '@nebula.js/stardust';
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
import { Column, MenuAvailabilityFlags, MenuItemGroup, SortingRelatedArgs } from './types';

export type GetMenuItemGroupsArgs = SortingRelatedArgs & {
  column: Column;
  translator: stardust.Translator;
  menuAvailabilityFlags: Partial<Record<MenuAvailabilityFlags, boolean>>;
  setOpenMenuDropdown: React.Dispatch<React.SetStateAction<boolean>>;

  // search
  interactions: stardust.Interactions;
  embedListbox: () => void;

  // selection
  fieldInstance: EngineAPI.IField | null;
  selectionActionsEnabledStatus: Record<string, boolean>;

  // adjust col size
  anchorRef: React.RefObject<HTMLDivElement>;
  setFocusOnClosetColumnAdjuster: (anchorRef: React.RefObject<HTMLDivElement>) => void;
};

export const getMenuItemGroups = ({
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
}: GetMenuItemGroupsArgs): MenuItemGroup[] => {
  const mGrps: MenuItemGroup[] = [];

  // check sorting flag
  if (menuAvailabilityFlags[MenuAvailabilityFlags.SORTING]) {
    mGrps.push([
      {
        groupHeading: 'Sorting',
        items: [
          {
            id: 1,
            itemTitle: translator.get('SNTable.MenuItem.SortAscending'),
            onClick: (evt: React.MouseEvent<HTMLLIElement>) => {
              sortFromMenu(evt, 'A');
              setOpenMenuDropdown(false);
              changeActivelySortedColumn?.(column);
            },
            icon: Ascending,
            enabled: true,
            isActive: column.isActivelySorted && column.sortDirection === 'A',
          },
          {
            id: 2,
            itemTitle: translator.get('SNTable.MenuItem.SortDescending'),
            onClick: (evt: React.MouseEvent<HTMLLIElement>) => {
              sortFromMenu(evt, 'D');
              setOpenMenuDropdown(false);
              changeActivelySortedColumn?.(column);
            },
            icon: Descending,
            enabled: true,
            isActive: column.isActivelySorted && column.sortDirection === 'D',
          },
        ],
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
          items: [
            {
              id: 1,
              itemTitle: translator.get('SNTable.MenuItem.Search'),
              onClick: (evt: React.MouseEvent<HTMLLIElement>) => {
                evt.stopPropagation();
                setOpenMenuDropdown(false);
                embedListbox();
              },
              icon: Search,
              enabled: true,
            },
          ],
        },
      ]);
    }

    // check selections flag
    if (menuAvailabilityFlags[MenuAvailabilityFlags.SELECTIONS]) {
      grp.push([
        {
          items: [
            {
              id: 1,
              itemTitle: translator.get('SNTable.MenuItem.Selections'),
              icon: Selection,
              enabled: true,
              subMenus: [
                [
                  {
                    items: [
                      {
                        id: 1,
                        itemTitle: translator.get('SNTable.MenuItem.SelectAll'),
                        onClick: async () => {
                          setOpenMenuDropdown(false);
                          await fieldInstance?.selectAll();
                        },
                        icon: SelectAll,
                        enabled: selectionActionsEnabledStatus.canSelectAll,
                        isActive: true,
                      },
                      {
                        id: 2,
                        itemTitle: translator.get('SNTable.MenuItem.SelectPossible'),
                        onClick: async () => {
                          setOpenMenuDropdown(false);
                          await fieldInstance?.selectPossible();
                        },
                        icon: SelectPossible,
                        enabled: selectionActionsEnabledStatus.canSelectPossible,
                        isActive: true,
                      },
                      {
                        id: 3,
                        itemTitle: translator.get('SNTable.MenuItem.SelectAlternative'),
                        onClick: async () => {
                          setOpenMenuDropdown(false);
                          await fieldInstance?.selectAlternative();
                        },
                        icon: SelectAlternative,
                        enabled: selectionActionsEnabledStatus.canSelectAlternative,
                        isActive: true,
                      },
                      {
                        id: 4,
                        itemTitle: translator.get('SNTable.MenuItem.SelectExcluded'),
                        onClick: async () => {
                          setOpenMenuDropdown(false);
                          await fieldInstance?.selectExcluded();
                        },
                        icon: SelectExcluded,
                        enabled: selectionActionsEnabledStatus.canSelectExcluded,
                        isActive: true,
                      },
                    ],
                  },
                ],
                [
                  {
                    items: [
                      {
                        id: 1,
                        itemTitle: translator.get('SNTable.MenuItem.ClearSelections'),
                        onClick: async () => {
                          setOpenMenuDropdown(false);
                          await fieldInstance?.clear();
                        },
                        icon: ClearSelections,
                        enabled: selectionActionsEnabledStatus.canClearSelections,
                        isActive: true,
                      },
                    ],
                  },
                ],
              ],
            },
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
        items: [
          {
            id: 1,
            itemTitle: translator.get('SNTable.MenuItem.AdjustColumnSize'),
            onClick: (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              evt.stopPropagation();
              evt.preventDefault();
              setOpenMenuDropdown(false);
              setFocusOnClosetColumnAdjuster(anchorRef);
            },
            icon: ColumnSize,
            enabled: true,
          },
        ],
      },
    ]);
  }

  return mGrps;
};
