import type { FooterStyle } from './types';
import type { BackgroundColors } from '../../hooks/use-extended-theme/types';
import COLORING from '../../utils/coloring';

const getFooterStyle = (background: BackgroundColors): FooterStyle =>
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

export default getFooterStyle;
