import getHoverColor from '.';

describe('getHoverColor', () => {
  test('should return hover color for transparent color', () => {
    expect(getHoverColor('transparent')).toEqual('rgba(0, 0, 0, 0.03)');
  });

  test('should return hover color for a dark color', () => {
    expect(getHoverColor('black')).toEqual('rgb(13, 13, 13)');
  });

  test('should return hover color for a bright color', () => {
    expect(getHoverColor('white')).toEqual('rgb(245, 245, 245)');
  });
});
