import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './langs/en';
import fr from './langs/fr';


const dateTimeFormats = {
  en: {
    short: {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
  fr: {
    short: {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
    long: {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
};

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'fr',
  dateTimeFormats,
  messages: {
    en,
    fr,
  },
});

export default i18n;
