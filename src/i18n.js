import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Language translations
const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      home: "Home",
      about: "About Us",
      heroMessage:"Your Property. Our Expertise. Maximized Returns",
      heroSubtitle:"Flexible rental solutions — short, mid, or long term. Fully managed."
    },
  },
  tr: {
    translation: {
      welcome: "Hoş geldiniz",
      home: "Ana Sayfa",
      about: "Hakkımızda",
      heroMessage:"Sizin Mülkünüz. Bizim Uzmanlığımız. Maksimum Getiriler",
      heroSubtitle:"Esnek kiralama çözümleri — kısa, orta veya uzun vadeli. Tamamen yönetilir."
    },
  },
  ar: {
    translation: {
      welcome: "أهلا بك",
      home: "الصفحة الرئيسية",
      about: "معلومات عنا",
      heroMessage:"عقارك. خبرتنا. عوائد مُجزية",
      heroSubtitle:"حلول تأجير مرنة - قصيرة، متوسطة، أو طويلة الأجل. إدارة كاملة."
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
