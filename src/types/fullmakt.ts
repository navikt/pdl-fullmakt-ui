export type ON_BEHALF_OF = 'ANNEN_PERSON';

export type OutboundFullmaktExtend = {
  paaVegneAvPerson: {
    navn: string;
    personnummer: string;
  };
  paaVegneAv: 'ANNEN_PERSON';
  innmelder: {
    navn: string;
    telefonnummer: string;
    harFullmakt: boolean;
    rolle: string;
  };
};
