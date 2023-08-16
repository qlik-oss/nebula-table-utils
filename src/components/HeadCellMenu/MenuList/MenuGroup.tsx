/* eslint-disable import/no-cycle */
import React, { useState, useRef } from 'react';
import Typography from '@mui/material/Typography';
import ArrowRight from '@qlik-trial/sprout/icons/react/ArrowRight';
import { ExtendedHeadCellMenuItem, MenuItemGroup } from '../types';
import {
  StyledMenuItem,
  StyledListItemIcon,
  StyledMenuItemLabel,
  StyledGroupLabel,
  StyledGreenBorder,
} from '../styles';
import RecursiveMenuList from './RecursiveMenuList';

export const interceptClickOnMenuItems = (menuGroups: MenuItemGroup[], cache: SubMenusOpenStatusCache) => {
  const result = menuGroups.map((group) =>
    group.map((grp) => ({
      groupHeading: grp.groupHeading,
      items: grp.items?.map(({ onClick, ...restProps }) => ({
        ...restProps,
        ...(onClick
          ? {
              onClick: (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                // reset all opened submenu levels here!
                Object.entries(cache).map(([, setter]) => setter(false));
                onClick(evt);
              },
            }
          : {}),
      })),
    }))
  );
  return result;
};

type SubMenusOpenStatusCache = Record<string, React.Dispatch<React.SetStateAction<boolean>>>;
let subMenusOpenStatusCache: SubMenusOpenStatusCache = {};

const MenuGroupItems = ({
  autoFocus,
  id,
  onClick,
  itemTitle,
  icon: Icon,
  enabled,
  subMenus,
  isSubMenu,
  isActive,
  handleHeadCellMenuKeyDown,
}: ExtendedHeadCellMenuItem) => {
  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  const handleOnClick = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (onClick) {
      onClick(evt);
      subMenusOpenStatusCache = {};
    }
    if (subMenus?.length) {
      setOpenMenu(true);
      subMenusOpenStatusCache[itemTitle] = setOpenMenu;
    }
  };

  return (
    <>
      <StyledMenuItem
        ref={subMenus ? anchorRef : null}
        key={id}
        data-testid={`menu-item-${id}`}
        className="sn-table-head-menu-item"
        onClick={handleOnClick}
        disabled={!enabled}
        autoFocus={autoFocus}
        onKeyDown={handleHeadCellMenuKeyDown}
        // TODO:
        // implement onKeyDown with handleHeadCellMenuKeyDown for sn-table
        isSubMenu={isSubMenu}
        isActive={isActive}
      >
        {isActive && <StyledGreenBorder />}
        <StyledMenuItemLabel>
          <StyledListItemIcon>
            <Icon />
          </StyledListItemIcon>
          <Typography variant="body2">{itemTitle}</Typography>
        </StyledMenuItemLabel>
        {subMenus?.length ? <ArrowRight /> : null}
      </StyledMenuItem>

      {subMenus?.length && (
        <RecursiveMenuList
          isSubMenu
          open={openMenu}
          anchorEl={anchorRef.current}
          onClose={() => setOpenMenu(false)}
          menuGroups={interceptClickOnMenuItems(subMenus, subMenusOpenStatusCache)}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          handleHeadCellMenuKeyDown={handleHeadCellMenuKeyDown}
        />
      )}
    </>
  );
};

const MenuGroup = ({
  menuGroup,
  isSubMenu,
  handleHeadCellMenuKeyDown,
}: {
  menuGroup: MenuItemGroup;
  isSubMenu?: boolean;
  handleHeadCellMenuKeyDown: (evt: React.KeyboardEvent<HTMLLIElement>) => void;
}) => {
  return menuGroup.map((grp) => [
    [
      grp.groupHeading && <StyledGroupLabel>Sorting</StyledGroupLabel>,
      grp.items?.map((groupItem) => (
        <MenuGroupItems key={groupItem.id} {...{ ...groupItem, isSubMenu, handleHeadCellMenuKeyDown }} />
      )),
    ].filter(Boolean),
  ]);
};

export default MenuGroup;
