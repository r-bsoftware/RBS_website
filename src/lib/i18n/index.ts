import { browser } from '$app/environment';
import { init, register, getLocaleFromNavigator, locale } from 'svelte-i18n';

const defaultLocale = 'es';

register('es', () => import('./locales/es.json'));
register('en', () => import('./locales/en.json'));

export function initI18n() {
	init({
		fallbackLocale: defaultLocale,
		initialLocale: browser ? getLocaleFromNavigator() ?? defaultLocale : defaultLocale
	});
}

export function setLocale(lang: string) {
	locale.set(lang);
	if (browser) {
		localStorage.setItem('rbs_locale', lang);
		document.documentElement.lang = lang;
	}
}

export function getStoredLocale(): string | null {
	if (browser) {
		return localStorage.getItem('rbs_locale');
	}
	return null;
}

export { locale } from 'svelte-i18n';
