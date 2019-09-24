import fetchMock from 'fetch-mock';
import authInfo from './data/authInfo.json';
import fodselsnr from './data/fodselsnr.json';
import kontaktInfo from './data/kontaktInfo.json';
import enheter from './data/enheter.json';
import Environment from '../../utils/Environments';
import fullmaktsgiver from './data/fullmaktsgiver.json';
import fullmektig from './data/fullmektig.json';

const { baseUrl, apiUrl, personInfoApiUrl } = Environment();
fetchMock.config.fallbackToNetwork = true;

const mockAuthInfo = true;
const mockFodselsnr = true;
const mockKontaktInfo = true;
const mockEhyeter = true;
const mockFullmaktsgiver = true;
const mockFullmektig = true;

export const setUpMock = async () => {
  mockAuthInfo &&
    fetchMock.get(
      `${baseUrl}/innloggingslinje-api/auth`,
      delay(10, 50).then(() => authInfo)
    );
  mockEhyeter &&
    fetchMock.get(`${apiUrl}/enheter`, delay(5000, 6000).then(() => enheter));
  mockFodselsnr &&
    fetchMock.get(`${apiUrl}/fodselsnr`, delay(10, 50).then(() => fodselsnr));
  mockKontaktInfo &&
    fetchMock.get(
      `${personInfoApiUrl}/kontaktinformasjon`,
      delay(10, 50).then(() => kontaktInfo)
    );
  mockFullmaktsgiver &&
    fetchMock.get(`${apiUrl}/fullmaktsgiver`, delay(10, 50).then(() => fullmaktsgiver));
  mockFullmektig &&
    fetchMock.get(`${apiUrl}/fullmektig`, delay(10, 50).then(() => fullmektig));
};

const delay = (min: number, max: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};
