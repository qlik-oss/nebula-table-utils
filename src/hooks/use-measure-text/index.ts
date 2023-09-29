import { memoize } from 'qlik-chart-modules';
import { useMemo } from 'react';

type EstimateLineCountProps = {
  text: string;
  maxWidth: number;
  isNumeric?: boolean;
};

export type EstimateLineCount = ({ text, maxWidth, isNumeric }: EstimateLineCountProps) => number;

export interface MeasureTextHook {
  estimateWidth: (length: number) => number;
  measureText: (text: string) => number;
  estimateLineCount: EstimateLineCount;
}

export interface UseMeasureTextProps {
  fontSize?: string;
  fontFamily?: string;
  fontStyle?: string;
  bold?: boolean;
  maxNbrLinesOfText?: number;
}

const MAX_NBR_LINES_OF_TEXT = 3;

const MAGIC_DEFAULT_CHAR = 'N';

function getNextLine(text: string, maxWidth: number, fixedMeasureText: (text: string) => number) {
  let left = 0;
  let right = text.length;

  if (text.length <= 1) {
    return null;
  }

  if (fixedMeasureText(text) <= maxWidth) {
    return null;
  }

  while (left <= right) {
    const m = Math.floor((left + right) / 2);
    const chunk = text.slice(0, m);
    const prevChunk = text.slice(0, m - 1);
    const width = fixedMeasureText(chunk);
    const prevWidth = fixedMeasureText(prevChunk);

    if (width > maxWidth && prevWidth <= maxWidth) {
      return text.slice(m - 1) || null;
    }

    if (width === maxWidth) {
      return text.slice(m) || null;
    }

    if (width < maxWidth) {
      // Search right
      left = m + 1;
    } else {
      // Search left
      right = m;
    }
  }

  return null;
}

export default function useMeasureText({
  fontSize = '12px',
  fontFamily = 'Source Sans Pro, Arial, sans-serif',
  fontStyle = '',
  bold = false,
  maxNbrLinesOfText = MAX_NBR_LINES_OF_TEXT,
}: UseMeasureTextProps): MeasureTextHook {
  const { estimateWidth, measureText, estimateLineCount } = useMemo<MeasureTextHook>(() => {
    const context = document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D;
    context.font = `${fontStyle}${fontStyle ? ' ' : ''}${bold ? '600 ' : ''}${fontSize} ${fontFamily}`;

    const memoizedMeasureText = memoize(context.measureText.bind(context)) as (text: string) => TextMetrics;

    const fixedMeasureText = (text: string) => +memoizedMeasureText(text).width.toFixed(2);

    const toKey = ({ text, maxWidth, isNumeric }: EstimateLineCountProps) =>
      `${text}-${maxWidth}-${isNumeric ? 'true' : 'false'}`;

    const memoizedEstimateLineCount = memoize(({ text, maxWidth, isNumeric = false }: EstimateLineCountProps) => {
      if (isNumeric) {
        return 1;
      }

      let lineCount = 0;
      let nextLine: string | null = text;

      do {
        lineCount += 1;
        nextLine = getNextLine(nextLine, maxWidth, fixedMeasureText);
      } while (nextLine !== null && lineCount < maxNbrLinesOfText);

      return lineCount;
    }, toKey) as EstimateLineCount;

    return {
      measureText: (text) => memoizedMeasureText(text).width,
      estimateWidth: (length: number) => memoizedMeasureText(MAGIC_DEFAULT_CHAR).width * length,
      estimateLineCount: memoizedEstimateLineCount,
    };
  }, [fontStyle, bold, fontSize, fontFamily, maxNbrLinesOfText]);

  return { estimateWidth, measureText, estimateLineCount };
}
