import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import authMessagesEn from './en/authErrors';
import uiMessagesEn from './en/uiMessages';
import authMessagesJa from './ja/authErrors';
import uiMessagesJa from './ja/uiMessages';
import errorMessageJa from './ja/errorMessage';
import errorMessageEn from './en/errorMessage';

const resources = {
  en: {
    auth: authMessagesEn,
    ui: uiMessagesEn,
    error: errorMessageEn,
  },
  ja: {
    auth: authMessagesJa,
    ui: uiMessagesJa,
    error: errorMessageJa,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ja', // 初期言語を設定
  fallbackLng: 'ja', // 未翻訳のテキストがある場合のデフォルト言語
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
