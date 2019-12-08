export const fullmaktFormConfig = {
  fullmektigsNavn: {
    isRequired: 'Fullmektigens navn er påkrevd'
  },
  fullmektigFodselsnr: {
    isRequired: 'Fullmektigens fødselsnummer er påkrevd',
    isExactLength: {
      message: 'Fødselsnummer må være 11 siffer',
      length: 11
    },
    isRegexMatch: {
      message: 'Fødselsnummer må være 11 siffer',
      regex: /^\d{11}$/
    }
  },
  omraade: {
    isRequired: 'Område er påkrevd'
  },
  gyldigFraOgMed: {
    isRequired: 'Fra-dato er påkrevd'
  },
  gyldigTilOgMed: {
    isRequired: 'Til-dato er påkrevd'
  },
  hvemOmraade: {}
};
