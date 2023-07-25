import { stardust } from '@nebula.js/stardust';
import { SortDirection } from '../../types';

export interface HeadCellMenuProps {
  column: Column;
  tabIndex: number;
  menuItemGroups: MenuItemGroup[];
  anchorRef: React.RefObject<HTMLDivElement>;
  embed: stardust.Embed;
  app: EngineAPI.IApp | undefined;
  model: EngineAPI.IGenericObject | undefined;
  ariaLabel: string;
}

export type MenuItemGroup = HeadCellMenuItem[];

export enum MenuTypes {
  SEARCH = 'search',
  SORTING = 'sorting',
  ADJUST_COLUMN_SIZE = 'adjustColumnSize',
  SELECTION = 'selection',
  SELECT_ALL = 'selectAll',
  SELECT_POSSIBLE = 'selectPossible',
  SELECT_ALTERNATIVE = 'selectAlternative',
  SELECT_EXCLUDED = 'selectExcluded',
  CLEAR_SELECT = 'clearSelect',
}

export interface HeadCellMenuItem {
  id: number;
  menuType: MenuTypes;
  autoFocus?: boolean;
  icon: React.ReactElement;
  itemTitle: string;
  enabled: boolean;
  onClick?: (evt: React.MouseEvent<HTMLLIElement>) => void;
  subMenus?: MenuItemGroup[];
}

export interface ExtendedLayout extends EngineAPI.IGenericHyperCubeLayout {}

export interface UseFieldSelectionOutput {
  fieldInstance: EngineAPI.IField | null;
  selectionActionsEnabledStatus: Record<string, boolean>;
  resetSelectionActionsEnabledStatus: () => void;
  updateSelectionActionsEnabledStatus: (layout: ExtendedLayout) => void;
}

export interface UseFieldSelectionProps {
  column: Column;
  app: EngineAPI.IApp | undefined;
}

// --------------- GENRAL TYPES
export type Align = 'left' | 'center' | 'right';

export interface Column {
  id: string;
  isDim: boolean;
  qLibraryId?: string;
  fieldId: string;
  isLocked: boolean;
  colIdx: number;
  pageColIdx: number;
  selectionColIdx: number;
  label: string;
  headTextAlign: Align;
  totalsTextAlign: Align;
  bodyTextAlign: 'auto' | Align;
  stylingIDs: string[];
  sortDirection: SortDirection;
  qReverseSort: boolean;
  totalInfo: string;
  qApprMaxGlyphCount: number;
  columnWidth: any;
}
