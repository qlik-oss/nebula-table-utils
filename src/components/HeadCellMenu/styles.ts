import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Menu from '@qlik-trial/sprout/icons/Menu';

import { HEAD_CELL_MENU_WIDTH, HEAD_ICON_WRAPPER_SIZE } from '../../constants';
import { DefaultTheme } from '../../types';
import { Divider, ListItemIcon, MenuItem, ListItem } from '@mui/material';

// ---------- HeadCellMenu ----------
export const HeadCellMenuWrapper = styled(Box)(({ rightAligned }: { rightAligned: boolean }) => ({
  ...(rightAligned ? { marginRight: 'auto' } : { marginLeft: 'auto' }),
  height: `${HEAD_ICON_WRAPPER_SIZE}px`,
  display: 'flex',
  fontWeight: 'bold',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledMenuButton = styled(Menu)(() => ({
  minWidth: 'unset',
  color: '#404040',
  cursor: 'pointer',
}));

// ---------- DropdownMenu ----------
export const StyledDivider = styled(Divider)(({ theme }: DefaultTheme) => ({
  '&.MuiDivider-root': {
    margin: theme.spacing(0.5),
  },
}));

export const StyledGroupLabel = styled(ListItem)(({ theme }: DefaultTheme) => ({
  fontSize: '12px',
  height: '24px',
  fontWeight: 'bold',
  padding: theme.spacing(0.25, 2),
  marginBottom: theme.spacing(0.5),
}));

export const StyledMenuItem = styled(MenuItem)(
  ({ theme, isSubMenu, isActive }: DefaultTheme & { isSubMenu: boolean; isActive: boolean }) => ({
    // menu dropdown width - item margins to add up to 220px as per design - if is submenu -> it might shrink by 10 px
    width: `calc(${HEAD_CELL_MENU_WIDTH}px - ${theme.spacing(1)} - ${isSubMenu ? 10 : 0}px)`,
    maxHeight: '32px',
    borderRadius: '4px',
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

export const StyledGreenBorder = styled('div')(() => ({
  position: 'absolute',
  width: '4px',
  height: '16px',
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

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }: DefaultTheme) => ({
  width: 16,
  minWidth: 'unset !important',
  marginRight: theme.spacing(1.5),
  lineHeight: 0,
}));
