import * as moment from 'moment';
import 'moment/locale/nb';

moment.updateLocale(moment.locale(), { invalidDate: 'ugyldig dato' });

export const timestampToString = (timestamp: string, hideTime = false) => {
  const format = hideTime ? 'L' : 'L LT';
  return moment(timestamp).format(format);
};

export const isToday = (date: string) => moment(date).isSame(moment(), 'day');

export const isBeforeToday = (date: string) => moment(date).isBefore(moment(), 'day');

export const getCurrentDate = () => moment().format('L');

export const prettyDate = (date: string, hideDay = false) => {
  const format = hideDay ? 'LL' : 'dddd LL';
  return moment(date).format(format);
};
