import toRGBString from '.';

describe('toRGB', () => {
  test('should convert ARGB to rgba', () => {
    expect(toRGBString('ARGB(153, 20, 40, 60)')).toEqual('rgba(20, 40, 60, 0.6)');
  });

  test('should convert ARGB without space to rgba', () => {
    expect(toRGBString('ARGB(153,20,40,60)')).toEqual('rgba(20, 40, 60, 0.6)');
  });

  test('should convert argb to rgba', () => {
    expect(toRGBString('argb(153, 20, 40, 60)')).toEqual('rgba(20, 40, 60, 0.6)');
  });

  test('should convert hsl to rgb', () => {
    expect(toRGBString('hsl(90, 50%, 50%)')).toEqual('rgb(128, 191, 64)');
  });

  test('should convert hsla to rgba', () => {
    expect(toRGBString('hsla(90, 50%, 50%, 0.5)')).toEqual('rgba(128, 191, 64, 0.5)');
  });

  test('should convert RGB to rgb', () => {
    expect(toRGBString('RGB(20, 40, 60)')).toEqual('rgb(20, 40, 60)');
  });

  test('should convert rgb without space to rgb', () => {
    expect(toRGBString('RGB(20,40,60)')).toEqual('rgb(20, 40, 60)');
  });

  test('should convert 3 digit hex to rgb', () => {
    expect(toRGBString('#f09')).toEqual('rgb(255, 0, 153)');
  });

  test('should convert 4 digit hex to rgba', () => {
    expect(toRGBString('#4049')).toEqual('rgba(68, 0, 68, 0.6)');
  });

  test('should convert 6 digit hex to rgb', () => {
    expect(toRGBString('#404040')).toEqual('rgb(64, 64, 64)');
  });

  test('should convert 8 digit hex to rgba', () => {
    expect(toRGBString('#40404099')).toEqual('rgba(64, 64, 64, 0.6)');
  });

  test('should handle invalid color strings', () => {
    expect(toRGBString('invalid color')).toBe(null);
  });
});
