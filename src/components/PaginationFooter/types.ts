import type { stardust } from '@nebula.js/stardust';
import type { ExtendedTheme } from '../../hooks/use-extended-theme/types';

export enum ButtonTypes {
  FirstPage = 'FirstPage',
  LastPage = 'LastPage',
  NextPage = 'NextPage',
  PreviousPage = 'PreviousPage',
}

export enum VisibilityThresholds {
  DisplayedRowsLabel = 250,
  FirstPage = 350,
  LastPage = 350,
  RowsPerPage = 550,
  SelectPage = 700,
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
