import { HTTPError } from '../components/error/Error';

export type FetchOmraade =
  | { status: 'LOADING' }
  | { status: 'RESULT'; data: Omraade[] }
  | { status: 'ERROR'; error: HTTPError };

export interface Omraade {
  sortering: number;
  kode: string;
  term: string;
  tekst: string;
}
