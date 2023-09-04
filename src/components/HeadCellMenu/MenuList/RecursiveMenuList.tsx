/* eslint-disable import/no-cycle */
import React from 'react';
import type { PopoverOrigin } from '@mui/material';
import type { MenuItemGroup } from '../types';
import MenuGroupWrapper from './MenuGroupWrapper';
import { StyledMenu } from '../styles';

interface RecursiveMenuListProps {
  open: boolean;
  anchorEl: HTMLDivElement | null;
  onClose: () => void;
  menuGroups: MenuItemGroup[];
  transformOrigin?: PopoverOrigin;
  anchorOrigin?: PopoverOrigin;
  ariaLabel?: string;
  isSubMenu?: boolean;
  handleHeadCellMenuKeyDown?: (evt: React.KeyboardEvent<HTMLLIElement>) => void;
}

const RecursiveMenuList = ({
  anchorEl,
  open,
  onClose,
  ariaLabel,
  menuGroups,
  transformOrigin,
  anchorOrigin,
  isSubMenu,
  handleHeadCellMenuKeyDown,
}: RecursiveMenuListProps) => {
  if (!menuGroups.length) return null;
  return (
    <StyledMenu
      className="nebula-table-utils-head-menu"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      aria-labelledby={ariaLabel}
      {...(anchorOrigin ? { anchorOrigin } : {})}
      {...(transformOrigin ? { transformOrigin } : {})}
    >
      {MenuGroupWrapper({ itemGroups: menuGroups, isSubMenu, handleHeadCellMenuKeyDown })}
    </StyledMenu>
  );
};

export default RecursiveMenuList;
