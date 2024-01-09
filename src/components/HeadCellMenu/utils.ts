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
import { type HeaderData, MenuAvailabilityFlags, type MenuItemGroup, type SortingRelatedArgs } from './types';

export type GetMenuItemGroupsArgs = Partial<SortingRelatedArgs> & {
  headerData: HeaderData;
  translator: stardust.Translator;
  menuAvailabilityFlags: Partial<Record<MenuAvailabilityFlags, boolean>>;
  setOpen: (state: boolean) => void;

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
  setOpen,

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

  /**
   * PLEASE KEEP THIS IN MIND:
   * In order to handle the a11y requirements correctly through keyboard navigation, we need to
   * pass true to autoFocus prop for *the first list item that is enabled*. Currently, sorting
   * is the first item in list, so it takes case of `autoFocus: true` in it's own menu list items
   * (based on menu being sorted asc or desc and if menu item is Actively sorted). if this bahviour
   * changes in future, again, what ever menu item is going to sit on top of the menu list,
   * has to have `autoFocus: true`!
   */

  // check sorting flag
  if (menuAvailabilityFlags[MenuAvailabilityFlags.SORTING]) {
    mGrps.push([
      {
        groupHeading: translator.get('NebulaTableUtils.MenuGroupLabel.Sorting'),
        items: [
          {
            id: 1,
            itemTitle: translator.get('NebulaTableUtils.MenuItemLabel.SortAscending'),
            onClick: async (evt: React.MouseEvent<HTMLLIElement>) => {
              evt.stopPropagation();
              await sortFromMenu?.(evt, 'A');
              setOpen(false);
              await changeActivelySortedHeader?.(headerData);
            },
            icon: Ascending,
            enabled: headerData.isActivelySorted ? true : headerData.sortDirection === 'D',
            isActive: headerData.isActivelySorted && headerData.sortDirection === 'A',
            autoFocus: headerData.isActivelySorted
              ? headerData.sortDirection === 'A'
              : headerData.sortDirection === 'D',
          },
          {
            id: 2,
            itemTitle: translator.get('NebulaTableUtils.MenuItemLabel.SortDescending'),
            onClick: async (evt: React.MouseEvent<HTMLLIElement>) => {
              evt.stopPropagation();
              await sortFromMenu?.(evt, 'D');
              setOpen(false);
              await changeActivelySortedHeader?.(headerData);
            },
            icon: Descending,
            enabled: headerData.isActivelySorted ? true : headerData.sortDirection === 'A',
            isActive: headerData.isActivelySorted && headerData.sortDirection === 'D',
            autoFocus: headerData.isActivelySorted
              ? headerData.sortDirection === 'D'
              : headerData.sortDirection === 'A',
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
              itemTitle: translator.get('NebulaTableUtils.MenuItemLabel.Search'),
              onClick: (evt: React.MouseEvent<HTMLLIElement>) => {
                evt.stopPropagation();
                setOpen(false);
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
              itemTitle: translator.get('NebulaTableUtils.MenuItemLabel.Selections'),
              icon: Selection,
              enabled: true,
              subMenus: [
                [
                  {
                    items: [
                      {
                        id: 1,
                        itemTitle: translator.get('NebulaTableUtils.MenuItemLabel.SelectAll'),
                        onClick: async (evt: React.MouseEvent) => {
                          evt.stopPropagation();
                          setOpen(false);
                          await fieldInstance?.selectAll();
                        },
                        icon: SelectAll,
                        enabled: selectionActionsEnabledStatus.canSelectAll,
                      },
                      {
                        id: 2,
                        itemTitle: translator.get('NebulaTableUtils.MenuItemLabel.SelectPossible'),
                        onClick: async (evt: React.MouseEvent) => {
                          evt.stopPropagation();
                          setOpen(false);
                          await fieldInstance?.selectPossible();
                        },
                        icon: SelectPossible,
                        enabled: selectionActionsEnabledStatus.canSelectPossible,
                      },
                      {
                        id: 3,
                        itemTitle: translator.get('NebulaTableUtils.MenuItemLabel.SelectAlternative'),
                        onClick: async (evt: React.MouseEvent) => {
                          evt.stopPropagation();
                          setOpen(false);
                          await fieldInstance?.selectAlternative();
                        },
                        icon: SelectAlternative,
                        enabled: selectionActionsEnabledStatus.canSelectAlternative,
                      },
                      {
                        id: 4,
                        itemTitle: translator.get('NebulaTableUtils.MenuItemLabel.SelectExcluded'),
                        onClick: async (evt: React.MouseEvent) => {
                          evt.stopPropagation();
                          setOpen(false);
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
                        itemTitle: translator.get('NebulaTableUtils.MenuItemLabel.ClearSelections'),
                        onClick: async (evt: React.MouseEvent) => {
                          evt.stopPropagation();
                          setOpen(false);
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
            itemTitle: translator.get('NebulaTableUtils.MenuItemLabel.AdjustColumnSize'),
            onClick: (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              evt.stopPropagation();
              evt.preventDefault();
              setOpen(false);
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
