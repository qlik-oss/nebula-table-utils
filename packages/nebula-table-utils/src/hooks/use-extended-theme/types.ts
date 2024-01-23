import type { stardust } from '@nebula.js/stardust';

export interface BackgroundColors {
  tableColorFromTheme: string;
  color?: string;
  isDark: boolean;
  isTransparent: boolean;
}

export interface ExtendedTheme extends stardust.Theme {
  name(): string;
  background: BackgroundColors;
}
