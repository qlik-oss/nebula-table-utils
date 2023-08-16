/* eslint-disable import/no-cycle */
import React from 'react';
import { PopoverOrigin } from '@mui/material';
import { MenuItemGroup } from '../types';
import MenuGroupWrapper from './MenuGroupWrapper';
import { StyledMenu } from '../styles';

interface RecursiveMenuListProps {
  open: boolean;
  anchorEl: HTMLDivElement | null;
  onClose: () => void;
  menuGroups: MenuItemGroup[];
  transformOrigin?: PopoverOrigin; // eslint-disable-line react/require-default-props
  anchorOrigin?: PopoverOrigin; // eslint-disable-line react/require-default-props
  ariaLabel?: string; // eslint-disable-line react/require-default-props
  isSubMenu?: boolean;
  handleHeadCellMenuKeyDown: (evt: React.KeyboardEvent<HTMLLIElement>) => void;
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
      className="sn-table-head-menu"
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
