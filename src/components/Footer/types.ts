import type { stardust } from '@nebula.js/stardust';

export interface FooterWrapperProps {
  children: JSX.Element;
  footerContainer?: HTMLElement;
  withoutBorders?: boolean;
  paginationNeeded?: boolean;
  theme: ExtendedTheme;
}

export interface BackgroundColors {
  tableColorFromTheme: string;
  color?: string;
  isDark: boolean;
  isTransparent: boolean;
}

export interface FooterStyle {
  borderColor: string;
  color: string;
  disabledColor: string;
  iconColor?: string;
  background?: string;
}

export interface AnnounceArgs {
  keys: Array<string | Array<string>>;
  shouldBeAtomic?: boolean;
  politeness?: 'polite' | 'assertive' | 'off';
}

export type Announce = (arg0: AnnounceArgs) => void;

export interface ExtendedTheme extends stardust.Theme {
  name(): string;
  background: BackgroundColors;
}

export interface ExtendedTranslator extends stardust.Translator {
  language(): string;
}

export interface PageInfo {
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
}

export type SetPageInfo = stardust.SetStateFn<PageInfo>;

export interface PaginationContentProps {
  direction?: 'ltr' | 'rtl';
  pageInfo: PageInfo;
  setPageInfo: SetPageInfo;
  footerContainer?: HTMLElement;
  announce: Announce;
  isSelectionMode: boolean | undefined;
  handleChangePage(pageIdx: number): void;
  totalRowCount: number;
  totalColumnCount: number;
  totalPages: number;
  keyboard: stardust.Keyboard;
  translator: ExtendedTranslator;
  theme: ExtendedTheme;
  interactions: stardust.Interactions;
  rect: stardust.Rect;
  layout: EngineAPI.IGenericHyperCubeLayout;
}
