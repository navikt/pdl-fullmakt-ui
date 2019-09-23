export const baseFormConfig = {
  omraade: {
    isRequired: 'Område er påkrevd'
  }
};

export const fullmaktFormConfig = {
  fullmektigNavn: {
    isRequired: 'Navn er påkrevd'
  },
  fullmektigFodselsnr: {
    isRequired: 'Fullmektig fødselsnummer er påkrevd',
    isExactLength: {
      message: 'Fødselsnummer må være 11 siffer',
      length: 11
    }
  },
  gyldigFraOgMed: {
    isRequired: 'Gyldig fra og med dato er påkrevd'
  },
  gyldigTilOgMed: {
    isRequired: 'Gyldig til og med dato er påkrevd'
  }
};
