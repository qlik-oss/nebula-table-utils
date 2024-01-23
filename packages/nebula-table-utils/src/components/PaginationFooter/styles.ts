import { styled, type Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { FooterStyle, ShouldForwardProp } from './types';
import { PAGINATION_HEIGHT } from '../../constants';

// ---------- FooterWrapper ----------

export const StyledFooterWrapper = styled(Box, {
  shouldForwardProp: (prop: ShouldForwardProp) => prop !== 'footerStyle',
})(({ footerStyle, theme }: { footerStyle: FooterStyle; theme: Theme }) => ({
  height: PAGINATION_HEIGHT,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: theme.spacing(0, 1, 0, 1),
  color: footerStyle.color,
  background: footerStyle.background,
  borderTop: `1px solid ${footerStyle.borderColor}`,
}));

// ---------- PaginationContent ----------

type StyledSelectProps = { footerStyle: FooterStyle; theme: Theme };

export const StyledSelect = styled(Select, {
  shouldForwardProp: (prop: ShouldForwardProp) => prop !== 'footerStyle',
})(({ footerStyle, theme }: StyledSelectProps) => ({
  background: 'inherit',
  marginRight: theme.spacing(1),
  color: footerStyle.color,
  '& .MuiNativeSelect-icon, .MuiNativeSelect-select': { color: footerStyle.iconColor },
}));

type StyledButtonProps = {
  disabledCondition: boolean;
  footerStyle: FooterStyle;
  theme: Theme;
};

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop: ShouldForwardProp) => prop !== 'disabledCondition' && prop !== 'footerStyle',
})(({ disabledCondition, footerStyle, theme }: StyledButtonProps) => ({
  color: disabledCondition ? footerStyle.disabledColor : footerStyle.color,
  cursor: disabledCondition ? 'default' : 'pointer',
  marginLeft: theme.spacing(1),
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: 'inherit',
  margin: theme.spacing(0, 1, 0, 1),
}));
