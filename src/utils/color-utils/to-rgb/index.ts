import { rgb } from 'd3-color';

const ARGB_REGEX = /^argb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i;

export const toRGB = (color: string) => {
  const matches = ARGB_REGEX.exec(color);

  if (matches) {
    const [, a, r, g, b] = matches;
    const normalizedAlpha = +a / 255;
    return rgb(+r, +g, +b, normalizedAlpha);
  }

  return rgb(color);
};

const toRGBString = (color: string) => toRGB(color).toString();

export default toRGBString;
