<script lang="ts">
	import { locale, _ } from 'svelte-i18n';
	import { setLocale } from '$lib/i18n';

	const currentLocale = $derived($locale || 'es');

	function toggle() {
		const next = currentLocale === 'es' ? 'en' : 'es';
		setLocale(next);
	}
</script>

<button
	onclick={toggle}
	class="px-2 py-1 text-xs font-medium text-slate-400 hover:text-white transition-colors rounded border border-slate-700 hover:border-slate-500"
	aria-label={$_('nav.switchLanguage')}
>
	{currentLocale === 'es' ? 'EN' : 'ES'}
</button>
