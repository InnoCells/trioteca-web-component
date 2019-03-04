import i18next from 'i18next';
import commonES from './es/translations.json';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'es',
  resources: {
    es: {
      translation: commonES
    }
  }
});

export default i18next;
