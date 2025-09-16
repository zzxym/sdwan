import { createI18n } from 'vue-i18n';
import EnLocale from '../locales/en.yaml';
import CnLocale from '../locales/cn.yaml';
// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
export const i18n = createI18n({
    legacy: false,
    locale: '',
    fallbackLocale: '',
    messages: {},
});
const localesMap = {
    "en": EnLocale,
    "cn": CnLocale,
};
export const availableLocales = Object.keys(localesMap);
const loadedLanguages = [];
export function toggleLanguage() {
    const currentLang = localStorage.getItem('lang') || 'en';
    const newLang = currentLang === 'en' ? 'cn' : 'en';
    loadLanguageAsync(newLang);
}
export function getCurrentLanguage() {
    return localStorage.getItem('lang') || 'en';
}
function setI18nLanguage(lang) {
    i18n.global.locale.value = lang;
    localStorage.setItem('lang', lang);
    return lang;
}
export async function loadLanguageAsync(lang) {
    // If the same language
    if (i18n.global.locale.value === lang)
        return setI18nLanguage(lang);
    // If the language was already loaded
    if (loadedLanguages.includes(lang))
        return setI18nLanguage(lang);
    // If the language hasn't been loaded yet
    let messages;
    try {
        messages = localesMap[lang];
    }
    catch {
        messages = localesMap.en;
    }
    i18n.global.setLocaleMessage(lang, messages);
    loadedLanguages.push(lang);
    return setI18nLanguage(lang);
}
export default {
    i18n,
    localesMap,
    loadLanguageAsync,
    toggleLanguage,
    getCurrentLanguage,
};
