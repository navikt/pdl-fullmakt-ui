export const fullmaktFormConfig = {
  fullmektigNavn: {
    isRequired: 'Navn er påkrevd'
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
    isRequired: 'Gyldig fra og med dato er påkrevd'
  },
  gyldigTilOgMed: {}
};
