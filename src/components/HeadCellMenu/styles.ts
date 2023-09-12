import { styled } from '@mui/material/styles';
import Menu from '@qlik-trial/sprout/icons/Menu';
import { Divider, ListItemIcon, MenuItem, ListItem, Box, Menu as MuiMenu, Typography } from '@mui/material';
import {
  HEAD_CELL_MENU_ACTIVE_ITEM_GREEN_BORDER_HEIGHT,
  HEAD_CELL_MENU_GROUP_LABEL_HEIGHT,
  HEAD_CELL_MENU_ITEM_HEIGHT,
  HEAD_CELL_MENU_ITEM_ICON_WIDTH,
  HEAD_CELL_MENU_WIDTH,
  HEAD_ICON_WRAPPER_SIZE,
} from '../../constants';
import { type DefaultTheme } from '../../types';

// ---------- HeadCellMenu ----------
export const HeadCellMenuWrapper = styled(Box, {
  shouldForwardProp: (prop: string) => prop !== 'rightAligned',
})(({ rightAligned }: { rightAligned: boolean }) => ({
  ...(rightAligned ? { marginRight: 'auto' } : { marginLeft: 'auto' }),
  height: HEAD_ICON_WRAPPER_SIZE,
  display: 'flex',
  fontWeight: 'bold',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledMenuButton = styled(Menu, {
  shouldForwardProp: (prop: string) => prop !== 'isInteractionsActive',
})(({ isInteractionsActive }: { isInteractionsActive: boolean }) => ({
  minWidth: 'unset',
  position: 'relative',
  cursor: isInteractionsActive ? 'pointer' : 'default',
}));

// ---------- DropdownMenu ----------
export const StyledMenu = styled(MuiMenu)(({ theme }: DefaultTheme) => ({
  '.MuiList-root': {
    padding: theme.spacing(0.5, 0),
  },
}));

export const StyledDivider = styled(Divider)(({ theme }: DefaultTheme) => ({
  '&.MuiDivider-root': {
    margin: theme.spacing(0.5),
  },
}));

export const StyledGroupLabel = styled(ListItem)(({ theme }: DefaultTheme) => ({
  fontSize: '12px',
  height: HEAD_CELL_MENU_GROUP_LABEL_HEIGHT,
  fontWeight: 'bold',
  padding: theme.spacing(0.25, 2),
  marginBottom: theme.spacing(0.5),
}));

export const StyledMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop: string) => prop !== 'isSubMenu' && prop !== 'isActive',
})(
  ({
    theme,
    isSubMenu,
    isActive,
  }: DefaultTheme & {
    isSubMenu: boolean;
    isActive: boolean;
  }) => ({
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    width: `calc(${HEAD_CELL_MENU_WIDTH}px - ${theme.spacing(1)} - ${isSubMenu ? 10 : 0}px)`, // menu dropdown width - item margins to add up to 220px as per design - if is submenu -> it might shrink by 10 px
    maxHeight: HEAD_CELL_MENU_ITEM_HEIGHT,
    borderRadius: theme.spacing(0.5),
    margin: theme.spacing(0.25, 0.5),
    padding: theme.spacing(1, 1.5),
    display: 'flex',
    justifyContent: 'space-between',
    '&&:focus': {
      boxShadow: 'rgb(23, 127, 230) 0px 0px 0px 2px',
    },
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box',
    background: `${isActive ? 'rgba(0, 0, 0, 0.05)' : 'transparent'}`,
  })
);

export const StyledGreenBorder = styled('div')(({ theme }: DefaultTheme) => ({
  position: 'absolute',
  width: theme.spacing(0.5),
  height: HEAD_CELL_MENU_ACTIVE_ITEM_GREEN_BORDER_HEIGHT,
  left: 0,
  top: '50%',
  transform: 'TranslateY(-50%)',
  borderRadius: '0 2px 2px 0',
  background: '#01873d',
}));

export const StyledMenuItemLabel = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const StyledListItemLabel = styled(Typography)(() => ({
  // TODO: get these from theme
  fontFamily: '"Source Sans Pro", HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: '14px',
}));

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }: DefaultTheme) => ({
  width: HEAD_CELL_MENU_ITEM_ICON_WIDTH,
  minWidth: 'unset !important',
  marginRight: theme.spacing(1.5),
  lineHeight: 0,
}));
