import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { KeyCodes } from '../../../constants';
import ColumnAdjuster, { TempWidth } from '../ColumnAdjuster';
import { ColumnWidthType } from '../types';
import { ARROW_RESIZE_STEP, COLUMN_ADJUSTER_CLASS } from '../constants';

describe('<ColumnAdjuster />', () => {
  const defaultWidth = 50;
  const keyValue = 'adjuster-0';
  const isLastColumn = true;
  let tempWidth: TempWidth;
  let updateWidthCallback: (pageColIdx: number) => void;
  let confirmWidthCallback: (newWidthData: { type: ColumnWidthType; pixels: number }) => void;

  const renderAdjuster = () => {
    render(
      <ColumnAdjuster
        tempWidth={tempWidth}
        isLastColumn={isLastColumn}
        keyValue={keyValue}
        updateWidthCallback={updateWidthCallback}
        confirmWidthCallback={confirmWidthCallback}
        additionalHandlers={{ onBlur: () => {} }}
      />
    );
    return screen.queryByTestId(COLUMN_ADJUSTER_CLASS) as HTMLElement;
  };

  beforeEach(() => {
    tempWidth = {
      columnWidth: defaultWidth,
      initWidth: defaultWidth,
      initX: 0,
    };

    updateWidthCallback = jest.fn();
    confirmWidthCallback = jest.fn();
  });

  afterEach(() => jest.clearAllMocks());

  it('should change column width using keyboard', async () => {
    const columnAdjuster = renderAdjuster();
    const adjustedWidth = defaultWidth + ARROW_RESIZE_STEP;

    fireEvent.keyDown(columnAdjuster, { key: KeyCodes.RIGHT });
    await waitFor(() => {
      expect(updateWidthCallback).toHaveBeenCalledWith(adjustedWidth);
    });

    fireEvent.keyDown(columnAdjuster, { key: KeyCodes.SPACE });
    await waitFor(() => {
      expect(confirmWidthCallback).toHaveBeenCalledWith({ type: ColumnWidthType.Pixels, pixels: adjustedWidth });
    });
  });

  it('should not change column width with keyboard, when confirming with the same column width and not when canceling', async () => {
    const columnAdjuster = renderAdjuster();

    fireEvent.keyDown(columnAdjuster, { key: KeyCodes.SPACE });
    await waitFor(() => {
      expect(confirmWidthCallback).toHaveBeenCalledTimes(0);
    });

    fireEvent.keyDown(columnAdjuster, { key: KeyCodes.ESC });
    await waitFor(() => {
      expect(confirmWidthCallback).toHaveBeenCalledTimes(0);
    });
  });

  it('should change column width using mouse', async () => {
    const columnAdjuster = renderAdjuster();
    const options = { clientX: defaultWidth };

    fireEvent.mouseDown(columnAdjuster, options);
    options.clientX = 100;
    fireEvent.mouseMove(columnAdjuster, options);
    await waitFor(() => {
      expect(updateWidthCallback).toHaveBeenCalledWith(options.clientX);
    });

    fireEvent.mouseUp(columnAdjuster, options);
    await waitFor(() => {
      expect(confirmWidthCallback).toHaveBeenCalledWith({
        type: ColumnWidthType.Pixels,
        pixels: options.clientX,
      });
    });
  });

  it('should not change column width using mouse when mouse is not moved', async () => {
    const columnAdjuster = renderAdjuster();

    fireEvent.mouseDown(columnAdjuster);
    fireEvent.mouseUp(columnAdjuster);
    await waitFor(() => {
      expect(confirmWidthCallback).not.toHaveBeenCalled();
    });
  });

  it('should change column width using touch', async () => {
    const columnAdjuster = renderAdjuster();
    const options = {
      touches: [
        {
          clientX: defaultWidth,
        },
      ],
    };

    fireEvent.touchStart(columnAdjuster, options);
    options.touches[0].clientX = 100;
    fireEvent.touchMove(columnAdjuster, options);
    await waitFor(() => {
      expect(updateWidthCallback).toHaveBeenCalledWith(options.touches[0].clientX);
    });

    fireEvent.touchEnd(columnAdjuster, options);
    await waitFor(() => {
      expect(confirmWidthCallback).toHaveBeenCalledWith({
        type: ColumnWidthType.Pixels,
        pixels: options.touches[0].clientX,
      });
    });
  });

  it('should mot change column width using touch and there are more than one touch', async () => {
    const columnAdjuster = renderAdjuster();
    const options = {
      touches: [
        {
          clientX: 0,
          clientY: 0,
        },
        {},
      ],
    };

    fireEvent.touchStart(columnAdjuster, options);
    options.touches[0].clientX = 100;
    fireEvent.touchMove(columnAdjuster, options);
    await waitFor(() => {
      expect(updateWidthCallback).not.toHaveBeenCalled();
    });
  });
});
