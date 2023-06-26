import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

const i18nInstance = i18n.createInstance();

i18nInstance
  .use(initReactI18next) // передаем i18n в react-i18next
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    debug: true,

    interpolation: {
      escapeValue: false, // react уже защищает от XSS
    },
  });

export default i18nInstance;
