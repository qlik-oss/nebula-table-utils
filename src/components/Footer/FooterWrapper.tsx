import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import type { Palette } from '@mui/material';
import { createV5ThemeOptions, COLORS } from '@qlik-trial/sprout/theme';
import { StyledFooterWrapper } from './styles';
import type { BackgroundColors, FooterStyle, FooterWrapperProps } from './types';

const palette = createV5ThemeOptions().palette as Palette;

export const COLORING = {
  TEXT: palette.text.primary,
  DISABLED: palette.text.disabled,
  HOVER: palette.action.hover,
  WHITE: COLORS.GREYSCALE_100,
  BORDER_LIGHT: COLORS.GREYSCALE_90,
  BORDER_MEDIUM: COLORS.GREYSCALE_85,
  BORDER_HEAVY: COLORS.GREYSCALE_50,
  DARK_MODE_TEXT: COLORS.GREYSCALE_95,
  DARK_MODE_BORDER: COLORS.GREYSCALE_95,
  DARK_MODE_DISABLED: COLORS.GREYSCALE_70,
  DARK_MODE_BACKGROUND: COLORS.GREYSCALE_20,
};

export const getFooterStyle = (background: BackgroundColors): FooterStyle =>
  background.isDark
    ? {
        background: background.color,
        borderColor: COLORING.DARK_MODE_BORDER,
        color: COLORING.DARK_MODE_TEXT,
        disabledColor: COLORING.DARK_MODE_DISABLED,
        // the icon needs a specific color to override it in dark mode
        iconColor: COLORING.DARK_MODE_TEXT,
      }
    : {
        background: background.color,
        borderColor: COLORING.BORDER_MEDIUM,
        color: COLORING.TEXT,
        disabledColor: COLORING.DISABLED,
      };

export default function FooterWrapper({
  children,
  footerContainer,
  paginationNeeded = true,
  theme,
}: FooterWrapperProps) {
  const footerStyle = useMemo(() => getFooterStyle(theme.background), [theme]);

  const pagination = paginationNeeded ? (
    <StyledFooterWrapper footerStyle={footerStyle}>{children}</StyledFooterWrapper>
  ) : null;

  return footerContainer ? ReactDOM.createPortal(children, footerContainer) : pagination;
}
