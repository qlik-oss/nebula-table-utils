/* eslint-disable import/no-cycle */
import React from 'react';
import type { MenuItemGroup } from '../types';
import { StyledDivider } from '../styles';
import MenuGroup from './MenuGroup';

interface MenuItemsProps {
  itemGroups: MenuItemGroup[];
  isSubMenu?: boolean;
  handleHeadCellMenuKeyDown: (evt: React.KeyboardEvent<HTMLLIElement>) => void;
}

const MenuGroupWrapper = ({ itemGroups, isSubMenu, handleHeadCellMenuKeyDown }: MenuItemsProps) => {
  return itemGroups.map((group, index) => [
    MenuGroup({ menuGroup: group, isSubMenu, handleHeadCellMenuKeyDown }),
    index < itemGroups.length - 1 ? (
      <StyledDivider data-testid="group-divider" variant="middle" key="divider" />
    ) : undefined,
  ]);
};

export default MenuGroupWrapper;
