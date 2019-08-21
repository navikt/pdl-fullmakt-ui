export interface RestService {
  name: string;
  header: { restServiceName: string };
}

export const TEST_URL: RestService = Object.freeze({
  name: 'TEST_URL',
  header: {
    restServiceName: 'app.test.urø.v1'
  }
});
