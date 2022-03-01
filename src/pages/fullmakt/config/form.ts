import * as yup from 'yup';

export const validationSchema = yup.object({
  fullmektigsNavn: yup.string().required('Fullmektigens navn er påkrevd'),
  fullmektigFodselsnr: yup
    .string()
    .required('Fullmektigens fødselsnummer er påkrevd')
    .length(11, 'Fødselsnummer må være 11 siffer')
    .matches(/^\d{11}$/, 'Fødselsnummer må være 11 siffer'),
  omraade: yup.bool().oneOf([true], 'Område er påkrevd'),
  gyldigFraOgMed: yup
    .string()
    .required('Fra-dato er påkrevd')
    .matches(/^((?!Ugyldig dato).)*$/, 'Ugyldig dato'),
  gyldigTilOgMed: yup
    .string()
    .required('Til-dato er påkrevd')
    .matches(/^((?!Ugyldig dato).)*$/, 'Ugyldig dato')
});
