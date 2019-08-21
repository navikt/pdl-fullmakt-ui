import { restGet } from '../';

jest.mock('../../utils', () => ({
  filterEmpty: (variable: any) => variable
}));

describe('restGet', () => {
  let mockFetch: jest.SpyInstance;

  beforeEach(() => {
    window.fetch = jest.fn();
    mockFetch = jest.spyOn(window, 'fetch');
  });

  test('should performs fetch for given url, headers and path variables', () => {
    const testUrl = 'test.url';
    const testHeaders = { headerTest: 'headerTestValue' };
    const testPathVariables = { testPathVariable: 'testPathVariableValue' };

    restGet(testUrl, testHeaders, testPathVariables);

    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toBe('test.url?testPathVariable=testPathVariableValue');
    expect(options.method).toBe('GET');
    expect(options.credentials).toBe('same-origin');

    const expectedHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      headerTest: 'headerTestValue',
      Authorization: 'Bearer null'
    };

    expect(options.headers).toEqual(expectedHeaders);
  });

  test('should not append path variables to url if none are provided', () => {
    const testUrl = 'test.url';

    restGet(testUrl);

    const url = mockFetch.mock.calls[0][0];
    expect(url).toBe(testUrl);
  });
});
