/* eslint-disable no-param-reassign */
import React, { type CSSProperties } from 'react';
import { ColumnWidthType } from './types';
import { preventDefaultBehavior } from '../../utils';
import { AdjusterBorder, AdjusterHitArea } from './styles';
import { ColumnWidthValues, COLUMN_ADJUSTER_BORDER_CLASS, COLUMN_ADJUSTER_CLASS, ARROW_RESIZE_STEP } from './constants';
import { KeyCodes } from '../../constants';

export interface TempWidth {
  columnWidth: number;
  initX: number;
  initWidth: number;
}

export interface ColumnAdjusterProps {
  tempWidth: TempWidth;
  keyValue: string;
  isLastColumn: boolean;
  style?: CSSProperties;
  updateWidthCallback: (pageColIdx: number) => void;
  confirmWidthCallback: (newWidthData: { type: ColumnWidthType; pixels: number }) => void;
  handleBlur?: (event: React.KeyboardEvent | React.FocusEvent<HTMLDivElement>) => void;
}

/**
 * Component that is placed on top of column border.
 * The vertical borders in the header can be used to change the column width.
 * When you start dragging, mouse move and mouse up listeners are added.
 * While dragging the current column can updated, and on mouse up the width is confirmed
 * By passing callbacks the behavior for updating and confirming width can be modified
 */
const ColumnAdjuster = ({
  tempWidth,
  keyValue,
  isLastColumn,
  style,
  updateWidthCallback,
  confirmWidthCallback,
  handleBlur,
}: ColumnAdjusterProps) => {
  const styling = style || { left: '100%' };

  // Note that deltaWidth is the change since you started the resize
  const updateWidth = (deltaWidth: number) => {
    // TODO: table and pivot table min widths are different at this point
    const adjustedWidth = Math.max(tempWidth.initWidth + deltaWidth, ColumnWidthValues.PixelsMin);
    tempWidth.columnWidth = adjustedWidth;
    updateWidthCallback(adjustedWidth);
  };

  const confirmWidth = () => {
    if (tempWidth.columnWidth !== tempWidth.initWidth) {
      const newWidthData = { type: ColumnWidthType.Pixels, pixels: tempWidth.columnWidth };
      confirmWidthCallback(newWidthData);
    }
  };

  // ----- Mouse -----
  const mouseMoveHandler = (evt: MouseEvent) => {
    const deltaWidth = evt.clientX - tempWidth.initX;
    updateWidth(deltaWidth);
  };

  const mouseUpHandler = (evt: MouseEvent) => {
    preventDefaultBehavior(evt);
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    confirmWidth();
  };

  const mouseDownHandler = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

    tempWidth.initX = evt.clientX;
  };

  // ----- Touch -----
  const touchMoveHandler = (evt: TouchEvent) => {
    const deltaWidth = evt.touches[0].clientX - tempWidth.initX;
    updateWidth(deltaWidth);
  };

  const touchEndHandler = (evt: TouchEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    document.removeEventListener('touchmove', touchMoveHandler);
    document.removeEventListener('touchend', touchEndHandler);

    confirmWidth();
  };

  const touchStartHandler = (evt: React.TouchEvent) => {
    if (evt.touches.length !== 1) return;

    evt.stopPropagation();
    document.addEventListener('touchmove', touchMoveHandler);
    document.addEventListener('touchend', touchEndHandler);

    tempWidth.initX = evt.touches[0].clientX;
  };

  // ----- Keyboard -----
  const KeyDownHandler = handleBlur
    ? (event: React.KeyboardEvent) => {
        if (event.key === KeyCodes.LEFT || event.key === KeyCodes.RIGHT) {
          preventDefaultBehavior(event);
          const prevDelta = tempWidth.columnWidth - tempWidth.initWidth;
          const newDelta = event.key === KeyCodes.LEFT ? prevDelta - ARROW_RESIZE_STEP : prevDelta + ARROW_RESIZE_STEP;

          updateWidth(newDelta);
        } else if (event.key === KeyCodes.SPACE || event.key === KeyCodes.ENTER) {
          preventDefaultBehavior(event);
          handleBlur(event);

          confirmWidth();
        } else if (event.key === KeyCodes.ESC) {
          preventDefaultBehavior(event);
          handleBlur(event);

          updateWidth(tempWidth.initWidth); // reset width to the initial value
        }
      }
    : undefined;

  return (
    <AdjusterHitArea
      className={COLUMN_ADJUSTER_CLASS}
      isLastColumn={isLastColumn}
      style={styling}
      key={keyValue}
      onMouseDown={mouseDownHandler}
      onTouchStart={touchStartHandler}
      onKeyDown={KeyDownHandler}
      onBlur={handleBlur}
      data-testid={COLUMN_ADJUSTER_CLASS}
    >
      <AdjusterBorder className={COLUMN_ADJUSTER_BORDER_CLASS} />
    </AdjusterHitArea>
  );
};

export default ColumnAdjuster;
