import { hcl } from 'd3-color';

const COLOR_SPACE_MODIFIER = 0.2;

const getHoverColor = (color: string) => {
  const hclColor = hcl(color);
  const isDark = hclColor.l < 70;
  const isTransparent = hclColor.opacity === 0;

  if (isTransparent) {
    return 'rgba(0, 0, 0, 0.03)';
  }

  if (isDark) {
    return hclColor.brighter(COLOR_SPACE_MODIFIER).toString();
  }

  return hclColor.darker(COLOR_SPACE_MODIFIER).toString();
};

export default getHoverColor;
