import Environment from '../utils/Environments';
import { HTTPError } from '../components/error/Error';
import { logApiError } from '../utils/logger';
import { FullmaktViewType } from '../types/fullmakt';

const { appUrl, loginUrl, baseUrl, apiUrl, personInfoApiUrl } = Environment();

const parseJson = (data: any) => data.json();

const sjekkForFeil = (url: string, response: Response) => {
  if (response.ok) {
    return response;
  } else {
    const error = {
      code: response.status,
      text: response.statusText
    };
    throw error;
  }
};

const hentJson = (url: string) =>
  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    credentials: 'include'
  })
    .then(response => sjekkForFeil(url, response))
    .then(parseJson)
    .catch((err: string & HTTPError) => {
      const error = {
        code: err.code || 404,
        text: err.text || err
      };
      logApiError(url, error);
      throw error;
    });

const sendJson = (url: string, data: FullmaktViewType) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  })
    .then(response => sjekkForFeil(url, response))
    .then(parseJson)
    .catch((err: string & HTTPError) => {
      const error = {
        code: err.code || 404,
        text: err.text || err
      };
      logApiError(url, error);
      throw error;
    });

export const sendTilLogin = () => {
  const { pathname } = window.location;

  if (pathname.includes('/fullmakt')) {
    window.location.assign(`${loginUrl}?redirect=${appUrl}/fullmakt`);
  } else {
    window.location.assign(`${loginUrl}?redirect=${appUrl}`);
  }
};

export const fetchFodselsnr = () => hentJson(`${apiUrl}/fodselsnr`);

export const fetchAuthInfo = () => hentJson(`${baseUrl}/innloggingslinje-api/auth`);

export const fetchKontaktInfo = () => hentJson(`${personInfoApiUrl}/kontaktinformasjon`);

export const fetchFullmaktsgiver = () => hentJson(`${apiUrl}/fullmaktsgiver`);

export const fetchFullmektig = () => hentJson(`${apiUrl}/fullmektig`);

export const fetchOmraade = () => hentJson(`${apiUrl}/fullmaktsgiver/omraade`);

export const fetchNavn = () => hentJson(`${apiUrl}/navn`);

export const postFullmakt = (data: FullmaktViewType) =>
  sendJson(`${apiUrl}/mottak/fullmakt`, data);

export const postFeilOgMangler = (data: any) =>
  sendJson(`${apiUrl}/mottak/feil-og-mangler`, data);
