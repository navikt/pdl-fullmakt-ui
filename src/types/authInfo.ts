import { HTTPError } from '../components/error/Error';

export type FetchAuthInfo =
  | { status: 'LOADING' }
  | { status: 'RESULT'; data: AuthInfo }
  | { status: 'ERROR'; error: HTTPError };

export type AuthInfo =
  | {
      authenticated: false;
    }
  | {
      authenticated: true;
      name: string;
      securityLevel: string;
      fodselsnr: string;
    };
