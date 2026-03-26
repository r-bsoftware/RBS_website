import { waitLocale } from 'svelte-i18n';
import { initI18n } from '$lib/i18n';

export const prerender = false;

export async function load() {
	initI18n();
	await waitLocale();
}
