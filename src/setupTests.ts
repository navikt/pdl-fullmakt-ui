import { LanguageJson } from './language';
import { I18n } from 'react-i18nify';
import 'jest-enzyme';
import { configure } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';

configure({ adapter: new ReactSixteenAdapter() });

if (!global['localStorage']) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  global['localStorage'] = new LocalStorage('./');
}

I18n.setTranslations(LanguageJson);
I18n.setLocale('no');
