import { filterEmpty, getCookie } from '../index';

describe('Utils', () => {
  describe('getCookie', () => {
    const cookieName = 'testCookie';
    const cookieValue = 'testCookieValue';

    beforeEach(() => {
      document.cookie = `${cookieName}=${cookieValue}`;
    });

    test('should return cookie value for existing cookie', () => {
      const result = getCookie(cookieName);
      expect(result).toBe(cookieValue);
    });

    test('should return undefined if cookie does not exist', () => {
      const result = getCookie('foo');
      expect(result).toBe('');
    });
  });

  describe('filterEmpty', () => {
    test('should remove falsy entries', () => {
      const input = {
        a: 1,
        b: 0,
        c: 2,
        d: null,
        e: undefined,
        f: [],
        g: {},
        h: 'test'
      };

      const result = filterEmpty(input);

      const expectedResult = {
        a: 1,
        c: 2,
        f: [],
        g: {},
        h: 'test'
      };

      expect(result).toEqual(expectedResult);
    });
  });
});
