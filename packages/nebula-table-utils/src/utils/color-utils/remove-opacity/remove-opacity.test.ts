import removeOpacity from '.';

describe('removeOpacity', () => {
  test('should remove opacity from ARGB', () => {
    expect(removeOpacity('ARGB(153, 20, 40, 60)')).toEqual('rgb(20, 40, 60)');
  });

  test('should remove opacity from RGBA', () => {
    expect(removeOpacity('rgba(20, 40, 60, 0.5)')).toEqual('rgb(20, 40, 60)');
  });
});
