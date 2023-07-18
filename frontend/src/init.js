import React from 'react';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider } from '@rollbar/react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import resources from './locales/index.js';
// import socketManager from '../socketManager';
import store from './slices';
import App from './components/App';

const i18n = i18next.createInstance();

await i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    debug: true,

    interpolation: {
      escapeValue: false,
    },
  });

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: 'testenv',
};

filter.add(filter.getDictionary('ru'));

export default async () => (
  <RollbarProvider config={rollbarConfig}>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </RollbarProvider>
);
