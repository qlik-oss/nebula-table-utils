import { renderHook } from '@testing-library/react';
import useMeasureText from '.';

describe('useMeasureText', () => {
  const props = {
    fontSize: '12px',
    fontFamily: 'Arial',
  };
  let context: CanvasRenderingContext2D;
  let setFontMock = jest.fn();

  beforeEach(() => {
    context = {
      measureText(text?: string) {
        return {
          width: text?.length ?? 0,
        };
      },
    } as CanvasRenderingContext2D;

    setFontMock = jest.fn();
    Object.defineProperty(context, 'font', {
      set: setFontMock,
    });

    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should set font on context when fontSize, fontFamily, fontStyle and fontWeight is set', () => {
    renderHook(() =>
      useMeasureText({
        fontSize: '12px',
        fontFamily: 'Arial',
        fontStyle: 'underline',
        fontWeight: '600',
      })
    );

    expect(setFontMock).toHaveBeenCalledWith('underline 600 12px Arial');
  });

  test('should set font on context when fontSize, fontFamily and fontStyle is set', () => {
    renderHook(() =>
      useMeasureText({
        fontSize: '12px',
        fontFamily: 'Arial',
        fontStyle: 'underline',
      })
    );

    expect(setFontMock).toHaveBeenCalledWith('underline normal 12px Arial');
  });

  test('should set font on context when fontSize and fontFamily', () => {
    renderHook(() =>
      useMeasureText({
        fontSize: '12px',
        fontFamily: 'Arial',
      })
    );

    expect(setFontMock).toHaveBeenCalledWith('normal normal 12px Arial');
  });

  test('should set font on context with default values', () => {
    renderHook(() => useMeasureText({}));

    expect(setFontMock).toHaveBeenCalledWith('normal normal 12px Source Sans Pro, Arial, sans-serif');
  });

  describe('estimateWidth', () => {
    test('should estimate width', () => {
      const { result } = renderHook(() => useMeasureText(props));

      expect(result.current.estimateWidth(2)).toBe(2);
    });
  });

  describe('measureText', () => {
    test('should measure width', () => {
      const { result } = renderHook(() => useMeasureText(props));

      expect(result.current.measureText('some string')).toBe(11);
    });
  });

  describe('estimateLineCount', () => {
    test('should get line count for a single line of text', () => {
      const { result } = renderHook(() => useMeasureText(props));

      expect(result.current.estimateLineCount({ text: '12345', maxWidth: 5 })).toBe(1);
    });

    test('should get line count for two lines of text', () => {
      const { result } = renderHook(() => useMeasureText(props));

      expect(result.current.estimateLineCount({ text: '123456', maxWidth: 3 })).toBe(2);
    });

    test('should get line count for three lines of text', () => {
      const { result } = renderHook(() => useMeasureText(props));

      expect(result.current.estimateLineCount({ text: '123456789', maxWidth: 3 })).toBe(3);
    });

    test('should get limited line count when actual line count exceeds max line count', () => {
      const { result } = renderHook(() => useMeasureText(props));

      expect(result.current.estimateLineCount({ text: '1234567', maxWidth: 2 })).toBe(3);
      expect(result.current.estimateLineCount({ text: '123456789ABCDEF', maxWidth: 2 })).toBe(3);
    });

    test('should handle empty strings', () => {
      const { result } = renderHook(() => useMeasureText(props));

      expect(result.current.estimateLineCount({ text: '', maxWidth: 5 })).toBe(1);
    });

    test('should handle too short max width', () => {
      const { result } = renderHook(() => useMeasureText(props));

      expect(result.current.estimateLineCount({ text: '1', maxWidth: 0.5 })).toBe(1);
      expect(result.current.estimateLineCount({ text: '12', maxWidth: 0.5 })).toBe(3);
      expect(result.current.estimateLineCount({ text: '123', maxWidth: 0.5 })).toBe(3);
    });

    test('should get line count when text is shorten then max width', () => {
      const { result } = renderHook(() => useMeasureText(props));

      expect(result.current.estimateLineCount({ text: '1', maxWidth: 5 })).toBe(1);
    });

    test('should not line break numeric cells', () => {
      const { result } = renderHook(() => useMeasureText(props));

      expect(result.current.estimateLineCount({ text: '123', maxWidth: 1, isNumeric: true })).toBe(1);
    });
  });
});
