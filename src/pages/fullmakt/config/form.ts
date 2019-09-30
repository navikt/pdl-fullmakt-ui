export const fullmaktFormConfig = {
  fullmektigNavn: {
    isRequired: 'Fullmektigens navn er påkrevd'
  },
  fullmektigFodselsnr: {
    isRequired: 'Fullmektigens fødselsnummer er påkrevd',
    isExactLength: {
      message: 'Fødselsnummer må være 11 siffer',
      length: 11
    }
  },
  omraade: {
    isRequired: 'Område er påkrevd'
  },
  gyldigFraOgMed: {
    isRequired: 'Dato er påkrevd'
  },
  gyldigTilOgMed: {
    isRequired: 'Dato er påkrevd'
  }
};
