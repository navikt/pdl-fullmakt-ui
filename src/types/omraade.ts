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
    nb: string;
  };
  undernoder: UnderNode[];
}

export interface UnderNode {
  kode: string;
  termer: {
    nb: string;
  };
}

export interface Node {
  kode: string;
  termer: string;
}
