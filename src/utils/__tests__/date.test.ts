import { timestampToString } from '../date';

describe('date utils', () => {
  describe('timestampToString', () => {
    test('should convert to date with time', () => {
      const result = timestampToString('2018-03-19 16:01');
      expect(result).toBe('19.03.2018 16:01');
    });

    test('should convert to date without time', () => {
      const result = timestampToString('2018-03-19 16:01', true);
      expect(result).toBe('19.03.2018');
    });
  });
});
