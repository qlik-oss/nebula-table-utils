import { rgb } from 'd3-color';

const isDarkColor = (color: string | null | undefined) => {
  if (color) {
    const rgbColor = rgb(color);

    /**
     * Using the HSP (Highly Sensitive Perceived brightness) value, determine whether the color is light or dark.
     * HSP < 125, the color is dark, otherwise, the color is light.
     *
     * NOTE: This algoritm does not take "opacity" into account and will have problems with color definitions that uses opacity.
     * For example consider something like "rgba(0, 0, 0, 0.03)", it be will resolved as dark. But in reality is it likely
     * to be precived as light.
     */
    return 0.299 * rgbColor.r + 0.587 * rgbColor.g + 0.114 * rgbColor.b < 125;
  }

  return false;
};

export default isDarkColor;
