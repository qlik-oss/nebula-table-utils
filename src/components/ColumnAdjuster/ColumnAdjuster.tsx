import React, { useMemo } from 'react';
import { type ColumnAdjusterProps } from './types';
import { preventDefaultBehavior } from '../../utils';
import { AdjusterBorder, AdjusterHitArea } from './styles';
import {
  COLUMN_ADJUSTER_BORDER_CLASS,
  COLUMN_ADJUSTER_CLASS,
  ColumnWidthType,
  ColumnWidthValues,
  KeyCodes,
} from '../../constants';

/**
 * Component that is placed on top of column border.
 * The vertical borders in the header can be used to change the column width.
 * When you start dragging, mouse move and mouse up listeners are added (as well as corresponding touch events).
 * While dragging the current column can be updated, and on mouse up the width is confirmed.
 * By passing callbacks the behavior for updating and confirming width can be modified.
 */
const ColumnAdjuster = ({
  columnWidth,
  keyValue,
  isLastColumn,
  isPivot,
  isNewHeadCellMenuEnabled,
  updateWidthCallback,
  confirmWidthCallback,
  handleBlur,
}: ColumnAdjusterProps) => {
  const tempWidth = useMemo(() => ({ initWidth: columnWidth, columnWidth, initX: 0 }), [columnWidth]);
  // TODO: only use PixelsMin when we switch to the new header, needs to listen to the flag
  const minWidth = isPivot || isNewHeadCellMenuEnabled ? ColumnWidthValues.PixelsMin : ColumnWidthValues.PixelsMinTable;
  const leftAdjustment = isLastColumn ? 0 : 1;
  const style = { left: isPivot ? tempWidth.columnWidth - leftAdjustment : '100%' };

  // Note that deltaWidth is the change since you started the resize
  const updateWidth = (deltaWidth: number) => {
    const adjustedWidth = Math.max(tempWidth.initWidth + deltaWidth, minWidth);
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

  const doubleClickHandler = () => confirmWidthCallback({ type: ColumnWidthType.FitToContent });

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
  const KeyDownHandler =
    !isPivot && handleBlur
      ? (event: React.KeyboardEvent) => {
          if (event.key === KeyCodes.LEFT || event.key === KeyCodes.RIGHT) {
            preventDefaultBehavior(event);
            const prevDelta = tempWidth.columnWidth - tempWidth.initWidth;
            const ARROW_RESIZE_STEP = 5;
            const newDelta =
              event.key === KeyCodes.LEFT ? prevDelta - ARROW_RESIZE_STEP : prevDelta + ARROW_RESIZE_STEP;

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
      style={style}
      key={keyValue}
      onMouseDown={mouseDownHandler}
      onDoubleClick={doubleClickHandler}
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
