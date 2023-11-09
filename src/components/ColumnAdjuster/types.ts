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
  updateWidthCallback: (pageColIdx: number) => void;
  confirmWidthCallback: (newWidthData: ColumnWidth) => void;
  handleBlur?: (event: React.KeyboardEvent | React.FocusEvent<HTMLDivElement>) => void;
}
