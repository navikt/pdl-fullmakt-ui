import { Omraade, UnderNode } from '../types/omraade';
import { string } from 'prop-types';
import { Node } from 'typescript';

export const mapSubNodes = (obj: any): any =>
  obj.map((n: UnderNode) => ({ checked: false, label: n.termer.no, value: n.kode }));

export const getArrayOfNodes = (obj: any): any => Object.values(obj).map(o => o);

export const transformData = (omraade: any): Omraade[] =>
  getArrayOfNodes(omraade.noder).map((node: any) => ({
    ...node,
    undernoder: getArrayOfNodes(node.undernoder)
  }));

export const kodeDetaljer = (kode: string, omraader: Omraade[]): string => {
  var node = omraader.find(o => o.undernoder.find(u => u.kode === kode));
  var underNode = node ? node.undernoder.find(u => u.kode === kode) : null;
  return underNode ? underNode.termer.no : kode;
};

export const hentOmraadeDetaljer = (omraader: Omraade[], kodeList: string): string[] =>
  omraader && kodeList
    ? kodeList.split(';').map(kode => kodeDetaljer(kode, omraader))
    : [kodeList];

// string functions
export const sortSubString = (list: string): string =>
  list &&
  list
    .split(';')
    .sort((a: string, b: string) => (a < b ? -1 : 1))
    .join(';');

export const findSubString = (s: string, list: string): boolean =>
  s && list && list.split(';').find(d => d === s) ? true : false;

export const addSubString = (s: string, list: string): string =>
  findSubString(s, list) ? list : sortSubString(list ? list + ';' + s : list + s);

export const removeSubString = (s: string, list: string): string =>
  s &&
  list &&
  list
    .split(';')
    .filter(d => d !== s)
    .join(';');
