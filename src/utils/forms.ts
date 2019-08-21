export const getFeil = (touched = {}, errors = {}, field: string) =>
  touched[field] && errors[field] && { feilmelding: errors[field] };
