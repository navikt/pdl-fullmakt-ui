import fetchMock from 'fetch-mock';
import authInfo from './data/authInfo.json';
import fodselsnr from './data/fodselsnr.json';
import kontaktInfo from './data/kontaktInfo.json';
import Environment from '../../utils/Environments';
import fullmaktsgiver from './data/fullmaktsgiver.json';
import fullmektig from './data/fullmektig.json';
import omraade from './data/omraade.json';
import navn from './data/navn.json';

const { baseUrl, apiUrl, personInfoApiUrl } = Environment();
fetchMock.config.fallbackToNetwork = true;

const mockAuthInfo = true;
const mockFodselsnr = true;
const mockKontaktInfo = true;
const mockFullmaktsgiver = true;
const mockFullmektig = true;
const mockOmraade = true;
const mockNavn = true;
export const setUpMock = async () => {
  mockAuthInfo &&
    fetchMock.get(
      `${baseUrl}/innloggingslinje-api/auth`,
      delay(10, 50).then(() => authInfo)
    );
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
  mockOmraade && fetchMock.get(`${apiUrl}/omraade`, delay(10, 50).then(() => omraade));

  mockNavn && fetchMock.get(`${apiUrl}/navn`, delay(10, 50).then(() => navn));
};

const delay = (min: number, max: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};
