import getHoverColor from '.';

describe('getHoverColor', () => {
  const colorModifies = {
    brighter: 0.1,
    darker: 0.2,
    opacity: 0.05,
  };

  test('should return hover color for transparent color', () => {
    expect(getHoverColor('transparent', colorModifies)).toEqual('rgba(0, 0, 0, 0.05)');
  });

  test('should return hover color for white color', () => {
    expect(getHoverColor('white', colorModifies)).toEqual('rgba(0, 0, 0, 0.05)');
  });

  test('should return hover color for a dark color', () => {
    expect(getHoverColor('black', colorModifies)).toEqual('rgb(7, 7, 7)');
  });

  test('should return hover color for a bright color', () => {
    expect(getHoverColor('rgb(200, 200, 200)', colorModifies)).toEqual('rgb(190, 190, 190)');
  });
});
