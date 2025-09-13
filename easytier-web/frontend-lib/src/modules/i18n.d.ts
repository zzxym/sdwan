import type { Locale } from 'vue-i18n';
export declare const i18n: import("vue-i18n").I18n<{}, {}, {}, string, false>;
export declare const availableLocales: string[];
export declare function toggleLanguage(): void;
export declare function getCurrentLanguage(): string;
export declare function loadLanguageAsync(lang: string): Promise<Locale>;
declare const _default: {
    i18n: import("vue-i18n").I18n<{}, {}, {}, string, false>;
    localesMap: Record<string, any>;
    loadLanguageAsync: typeof loadLanguageAsync;
    toggleLanguage: typeof toggleLanguage;
    getCurrentLanguage: typeof getCurrentLanguage;
};
export default _default;
