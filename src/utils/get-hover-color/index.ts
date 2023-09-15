import { hcl, rgb } from 'd3-color';

interface ColorModifiers {
  brighter: number;
  darker: number;
  opacity: number;
}

const getHoverColor = (color: string, colorModifies: ColorModifiers) => {
  const hclColor = hcl(color);
  const isDark = hclColor.l < 70;
  const isWhite = hclColor.l === 100;
  const isTransparent = hclColor.opacity === 0;

  if (isTransparent) {
    hclColor.opacity = colorModifies.opacity;
    return hclColor.toString();
  }

  if (isWhite) {
    return rgb(`rgba(0, 0, 0, ${colorModifies.opacity})`).toString();
  }

  if (isDark) {
    return hclColor.brighter(colorModifies.brighter).toString();
  }

  return hclColor.darker(colorModifies.darker).toString();
};

export default getHoverColor;
