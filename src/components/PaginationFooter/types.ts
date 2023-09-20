import type { stardust } from '@nebula.js/stardust';
import type { ExtendedTheme } from '../../hooks/use-extended-theme/types';

export enum ButtonTypes {
  FIRST_PAGE = 'FirstPage',
  LAST_PAGE = 'LastPage',
  NEXT_PAGE = 'NextPage',
  PREVIOUS_PAGE = 'PreviousPage',
}

export enum VisibilityThresholds {
  DISPLAYED_ROWS_LABEL = 250,
  FIRST_PAGE = 350,
  LAST_PAGE = 350,
  ROWS_PER_PAGE = 550,
  SELECT_PAGE = 700,
}

export interface FooterWrapperProps {
  children: JSX.Element;
  footerContainer?: HTMLElement;
  paginationNeeded?: boolean;
  theme: ExtendedTheme;
  interactions: stardust.Interactions;
}

export interface FooterStyle {
  borderColor: string;
  color: string;
  disabledColor: string;
  iconColor?: string;
  background?: string;
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
  translator: stardust.Translator;
  theme: ExtendedTheme;
  interactions: stardust.Interactions;
  rect: stardust.Rect;
  layout: EngineAPI.IGenericHyperCubeLayout;
}
