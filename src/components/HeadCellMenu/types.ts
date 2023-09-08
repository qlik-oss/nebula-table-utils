import type { SVGProps } from 'react';
import { stardust } from '@nebula.js/stardust';

export enum MenuAvailabilityFlags {
  SORTING = 'sorting',
  SEARCHING = 'searching',
  SELECTIONS = 'selections',
  ADJUST_HEADER_SIZE = 'adjustHeaderSize',
}

export type SortingRelatedArgs = {
  sortFromMenu: (evt: React.MouseEvent, newSortDirection: SortDirection) => Promise<void>;
  changeActivelySortedHeader?: (headerData: HeaderData) => Promise<boolean>;
};

export type SearchRelatedArgs = {
  embed: stardust.Embed;
  listboxRef: React.RefObject<HTMLDivElement>;
  interactions: stardust.Interactions;
};

export type SelectionRelatedArgs = Partial<{
  app: EngineAPI.IApp;
  model: EngineAPI.IGenericObject;
}>;

export type AdjustHeaderSizeRelatedArgs = {
  setFocusOnClosetHeaderAdjuster: (anchorRef: React.RefObject<HTMLDivElement>) => void;
};

export interface HeadCellMenuProps {
  headerData: HeaderData;
  translator: stardust.Translator;
  tabIndex: number;
  anchorRef: React.RefObject<HTMLDivElement>;
  handleHeadCellMenuKeyDown?: (evt: React.KeyboardEvent<HTMLLIElement>) => void;
  menuAvailabilityFlags: Partial<Record<MenuAvailabilityFlags, boolean>>;
  openMenuDropdown: boolean;
  setOpenMenuDropdown: (evt: React.MouseEvent, state: boolean) => void;

  sortRelatedArgs?: SortingRelatedArgs;
  searchRelatedArgs?: SearchRelatedArgs;
  selectionRelatedArgs?: SelectionRelatedArgs;
  adjustHeaderSizeRelatedArgs?: AdjustHeaderSizeRelatedArgs;
}

export type MenuItemGroup = Array<{
  groupHeading?: string;
  items: HeadCellMenuItem[];
}>;

export interface HeadCellMenuItem {
  id: number;
  autoFocus?: boolean;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  itemTitle: string;
  enabled: boolean; // for selections
  isActive?: boolean; // for active sorted col
  onClick?: (evt: React.MouseEvent<HTMLLIElement>) => Promise<void> | void;
  subMenus?: MenuItemGroup[];
  isSubMenu?: boolean;
}

export interface ExtendedHeadCellMenuItem extends HeadCellMenuItem {
  handleHeadCellMenuKeyDown?: (evt: React.KeyboardEvent<HTMLLIElement>) => void;
}

export interface UseFieldSelectionOutput {
  fieldInstance: EngineAPI.IField | null;
  selectionActionsEnabledStatus: Record<string, boolean>;
  resetSelectionActionsEnabledStatus: () => void;
  updateSelectionActionsEnabledStatus: (layout: EngineAPI.IGenericHyperCubeLayout) => void;
}

export interface UseFieldSelectionProps {
  headerData: HeaderData;
  app?: EngineAPI.IApp;
}

// --------------- GENRAL TYPES
export type SortDirection = 'A' | 'D';
export type Align = 'left' | 'center' | 'right';

export interface HeaderData {
  id: string;
  isDim: boolean;
  qLibraryId?: string;
  colIdx: number; // TODO: headerIdx
  fieldId: string;
  label: string;
  headTextAlign: Align;
  sortDirection: SortDirection;
  isActivelySorted?: boolean;
}
