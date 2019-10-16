import moment from 'moment';

export const formatDate = (date: Date, format: string, locale: string) =>
  moment(date)
    .locale(locale)
    .format(format);

export const parseDate = (
  date: string,
  format: string,
  locale: string
): Date | undefined =>
  moment(date, format, true).isValid()
    ? moment(date, format)
        .locale(locale)
        .toDate()
    : undefined;

export const getDefaultDateFormat = (date: string) => moment(date).format('DD.MM.YYYY');

export const dateOneYearAhead = new Date(
  new Date().setFullYear(new Date().getFullYear() + 1)
);

export const nowDateFullmakt: string = moment().toISOString();
