import type { stardust } from '@nebula.js/stardust';
import type { ExtendedTheme } from '../../hooks/use-extended-theme/types';

export interface FooterWrapperProps {
  children: JSX.Element;
  footerContainer?: HTMLElement;
  withoutBorders?: boolean;
  paginationNeeded?: boolean;
  theme: ExtendedTheme;
}

export interface FooterStyle {
  borderColor: string;
  color: string;
  disabledColor: string;
  iconColor?: string;
  background?: string;
}

export interface ExtendedTranslator extends stardust.Translator {
  language(): string;
}

export interface PageInfo {
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
}

export interface PaginationContentProps {
  direction?: 'ltr' | 'rtl';
  pageInfo: PageInfo;
  footerContainer?: HTMLElement;
  isSelectionMode?: boolean;
  handleChangeRowsPerPage?: (rowsPerPage: number) => void;
  handleChangePage: (pageIdx: number) => void;
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
