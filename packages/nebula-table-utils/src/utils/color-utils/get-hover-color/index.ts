import { hcl, rgb } from 'd3-color';

export interface ColorModifiers {
  brighter: number;
  darker: number;
  opacity: number;
}

const getHoverColor = (color: string, colorModifiers: ColorModifiers) => {
  const hclColor = hcl(color);
  const isDark = hclColor.l < 70;
  const isWhite = hclColor.l === 100;
  const isTransparent = hclColor.opacity === 0;

  if (isTransparent) {
    hclColor.opacity = colorModifiers.opacity;
    return hclColor.toString();
  }

  if (isWhite) {
    return rgb(`rgba(0, 0, 0, ${colorModifiers.opacity})`).toString();
  }

  if (isDark) {
    return hclColor.brighter(colorModifiers.brighter).toString();
  }

  return hclColor.darker(colorModifiers.darker).toString();
};

export default getHoverColor;
