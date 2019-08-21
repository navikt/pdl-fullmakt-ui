import * as moment from 'moment';

export const dateToString = (isoDateString: string, includeTime = false) => {
  const dateMoment = moment(isoDateString, moment.ISO_8601);
  if (dateMoment.isValid()) {
    const dateString = dateMoment.format('DD.MM.YYYY');
    if (includeTime) {
      const time = `kl: ${dateMoment.format('HH:mm')}`;
      return `${dateString} ${time}`;
    }
    return dateString;
  }
  return '';
};

export const dateToIso = (date: string, defaultValue = '') => {
  const m = moment(date, 'DD.MM.YYYY', true);
  if (m.isValid()) {
    return m.format('YYYY-MM-DD');
  } else if (moment(date, 'YYYY-MM-DD', true).isValid()) {
    return date;
  }
  return defaultValue;
};

export const mapConstantsToList = (constants: {
  [key: string]: { label: string; value: string };
}) =>
  Object.keys(constants).map(key => ({
    label: constants[key].label,
    value: constants[key].value,
    id: key
  }));
