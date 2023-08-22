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
import { HeaderData, MenuAvailabilityFlags, MenuItemGroup, SortingRelatedArgs } from './types';

export type GetMenuItemGroupsArgs = Partial<SortingRelatedArgs> & {
  headerData: HeaderData;
  translator: stardust.Translator;
  menuAvailabilityFlags: Partial<Record<MenuAvailabilityFlags, boolean>>;
  setOpenMenuDropdown: React.Dispatch<React.SetStateAction<boolean>>;

  // search
  embedListbox: () => void;
  interactions?: stardust.Interactions;

  // selection
  fieldInstance: EngineAPI.IField | null;
  selectionActionsEnabledStatus: Record<string, boolean>;

  // adjust col size
  anchorRef: React.RefObject<HTMLDivElement>;
  setFocusOnClosetHeaderAdjuster?: (anchorRef: React.RefObject<HTMLDivElement>) => void;
};

export const getMenuItemGroups = ({
  headerData,
  translator,
  menuAvailabilityFlags,
  setOpenMenuDropdown,

  // sort
  sortFromMenu,
  changeActivelySortedHeader,

  // search
  interactions,
  embedListbox,

  // selection
  fieldInstance,
  selectionActionsEnabledStatus,

  // Adjust col size
  anchorRef,
  setFocusOnClosetHeaderAdjuster,
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
            onClick: async (evt: React.MouseEvent<HTMLLIElement>) => {
              await sortFromMenu?.(evt, 'A');
              setOpenMenuDropdown(false);
              await changeActivelySortedHeader?.(headerData);
            },
            icon: Ascending,
            enabled: true,
            isActive: headerData.isActivelySorted && headerData.sortDirection === 'A',
          },
          {
            id: 2,
            itemTitle: translator.get('SNTable.MenuItem.SortDescending'),
            onClick: async (evt: React.MouseEvent<HTMLLIElement>) => {
              await sortFromMenu?.(evt, 'D');
              setOpenMenuDropdown(false);
              await changeActivelySortedHeader?.(headerData);
            },
            icon: Descending,
            enabled: true,
            isActive: headerData.isActivelySorted && headerData.sortDirection === 'D',
          },
        ],
      },
    ]);
  }

  // distinguish between measure and dim menu items
  if (headerData.isDim && interactions?.select) {
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

  // check adjustHeaderSize flag
  if (menuAvailabilityFlags[MenuAvailabilityFlags.ADJUST_HEADER_SIZE]) {
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
              setFocusOnClosetHeaderAdjuster?.(anchorRef);
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
