<script>
	import '../app.css';
	import { getStoredLocale, setLocale } from '$lib/i18n';
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();

	onMount(() => {
		const stored = getStoredLocale();
		if (stored) setLocale(stored);
	});
</script>

<!-- accent-rbs mounts the apex's Palacio Engine accent so future Palacio-themed
     sections (4-function cards CTAs, signing previews) inherit the apex tone. -->
<div class="min-h-screen bg-slate-950 accent-rbs">
	<Header />
	<main id="main">
		{@render children()}
	</main>
</div>
