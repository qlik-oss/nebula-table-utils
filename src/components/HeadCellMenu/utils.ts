import { HeadCellMenuItem, MenuItemGroup, MenuTypes } from './types';

interface TuneMenuItemGroupsArgs {
  menuItemGroups: MenuItemGroup[];
  selectionActionsEnabledStatus: Record<string, boolean>;
  setOpenMenuDropdown: (value: React.SetStateAction<boolean>) => void;

  sortingCallback: (evt: React.MouseEvent<HTMLLIElement>) => void;
  searchCallback: (evt: React.MouseEvent<HTMLLIElement>) => void;

  selectAllCallback: (evt: React.MouseEvent<HTMLLIElement>) => void;
  selectPossibleCallback: (evt: React.MouseEvent<HTMLLIElement>) => void;
  selectAlternativeCallback: (evt: React.MouseEvent<HTMLLIElement>) => void;
  selectExcludedCallback: (evt: React.MouseEvent<HTMLLIElement>) => void;
  clearSelectCallback: (evt: React.MouseEvent<HTMLLIElement>) => void;

  adsjustColumnSizeCallback: (evt: React.MouseEvent<HTMLLIElement>) => void;
}

export const tuneMenuItemGroups = ({
  menuItemGroups,
  selectionActionsEnabledStatus,
  setOpenMenuDropdown,

  sortingCallback,
  searchCallback,
  selectAllCallback,
  selectPossibleCallback,
  selectAlternativeCallback,
  selectExcludedCallback,
  clearSelectCallback,

  adsjustColumnSizeCallback,
}: TuneMenuItemGroupsArgs) => {
  const selectionMenuItems = ['selectAll', 'selectPossible', 'selectAlternative', 'selectExcluded', 'clearSelect'];
  let helper = (mGrps: HeadCellMenuItem | MenuItemGroup | MenuItemGroup[]) => {
    if (Array.isArray(mGrps)) {
      for (let mGrp of mGrps) helper(mGrp);
    } else if (typeof mGrps === 'object' && mGrps !== undefined) {
      const currOnClick = mGrps.onClick;

      // for all selection items `enabled` ties to fieldInstance status
      // that is why we need to set it from here
      const isSelectionMenu = selectionMenuItems.includes(mGrps.menuType);
      if (isSelectionMenu) {
        let key = `can${mGrps.menuType[0].toUpperCase()}${mGrps.menuType.slice(1)}`;
        mGrps.enabled = selectionActionsEnabledStatus[key];
      }

      if (mGrps.onClick) {
        mGrps.onClick = (evt: React.MouseEvent<HTMLLIElement>) => {
          currOnClick?.(evt);
          setOpenMenuDropdown(false);

          if (mGrps.menuType === MenuTypes.SORTING) sortingCallback(evt);
          if (mGrps.menuType === MenuTypes.SEARCH) searchCallback(evt);
          if (mGrps.menuType === MenuTypes.SELECT_ALL) selectAllCallback(evt);
          if (mGrps.menuType === MenuTypes.SELECT_POSSIBLE) selectPossibleCallback(evt);
          if (mGrps.menuType === MenuTypes.SELECT_ALTERNATIVE) selectAlternativeCallback(evt);
          if (mGrps.menuType === MenuTypes.SELECT_EXCLUDED) selectExcludedCallback(evt);
          if (mGrps.menuType === MenuTypes.CLEAR_SELECT) clearSelectCallback(evt);
          if (mGrps.menuType === MenuTypes.ADJUST_COLUMN_SIZE) adsjustColumnSizeCallback(evt);
        };
      }

      // check if menu has sub menus
      if (mGrps.subMenus) {
        for (let subMen of mGrps.subMenus) helper(subMen);
      }
    }
  };

  helper(menuItemGroups);
  return menuItemGroups;
};
