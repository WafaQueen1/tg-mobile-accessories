import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      "home": "Accueil",
      "shop": "Boutique",
      "cart": "Panier",
      "wholesale": "Grossiste Officiel",
      "fastDelivery": "Livraison Rapide",
      "guarantee": "Produit Garanti",
      "addToCart": "Ajouter au Panier",
      "only_left": "Plus que {{count}} en stock !",
      "savings": "Bravo ! Vous économisez {{amount}} DZD",
      "total": "Total",
      "categories": "Catégories",
      "hero_title": "L\'Excellence Mobile",
      "hero_subtitle": "Accessoires de luxe pour ceux qui exigent la perfection."
    }
  },
  en: {
    translation: {
      "home": "Home",
      "shop": "Shop",
      "cart": "Cart",
      "wholesale": "Official Wholesaler",
      "fastDelivery": "Fast Delivery",
      "guarantee": "Guaranteed Product",
      "addToCart": "Add to Cart",
      "only_left": "Only {{count}} left in stock!",
      "savings": "Great! You save {{amount}} DZD",
      "total": "Total",
      "categories": "Categories",
      "hero_title": "Mobile Excellence",
      "hero_subtitle": "Luxury accessories for those who demand perfection."
    }
  },
  ar: {
    translation: {
      "home": "الرئيسية",
      "shop": "المتجر",
      "cart": "السلة",
      "wholesale": "موزع الجملة الرسمي",
      "fastDelivery": "توصيل سريع",
      "guarantee": "منتج مضمون",
      "addToCart": "أضف إلى السلة",
      "only_left": "باقي {{count}} في المخزون!",
      "savings": "ممتاز! لقد وفرت {{amount}} د.ج",
      "total": "الإجمالي",
      "categories": "الأقسام",
      "hero_title": "التميز في الهواتف",
      "hero_subtitle": "إكسسوارات فاخرة لمن يبحث عن الكمال."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || 'fr',
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
