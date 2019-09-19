export const baseFormConfig = {
  klageType: {
    isRequired: 'Du må velge hva tilbakemeldingen gjelder'
  },
  hvemFra: {
    isRequired: 'Du må velge hvem tilbakemeldingen er på vegne av'
  },
  innmelderNavn: {
    isRequired: 'Navn er påkrevd'
  },
  onskerKontakt: {
    isRequired: 'Du må velge om du ønsker at vi tar kontakt'
  },
  melding: {
    isRequired: 'Melding er påkrevd'
  }
};

export const annenPersFormConfig = {
  paaVegneAvNavn: {
    isRequired: 'Navn er påkrevd'
  },
  paaVegneAvFodselsnr: {
    isRequired: 'Fødselsnummer er påkrevd',
    isExactLength: {
      message: 'Fødselsnummer må være 11 siffer',
      length: 11
    }
  },
  innmelderHarFullmakt: {
    isRequired: 'Fullmakt er påkrevd'
  },
  innmelderRolle: {
    isRequired: 'Rolle er påkrevd'
  }
};
