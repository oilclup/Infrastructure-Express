import { createI18n } from 'vue-i18n';

// Import your language files
function loadLocaleMessages() {
  const locales = require.context('../lang', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export default {
  install: (app) => {
    const i18n = createI18n({
      locale: localStorage.getItem('locale') || 'en',
      fallbackLocale: process.env.VUE_APP_I18N_LOCALE || 'en',
      messages: loadLocaleMessages()
    });

    // Make i18n available in all components via $i18n
    app.config.globalProperties.$i18n = i18n;

    app.use(i18n);
  }
};
