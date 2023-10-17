import toRGBString from '.';

describe('toRGB', () => {
  test('should convert ARGB to rgba', () => {
    expect(toRGBString('ARGB(153, 20, 40, 60)')).toEqual('rgba(20, 40, 60, 0.6)');
  });

  test('should convert argb to rgba', () => {
    expect(toRGBString('argb(153, 20, 40, 60)')).toEqual('rgba(20, 40, 60, 0.6)');
  });

  test('should convert hsl to rgb', () => {
    expect(toRGBString('hsl(90, 50%, 50%)')).toEqual('rgb(128, 191, 64)');
  });

  test('should convert RGB to rgb', () => {
    expect(toRGBString('RGB(20, 40, 60)')).toEqual('rgb(20, 40, 60)');
  });

  test('should convert hex to rgb', () => {
    expect(toRGBString('#404040')).toEqual('rgb(64, 64, 64)');
  });
});
