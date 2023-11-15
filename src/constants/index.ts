export const DEFAULT_FONT_SIZE = '12px';

export const LOCK_ICON_SIZE = 20;
export const HEAD_ICON_WRAPPER_SIZE = 24;
export const HEAD_CELL_MENU_GROUP_LABEL_HEIGHT = 24;
export const HEAD_CELL_MENU_WIDTH = 220;
export const HEAD_CELL_MENU_ITEM_HEIGHT = 32;
export const HEAD_CELL_MENU_ACTIVE_ITEM_GREEN_BORDER_HEIGHT = 16;
export const HEAD_CELL_MENU_ITEM_ICON_WIDTH = 16;
export const HEAD_CELL_MENU_BUTTON_CLASS = 'nebula-table-utils-head-menu-button';

export const PAGINATION_HEIGHT = 40;

export enum KeyCodes {
  ENTER = 'Enter',
  SPACE = ' ',
  ESC = 'Escape',
  TAB = 'Tab',
  SHIFT = 'Shift',
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  C = 'c',
}

export const COLUMN_ADJUSTER_CLASS = 'nebula-table-utils-column-adjuster';
export const COLUMN_ADJUSTER_BORDER_CLASS = `${COLUMN_ADJUSTER_CLASS}-border`;

export enum ColumnWidthValues {
  PixelsMin = 30,
  PixelsMinTable = 120, // TODO: remove this value when we remove the new header flag
  PixelsMax = 7680,
  PixelsDefault = 200,
  PercentageMin = 1,
  PercentageMax = 100,
  PercentageDefault = 20,
  AutoMin = 80,
}

export enum ColumnWidthType {
  Auto = 'auto',
  FitToContent = 'fitToContent',
  Pixels = 'pixels',
  Percentage = 'percentage',
}
