/* eslint-disable import/no-cycle */
import React, { useState, useRef, useCallback } from 'react';
import ArrowRight from '@qlik-trial/sprout/icons/react/ArrowRight';
import type { ExtendedHeadCellMenuItem, MenuItemGroup } from '../types';
import {
  StyledMenuItem,
  StyledListItemIcon,
  StyledMenuItemLabel,
  StyledGroupLabel,
  StyledGreenBorder,
  StyledListItemLabel,
} from '../styles';
import RecursiveMenuList from './RecursiveMenuList';

export const interceptClickOnMenuItems = (menuSections: MenuItemGroup[], cache: SubMenusOpenStatusCache) =>
  menuSections.map((menuGroups) =>
    menuGroups.map((group) => ({
      ...(group.groupHeading ? { groupHeading: group.groupHeading } : {}),
      items: group.items?.map(({ onClick, ...restProps }) => ({
        ...restProps,
        ...(onClick
          ? {
              onClick: async (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                // reset all opened submenu levels here!
                Object.entries(cache).map(([, setter]) => setter(false));
                await onClick(evt);
              },
            }
          : {}),
      })),
    }))
  );

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

  const handleOnClick = async (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (evt.type === 'keyup') return;
    if (onClick) {
      await onClick(evt);
      subMenusOpenStatusCache = {};
    }
    if (subMenus?.length) {
      setOpenMenu(true);
      subMenusOpenStatusCache[itemTitle] = setOpenMenu;
    }
  };

  const handleRecursiveMenuOnClose = useCallback(
    (evt: React.MouseEvent) => {
      evt.stopPropagation();
      setOpenMenu(false);
    },
    [setOpenMenu]
  );

  return (
    <>
      <StyledMenuItem
        ref={subMenus ? (anchorRef as React.RefObject<HTMLLIElement>) : null}
        key={id}
        data-testid={`menu-item-${id}`}
        className="nebula-table-utils-head-menu-item"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={handleOnClick}
        disabled={!enabled}
        autoFocus={autoFocus}
        isSubMenu={!!isSubMenu}
        isActive={!!isActive}
        onKeyDown={handleHeadCellMenuKeyDown}
      >
        {isActive && <StyledGreenBorder />}
        <StyledMenuItemLabel>
          <StyledListItemIcon>
            <Icon />
          </StyledListItemIcon>
          <StyledListItemLabel variant="body2">{itemTitle}</StyledListItemLabel>
        </StyledMenuItemLabel>
        {subMenus?.length ? <ArrowRight /> : null}
      </StyledMenuItem>

      {subMenus?.length && (
        <RecursiveMenuList
          isSubMenu
          open={openMenu}
          anchorEl={anchorRef.current}
          onClose={handleRecursiveMenuOnClose}
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
  handleHeadCellMenuKeyDown?: (evt: React.KeyboardEvent<HTMLLIElement>) => void;
}) => {
  return menuGroup.map((grp) => [
    [
      grp.groupHeading && (
        <StyledGroupLabel disabled style={{ opacity: 1 }}>
          {grp.groupHeading}
        </StyledGroupLabel>
      ),
      grp.items?.map((groupItem) => (
        <MenuGroupItems key={groupItem.id} {...{ ...groupItem, isSubMenu, handleHeadCellMenuKeyDown }} />
      )),
    ].filter(Boolean),
  ]);
};

export default MenuGroup;
