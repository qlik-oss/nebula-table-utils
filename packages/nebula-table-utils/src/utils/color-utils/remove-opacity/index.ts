import { toRGB } from '../to-rgb';

const removeOpacity = (color: string | undefined) => {
  if (color === undefined) {
    return undefined;
  }

  const rgb = toRGB(color);
  rgb.opacity = 1;

  return rgb.toString();
};

export default removeOpacity;
