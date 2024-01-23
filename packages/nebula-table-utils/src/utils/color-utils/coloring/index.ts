import type { Palette } from '@mui/material';
import { createV5ThemeOptions, COLORS } from '@qlik-trial/sprout/theme';

const palette = createV5ThemeOptions().palette as Palette;

const COLORING = {
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

export default COLORING;
