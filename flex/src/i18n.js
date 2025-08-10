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
      heroSubtitle:"Flexible rental solutions — short, mid, or long term. Fully managed.",
      MidheroMessage:"Explore MidTerm Rental Properties",
      MidheroSubtitle:"Less Stress, Flexibility and More Savings",
      LongheroMessage:"Explore Long Term Rental Properties",
      LongheroSubtitle:"Less Stress, Flexibility and More Savings"
    },
  },
  tr: {
    translation: {
      welcome: "Hoş geldiniz",
      home: "Ana Sayfa",
      about: "Hakkımızda",
      heroMessage:"Sizin Mülkünüz. Bizim Uzmanlığımız. Maksimum Getiriler",
      heroSubtitle:"Esnek kiralama çözümleri — kısa, orta veya uzun vadeli. Tamamen yönetilir.",
      MidheroMessage:"Bizimle Orta Vadeli Kiralık Mülkleri Keşfedin",
      MidheroSubtitle:"Daha Az Stres, Esneklik ve Daha Fazla Tasarruf",
      LongheroMessage:"Uzun Dönem Kiralık Mülkleri Keşfedin",
      LongheroSubtitle:"Daha Az Stres, Esneklik ve Daha Fazla Tasarruf"
    },
  },
  ar: {
    translation: {
      welcome: "أهلا بك",
      home: "الصفحة الرئيسية",
      about: "معلومات عنا",
      heroMessage:"عقارك. خبرتنا. عوائد مُجزية",
      heroSubtitle:"حلول تأجير مرنة - قصيرة، متوسطة، أو طويلة الأجل. إدارة كاملة.",
      MidheroMessage:"استكشف عقارات الإيجار متوسطة الأجل معنا",
      MidheroSubtitle:"أقل توترًا ومرونة ومدخرات أكثر",
      LongheroMessage:"استكشف عقارات الإيجار طويلة الأجل",
      LongheroSubtitle:"أقل توترًا ومرونة ومدخرات أكثر"
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
