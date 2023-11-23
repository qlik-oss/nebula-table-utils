import type { ColumnWidthType } from '../../constants';

export interface ColumnWidth {
  type: ColumnWidthType;
  pixels?: number;
  percentage?: number;
}

export interface ColumnAdjusterProps {
  columnWidth: number;
  keyValue: string;
  isLastColumn: boolean;
  isPivot?: boolean;
  isNewHeadCellMenuEnabled?: boolean;
  hoverColor?: string;
  updateWidthCallback: (pageColIdx: number) => void;
  confirmWidthCallback: (newWidthData: ColumnWidth) => void;
  handleBlur?: (event: React.KeyboardEvent | React.FocusEvent) => void;
  setIsAdjustingWidth?: (isAdjusting: boolean) => void;
}
