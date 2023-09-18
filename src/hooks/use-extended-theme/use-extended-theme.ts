import { stardust, useMemo, useTheme } from '@nebula.js/stardust';
import type { ExtendedTheme, BackgroundColors } from './types';
import isTransparentColor from '../../utils/is-transparent-color';
import isDarkColor from '../../utils/is-dark-color';

type ChartBackgroundResolver = (theme: stardust.Theme) => string | undefined;

/**
 * The colors in the chart can depend on background colors set on the chart, object and sheet level.
 * Even though not officially supported, it is expected that css settings on object and sheet are respected.
 * The priority order is: chart theme > object css > object theme
 * If the result for object/chart background is transparent, the sheet css color is used
 */
export const getBackgroundColors = (
  theme: ExtendedTheme,
  rootElement: HTMLElement,
  chartBackgroundResolver?: ChartBackgroundResolver,
  objectBackgroundResolver?: ChartBackgroundResolver
): BackgroundColors => {
  const qvInnerObject = rootElement?.closest('.qv-object .qv-inner-object');
  const objectColorFromCSS = qvInnerObject && window.getComputedStyle(qvInnerObject).backgroundColor;

  const qvPanelSheet = rootElement?.closest('.qv-panel-sheet');
  const sheetColorFromCSS = qvPanelSheet && window.getComputedStyle(qvPanelSheet).backgroundColor;

  // chartBackgroundFromTheme is undefined if nothing is set specifically for the chart (ex: object.straightTableV2.backgroundColor)
  const chartBackgroundFromTheme = chartBackgroundResolver?.(theme);
  // objectBackgroundFromTheme traverses the theme tree until it finds a value for backgroundColor
  // it is undefined if there is no value
  const objectBackgroundFromTheme = objectBackgroundResolver?.(theme);

  const color = chartBackgroundFromTheme || objectColorFromCSS || objectBackgroundFromTheme;
  const isTransparent = isTransparentColor(color);
  const isDark = isDarkColor(isTransparent ? sheetColorFromCSS : color);

  return {
    tableColorFromTheme: chartBackgroundFromTheme || 'inherit', // TODO rename or remove tableColorFromTheme
    color,
    isDark,
    isTransparent,
  };
};

const useExtendedTheme = (
  rootElement: HTMLElement,
  chartBackgroundResolver?: ChartBackgroundResolver,
  objectBackgroundResolver?: ChartBackgroundResolver
): ExtendedTheme => {
  // TODO: add name method to stardust.Theme
  const nebulaTheme = useTheme() as ExtendedTheme;
  return useMemo(
    () =>
      ({
        ...nebulaTheme,
        background: getBackgroundColors(nebulaTheme, rootElement, chartBackgroundResolver, objectBackgroundResolver),
      }) as ExtendedTheme,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nebulaTheme.name(), rootElement, chartBackgroundResolver, objectBackgroundResolver]
  );
};

export default useExtendedTheme;
