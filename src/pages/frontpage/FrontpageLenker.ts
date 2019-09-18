export interface Lenke {
  tittel: string;
  beskrivelse: string;
  lenke: string;
  lenkeTekst: string;
  external?: boolean;
}

export const lenker: Lenke[] = [
  {
    tittel: 'Fullmaktsgiver',
    beskrivelse: 'Har kan du se på fullmakter, hvor du er fullmaktsgiver. ',
    lenke: '/person/pdl-fullmakt-ui/fullmakt/login',
    lenkeTekst: 'Fullmaktsgiver'
  },
  {
    tittel: 'Fullmektig',
    beskrivelse: 'Har kan du se på fullmakter, hvor du er fullmektig. ',
    lenke: '/person/pdl-fullmakt-ui/fullmakt/login',
    lenkeTekst: 'Fullmektig'
  }
];
