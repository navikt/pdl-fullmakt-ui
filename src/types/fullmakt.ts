export type ON_BEHALF_OF = 'PRIVATPERSON' | 'ANNEN_PERSON' | 'BEDRIFT';

export type OutboundFullmaktBase = {
  klagetekst: string;
  oenskerAaKontaktes: boolean;
};

export type OutboundFullmaktType =
  | {
      klagetype: 'SAKSBEHANDLING';
      ytelseTjeneste: string;
    }
  | {
      klagetype: 'NAV_KONTOR' | 'TELEFON' | 'NAVNO' | 'ANNET';
    };

export type OutboundFullmaktExtend =
  | {
      paaVegneAv: 'PRIVATPERSON';
      innmelder: {
        navn: string;
        telefonnummer: string;
        personnummer: string;
      };
    }
  | {
      paaVegneAv: 'ANNEN_PERSON';
      innmelder: {
        navn: string;
        telefonnummer: string;
        harFullmakt: boolean;
        rolle: string;
      };
      paaVegneAvPerson: {
        navn: string;
        personnummer: string;
      };
    }
  | {
      paaVegneAv: 'BEDRIFT';
      innmelder: {
        navn: string;
        telefonnummer: string;
        rolle: string;
      };
      paaVegneAvBedrift: {
        navn: string;
        organisasjonsnummer: string;
        postadresse: string;
        telefonnummer: string;
      };
    };
