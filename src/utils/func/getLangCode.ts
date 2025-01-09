import { franc } from 'franc';
import { Languages } from '../params/Languages';

export function GetLangCode(text: string) {
    const langCodeIso3 = franc(text);
    console.log(langCodeIso3)
    const detectLanguage = Languages.find((el) => el.iso3 === langCodeIso3);

    if(detectLanguage) return detectLanguage.iso1;

    return detectLanguageByCharacters(text);
}

export function GetLangNameByIso(iso: string) {
    if (iso.length === 2) return Languages.find((el) => el.iso1 === iso)?.name;
    if (iso.length === 3) return Languages.find((el) => el.iso3 === iso)?.name;
    return 'unknown';
}

function detectLanguageByCharacters(text: string): string | null {
    const sanitizedText = text.replace(/[^a-zA-Zа-яА-Я0-9\u4E00-\u9FFF\uAC00-\uD7A3\u0600-\u06FF]/g, '');

    if (/[\u0400-\u04FF]/.test(sanitizedText)) {
        return 'ru';
    }

    if (/[\u4E00-\u9FFF]/.test(sanitizedText)) {
        return 'zh';
    }

    if (/[\uAC00-\uD7A3]/.test(sanitizedText)) {
        return 'ko';
    }

    if (/[\u0600-\u06FF]/.test(sanitizedText)) {
        return 'ar';
    }

    if (/[a-zA-Z]/.test(sanitizedText)) {
        return 'en';
    }

    return "unknown"; // Если ничего не подошло
}