export enum ColumnWidthType {
  Auto = 'auto',
  FitToContent = 'fitToContent',
  Pixels = 'pixels',
  Percentage = 'percentage',
}

export interface ColumnWidth {
  type: ColumnWidthType;
  pixels?: number;
  percentage?: number;
}
