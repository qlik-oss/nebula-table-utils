import isTransparentColor from '.';

describe('isTransparentColor', () => {
  test('should return false if color is undefined', () => {
    expect(isTransparentColor(undefined)).toBe(false);
  });

  test('should return false if color is null', () => {
    expect(isTransparentColor(null)).toBe(false);
  });

  test('should return false if color is empty string', () => {
    expect(isTransparentColor('')).toBe(false);
  });

  test('should return false if color is not transparent', () => {
    expect(isTransparentColor('white')).toBe(false);
  });

  test('should return true if color is transparent', () => {
    expect(isTransparentColor('transparent')).toBe(true);
  });

  test('should return true if color has zero opacity', () => {
    expect(isTransparentColor('rgba(0, 0, 0, 0)')).toBe(true);
    expect(isTransparentColor('rgba(255, 255, 255, 0)')).toBe(true);
  });
});
