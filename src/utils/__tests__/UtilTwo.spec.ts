import UtilTwo from '../UtilTwo';

describe('UtilTwo()', () => {
  test('should return sum of inputs plus 100', () => {
    expect(UtilTwo(10, 10)).toBe(120);
  });
});
