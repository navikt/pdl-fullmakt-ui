import { HTTPError } from '../components/error/Error';

export type FetchNavn =
  | { status: 'LOADING' }
  | { status: 'RESULT'; data: NavnType[] }
  | { status: 'ERROR'; error: HTTPError };

export type NavnType = {
  fodselsnr: string;
  navn: string;
};
