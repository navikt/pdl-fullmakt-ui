import { HTTPError } from '../components/error/Error';

export type FetchOmraade =
  | { status: 'LOADING' }
  | { status: 'RESULT'; data: Omraade[] }
  | { status: 'ERROR'; error: HTTPError };

export interface OmraadeAPI {
  hierarkinivaaer: string[];
  noder: any;
}

export interface Omraade {
  kode: string;
  termer: {
    no: string;
  };
  undernoder: UnderNode[];
}

export interface UnderNode {
  kode: string;
  termer: {
    no: string;
  };
}
