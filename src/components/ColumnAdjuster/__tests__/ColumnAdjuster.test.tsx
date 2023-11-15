import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { COLUMN_ADJUSTER_CLASS, ColumnWidthType, KeyCodes } from '../../../constants';
import ColumnAdjuster from '../ColumnAdjuster';
import { type ColumnWidth } from '../types';

describe('<ColumnAdjuster />', () => {
  const defaultWidth = 150;
  let updateWidthCallback: (pageColIdx: number) => void;
  let confirmWidthCallback: (newWidthData: ColumnWidth) => void;
  let setIsAdjustingWidth: (isAdjusting: boolean) => void;

  const renderAdjuster = () => {
    render(
      <ColumnAdjuster
        columnWidth={defaultWidth}
        isLastColumn
        keyValue="adjuster-0"
        updateWidthCallback={updateWidthCallback}
        confirmWidthCallback={confirmWidthCallback}
        handleBlur={() => {}}
        setIsAdjustingWidth={setIsAdjustingWidth}
      />
    );
    return screen.queryByTestId(COLUMN_ADJUSTER_CLASS) as HTMLElement;
  };

  beforeEach(() => {
    updateWidthCallback = jest.fn();
    confirmWidthCallback = jest.fn();
    setIsAdjustingWidth = jest.fn();
  });

  afterEach(() => jest.clearAllMocks());

  it('should change column width using keyboard', async () => {
    const columnAdjuster = renderAdjuster();
    const adjustedWidth = defaultWidth + 5;

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
      expect(setIsAdjustingWidth).toHaveBeenNthCalledWith(1, false);
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
    options.clientX = 200;
    fireEvent.mouseMove(columnAdjuster, options);
    await waitFor(() => {
      expect(updateWidthCallback).toHaveBeenCalledWith(options.clientX);
      expect(setIsAdjustingWidth).toHaveBeenNthCalledWith(1, true);
    });

    fireEvent.mouseUp(columnAdjuster, options);
    await waitFor(() => {
      expect(confirmWidthCallback).toHaveBeenCalledWith({
        type: ColumnWidthType.Pixels,
        pixels: options.clientX,
      });
      expect(setIsAdjustingWidth).toHaveBeenCalledTimes(1);
    });
  });

  it('should not change column width using mouse when mouse is not moved', async () => {
    const columnAdjuster = renderAdjuster();

    fireEvent.mouseDown(columnAdjuster);
    fireEvent.mouseUp(columnAdjuster);
    await waitFor(() => {
      expect(confirmWidthCallback).not.toHaveBeenCalled();
      expect(setIsAdjustingWidth).toHaveBeenNthCalledWith(1, true);
      expect(setIsAdjustingWidth).toHaveBeenNthCalledWith(2, false);
    });
  });

  it('should change column width using mouse to fit to content when double clicking', async () => {
    const columnAdjuster = renderAdjuster();

    fireEvent.doubleClick(columnAdjuster);
    await waitFor(() => {
      expect(confirmWidthCallback).toHaveBeenCalledWith({ type: ColumnWidthType.FitToContent });
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
    options.touches[0].clientX = 200;
    fireEvent.touchMove(columnAdjuster, options);
    await waitFor(() => {
      expect(updateWidthCallback).toHaveBeenCalledWith(options.touches[0].clientX);
      expect(setIsAdjustingWidth).toHaveBeenNthCalledWith(1, true);
    });

    fireEvent.touchEnd(columnAdjuster, options);
    await waitFor(() => {
      expect(confirmWidthCallback).toHaveBeenCalledWith({
        type: ColumnWidthType.Pixels,
        pixels: options.touches[0].clientX,
      });
      expect(setIsAdjustingWidth).toHaveBeenCalledTimes(1);
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
    options.touches[0].clientX = 200;
    fireEvent.touchMove(columnAdjuster, options);
    await waitFor(() => {
      expect(updateWidthCallback).not.toHaveBeenCalled();
    });
  });
});
