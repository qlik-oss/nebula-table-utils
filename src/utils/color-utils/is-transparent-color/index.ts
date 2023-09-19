import { rgb } from 'd3-color';

const isTransparentColor = (color: string | null | undefined) => (color ? rgb(color).opacity === 0 : false);

export default isTransparentColor;
