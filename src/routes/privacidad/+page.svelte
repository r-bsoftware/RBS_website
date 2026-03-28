<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import Footer from '$lib/components/Footer.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal';

	const dataItems = ['identification', 'contact', 'work', 'fiscal', 'financial', 'usage'] as const;
	const transferItems = ['cloud', 'pac', 'payment', 'authorities'] as const;
	const arcoItems = ['access', 'rectify', 'cancel', 'oppose'] as const;

	const primaryPurposes = $derived([0,1,2,3,4,5].map(i => $_(`privacy.section3.primary.${i}`)));
	const secondaryPurposes = $derived([0,1,2].map(i => $_(`privacy.section3.secondary.${i}`)));
	const securityItems = $derived([0,1,2,3,4,5].map(i => $_(`privacy.section6.items.${i}`)));
</script>

<svelte:head>
	<title>{$_('privacy.meta.title')}</title>
	<meta name="description" content={$_('privacy.meta.description')} />
	<meta property="og:locale" content={$locale === 'es' ? 'es_MX' : 'en_US'} />
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<!-- Content -->
<main class="py-16 px-4 sm:px-6 lg:px-8">
	<article class="max-w-4xl mx-auto" use:scrollReveal>
		<div class="mb-12">
			<h1 class="text-4xl font-bold text-white mb-4">{$_('privacy.title')}</h1>
			<p class="text-slate-400">{$_('privacy.lastUpdated')}: {$_('privacy.date')}</p>
		</div>

		<div class="prose prose-invert prose-slate max-w-none space-y-8">
			<section class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
				<h2 class="text-2xl font-bold text-white mb-4">{$_('privacy.section1.title')}</h2>
				<p class="text-slate-300 leading-relaxed">
					<strong class="text-white">Red Broom Software S.A.S. de C.V.</strong> {$_('privacy.section1.p1')}
				</p>
				<p class="text-slate-300 leading-relaxed mt-4">
					{$_('privacy.section1.p2')}
					<a href="mailto:dia@redbroomsoftware.com" class="text-blue-400 hover:text-blue-300">dia@redbroomsoftware.com</a>
				</p>
			</section>

			<section class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
				<h2 class="text-2xl font-bold text-white mb-4">{$_('privacy.section2.title')}</h2>
				<p class="text-slate-300 leading-relaxed mb-4">
					{$_('privacy.section2.intro')}
				</p>
				<ul class="list-disc list-inside text-slate-300 space-y-2">
					{#each dataItems as item}
						<li><strong class="text-white">{$_(`privacy.section2.items.${item}.label`)}</strong> {$_(`privacy.section2.items.${item}.desc`)}</li>
					{/each}
				</ul>
			</section>

			<section class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
				<h2 class="text-2xl font-bold text-white mb-4">{$_('privacy.section3.title')}</h2>
				<p class="text-slate-300 leading-relaxed mb-4">
					{$_('privacy.section3.intro')}
				</p>
				<ul class="list-disc list-inside text-slate-300 space-y-2">
					{#each primaryPurposes as item}
						<li>{item}</li>
					{/each}
				</ul>
				<p class="text-slate-300 leading-relaxed mt-4 mb-4">
					{$_('privacy.section3.secondaryIntro')}
				</p>
				<ul class="list-disc list-inside text-slate-300 space-y-2">
					{#each secondaryPurposes as item}
						<li>{item}</li>
					{/each}
				</ul>
			</section>

			<section class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
				<h2 class="text-2xl font-bold text-white mb-4">{$_('privacy.section4.title')}</h2>
				<p class="text-slate-300 leading-relaxed mb-4">
					{$_('privacy.section4.intro')}
				</p>
				<ul class="list-disc list-inside text-slate-300 space-y-2">
					{#each transferItems as item}
						<li><strong class="text-white">{$_(`privacy.section4.items.${item}.label`)}</strong> {$_(`privacy.section4.items.${item}.desc`)}</li>
					{/each}
				</ul>
				<p class="text-slate-300 leading-relaxed mt-4">
					{$_('privacy.section4.note')}
				</p>
			</section>

			<section class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
				<h2 class="text-2xl font-bold text-white mb-4">{$_('privacy.section5.title')}</h2>
				<p class="text-slate-300 leading-relaxed mb-4">
					{$_('privacy.section5.intro')}
				</p>
				<ul class="list-disc list-inside text-slate-300 space-y-2">
					{#each arcoItems as item}
						<li><strong class="text-white">{$_(`privacy.section5.${item}.label`)}</strong> {$_(`privacy.section5.${item}.desc`)}</li>
					{/each}
				</ul>
				<p class="text-slate-300 leading-relaxed mt-4">
					{$_('privacy.section5.howTo')}
					<a href="mailto:dia@redbroomsoftware.com" class="text-blue-400 hover:text-blue-300">dia@redbroomsoftware.com</a>
					{$_('privacy.section5.howToSuffix')}
				</p>
			</section>

			<section class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
				<h2 class="text-2xl font-bold text-white mb-4">{$_('privacy.section6.title')}</h2>
				<p class="text-slate-300 leading-relaxed">
					{$_('privacy.section6.intro')}
				</p>
				<ul class="list-disc list-inside text-slate-300 space-y-2 mt-4">
					{#each securityItems as item}
						<li>{item}</li>
					{/each}
				</ul>
			</section>

			<section class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
				<h2 class="text-2xl font-bold text-white mb-4">{$_('privacy.section7.title')}</h2>
				<p class="text-slate-300 leading-relaxed">
					{$_('privacy.section7.content')}
				</p>
			</section>

			<section class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
				<h2 class="text-2xl font-bold text-white mb-4">{$_('privacy.section8.title')}</h2>
				<p class="text-slate-300 leading-relaxed">
					{$_('privacy.section8.content')}
				</p>
			</section>

			<section class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
				<h2 class="text-2xl font-bold text-white mb-4">{$_('privacy.section9.title')}</h2>
				<p class="text-slate-300 leading-relaxed">
					{$_('privacy.section9.intro')}
				</p>
				<div class="mt-4 text-slate-300">
					<p><strong class="text-white">Red Broom Software S.A.S. de C.V.</strong></p>
					<p>{$_('privacy.section9.location')}</p>
					<p>Email: <a href="mailto:dia@redbroomsoftware.com" class="text-blue-400 hover:text-blue-300">dia@redbroomsoftware.com</a></p>
				</div>
			</section>
		</div>
	</article>
</main>

<Footer />
