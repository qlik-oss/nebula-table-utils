import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { HEAD_CELL_MENU_WIDTH, HEAD_ICON_WRAPPER_SIZE } from '../../constants';
import { DefaultTheme } from '../../types';
import { Divider, ListItemIcon, MenuItem } from '@mui/material';

// ---------- HeadCellMenu ----------
export const HeadCellMenuWrapper = styled(Box)(({ rightAligned }: { rightAligned: boolean }) => ({
  ...(rightAligned ? { marginRight: 'auto' } : { marginLeft: 'auto' }),
  height: `${HEAD_ICON_WRAPPER_SIZE}px`,
  display: 'flex',
  fontWeight: 'bold',
  border: '1px dashed pink',
  width: '100%',
}));

// ---------- DropdownMenu ----------
export const StyledDivider = styled(Divider)(({ theme }: DefaultTheme) => ({
  '&.MuiDivider-root': {
    margin: theme.spacing(0.5),
  },
}));

export const StyledMenuItem = styled(MenuItem)(({ theme, isSubMenu }: DefaultTheme & { isSubMenu: boolean }) => ({
  // menu dropdown width - item margins to add up to 220px as per design - if is submenu -> it might shrink by 10 px
  width: `calc(${HEAD_CELL_MENU_WIDTH}px - ${theme.spacing(1)} - ${isSubMenu ? 10 : 0}px)`,
  borderRadius: '4px',
  margin: theme.spacing(0, 0.5),
  padding: theme.spacing(1, 1.5),
  display: 'flex',
  justifyContent: 'space-between',
  '&&:focus': {
    boxShadow: 'rgb(23, 127, 230) 0px 0px 0px 2px',
  },
}));

export const StyledMenuItemLabel = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }: DefaultTheme) => ({
  marginRight: theme.spacing(1.5),
  lineHeight: 0,
}));
