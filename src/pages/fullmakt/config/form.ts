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
    isRequired: 'Fra-dato er påkrevd'
  },
  gyldigTilOgMed: {
    isRequired: 'Til-dato er påkrevd'
  },
  hvemOmraade: {}
};
