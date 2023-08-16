import { SVGProps } from 'react';
import { stardust } from '@nebula.js/stardust';

export enum MenuAvailabilityFlags {
  SORTING = 'sorting',
  SEARCHING = 'searching',
  SELECTIONS = 'selections',
  ADJUST_COLUMN_SIZE = 'adjustColumnSize',
}

export interface SortingRelatedArgs {
  sortFromMenu: (evt: React.MouseEvent, newSortDirection: SortDirection) => void;
  changeActivelySortedColumn?: (column: Column) => void;
}

export interface SearchRelatedArgs {
  embed: stardust.Embed;
  listboxRef: React.RefObject<HTMLDivElement>;
  interactions: stardust.Interactions;
}

export interface SelectionRelatedArgs {
  app: EngineAPI.IApp | undefined;
  model: EngineAPI.IGenericObject | undefined;
}

export interface AdjustColumnSizeRelatedArgs {
  setFocusOnClosetColumnAdjuster: (anchorRef: React.RefObject<HTMLDivElement>) => void;
}

type TypeMap = {
  [K in MenuAvailabilityFlags.SORTING]: SortingRelatedArgs;
} & {
  [K in MenuAvailabilityFlags.SEARCHING]: SearchRelatedArgs;
} & {
  [K in MenuAvailabilityFlags.SELECTIONS]: SelectionRelatedArgs;
} & {
  [K in MenuAvailabilityFlags.ADJUST_COLUMN_SIZE]: AdjustColumnSizeRelatedArgs;
};
type Prettify<T> = T extends infer R ? { [K in keyof R]: R[K] } : never;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type ValueOf<T> = T[keyof T];
export type FlagsArgs<T extends HeadCellMenuProps['menuAvailabilityFlags']> = Prettify<
  UnionToIntersection<
    ValueOf<{
      [K in keyof T & keyof TypeMap as T[K] extends true ? K : never]: TypeMap[K];
    }>
  >
>;

export interface HeadCellMenuProps {
  column: Column;
  translator: stardust.Translator;
  tabIndex: number;
  anchorRef: React.RefObject<HTMLDivElement>;
  handleHeadCellMenuKeyDown: (evt: React.KeyboardEvent<HTMLLIElement>) => void;
  menuAvailabilityFlags: Partial<Record<MenuAvailabilityFlags, boolean>>;
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
  onClick?: (evt: React.MouseEvent<HTMLLIElement>) => void;
  subMenus?: MenuItemGroup[];
  isSubMenu?: boolean;
}

export interface ExtendedHeadCellMenuItem extends HeadCellMenuItem {
  handleHeadCellMenuKeyDown: (evt: React.KeyboardEvent<HTMLLIElement>) => void;
}

export interface UseFieldSelectionOutput {
  fieldInstance: EngineAPI.IField | null;
  selectionActionsEnabledStatus: Record<string, boolean>;
  resetSelectionActionsEnabledStatus: () => void;
  updateSelectionActionsEnabledStatus: (layout: EngineAPI.IGenericHyperCubeLayout) => void;
}

export interface UseFieldSelectionProps {
  column: Column;
  app: EngineAPI.IApp | undefined;
}

// --------------- GENRAL TYPES
export type SortDirection = 'A' | 'D';
export type Align = 'left' | 'center' | 'right';

export interface Column {
  id: string;
  isDim: boolean;
  qLibraryId?: string;
  colIdx: number;
  fieldId: string;
  label: string;
  headTextAlign: Align;
  sortDirection: SortDirection;
  isActivelySorted?: boolean;
}
