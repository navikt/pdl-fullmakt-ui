import { dateToString, dateToIso } from '../mappers';

describe('Utils mappers', () => {
  describe('dateToString', () => {
    test('should format a valid date', () => {
      const result = dateToString('2018-04-06T14:54:12');
      expect(result).toBe('06.04.2018');
    });

    test('should return empty string if passed an invalid date', () => {
      const result = dateToString('2018-13-06');
      expect(result).toBe('');
    });

    test('should format a valid date with time if includeTime is true', () => {
      const result = dateToString('2018-04-06T14:54:12', true);
      expect(result).toBe('06.04.2018 kl: 14:54');
    });
  });

  describe('dateToIso', () => {
    test('should format a valid date', () => {
      const result = dateToIso('12.11.2018');
      expect(result).toBe('2018-11-12');
    });

    test('should return empty string if passed an invalid date', () => {
      const result = dateToIso('12.13.2018');
      expect(result).toBe('');
    });

    test('should return default value if passed an invalid date and a default value', () => {
      const defaultValue = 'testdato';
      const result = dateToIso('12.13.2018', defaultValue);
      expect(result).toBe(defaultValue);
    });

    test('should return iso date when input is already in iso-format', () => {
      const result = dateToIso('2018-05-17');
      expect(result).toBe('2018-05-17');
    });
  });
});
