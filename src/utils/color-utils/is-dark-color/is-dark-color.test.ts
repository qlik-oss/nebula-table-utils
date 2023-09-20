import isDarkColor from '.';

describe('isDarkColor', () => {
  test('should return false if color is undefined', () => {
    expect(isDarkColor(undefined)).toBe(false);
  });

  test('should return false if color is null', () => {
    expect(isDarkColor(null)).toBe(false);
  });

  test('should return false if color is empty string', () => {
    expect(isDarkColor('')).toBe(false);
  });

  test('should return false if color is light', () => {
    expect(isDarkColor('white')).toBe(false);
  });

  test('should return true if color is dark', () => {
    expect(isDarkColor('black')).toBe(true);
  });
});
