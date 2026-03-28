<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import { _, locale } from 'svelte-i18n';
	import { scrollReveal } from '$lib/actions/scrollReveal';

	const serviceKeys = ['saas', 'pos', 'crm', 'fintech', 'legaltech', 'mobile', 'consulting'] as const;
	const serviceIcons = ['☁️', '🏪', '🤖', '🏦', '⚖️', '📱', '🎯'];
	const services = $derived(
		serviceKeys.map((key, i) => ({
			title: $_(`services.${key}.title`),
			subtitle: $_(`services.${key}.subtitle`),
			description: $_(`services.${key}.description`),
			icon: serviceIcons[i],
			features: $_(`services.${key}.features`) as unknown as string[]
		}))
	);
</script>

<svelte:head>
	<title>{$_('services.meta.title')}</title>
	<meta name="description" content={$_('services.meta.description')} />
	<meta property="og:locale" content={$locale === 'es' ? 'es_MX' : 'en_US'} />
	<link rel="canonical" href="https://redbroomsoftware.com/servicios" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://redbroomsoftware.com/servicios" />
	<meta property="og:title" content={$_('services.meta.title')} />
	<meta property="og:description" content={$_('services.meta.description')} />
	<meta property="og:image" content="https://redbroomsoftware.com/logo.svg" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<!-- Hero -->
<section class="py-20 px-4 sm:px-6 lg:px-8 relative">
	<div class="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent"></div>
	<div class="max-w-7xl mx-auto text-center relative">
		<h2 class="text-4xl md:text-6xl font-bold text-white mb-6">
			{$_('services.hero.titlePart1')} <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{$_('services.hero.titleHighlight')}</span> {$_('services.hero.titlePart2')}
		</h2>
		<p class="text-xl text-slate-400 max-w-3xl mx-auto">
			{$_('services.hero.subtitle')}
		</p>
	</div>
</section>

<!-- Services Grid -->
<section class="py-16 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each services as service, i}
				<article use:scrollReveal={{ delay: i * 100 }} class="glass rounded-2xl p-6 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10">
					<div class="w-14 h-14 bg-slate-800/80 rounded-xl flex items-center justify-center text-3xl mb-4">
						{service.icon}
					</div>
					<h3 class="text-xl font-bold text-white mb-1">{service.title}</h3>
					<p class="text-sm text-blue-400 mb-3">{service.subtitle}</p>
					<p class="text-slate-400 text-sm mb-4">{service.description}</p>
					<ul class="space-y-2">
						{#each service.features as feature}
							<li class="flex items-center text-sm text-slate-300">
								<svg class="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								{feature}
							</li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- Process Section -->
<section class="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
	<div class="max-w-7xl mx-auto">
		<h3 class="text-3xl font-bold text-white text-center mb-12" use:scrollReveal>{$_('services.process.title')}</h3>
		<div class="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
			<!-- Connecting line (desktop) -->
			<div class="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-blue-500/50"></div>
			{#each [
				{ num: 1, title: $_('services.process.step1.title'), desc: $_('services.process.step1.desc') },
				{ num: 2, title: $_('services.process.step2.title'), desc: $_('services.process.step2.desc') },
				{ num: 3, title: $_('services.process.step3.title'), desc: $_('services.process.step3.desc') },
				{ num: 4, title: $_('services.process.step4.title'), desc: $_('services.process.step4.desc') }
			] as step, i}
				<div class="text-center relative" use:scrollReveal={{ delay: i * 150 }}>
					<div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4 relative z-10 shadow-lg shadow-blue-500/25">
						{step.num}
					</div>
					<h4 class="text-white font-semibold mb-2">{step.title}</h4>
					<p class="text-slate-400 text-sm">{step.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA -->
<section class="py-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-3xl mx-auto text-center">
		<h3 class="text-3xl font-bold text-white mb-4">{$_('services.cta.title')}</h3>
		<p class="text-slate-400 mb-8">{$_('services.cta.subtitle')}</p>
		<a href="/contacto" class="inline-flex px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-semibold">
			{$_('services.cta.button')}
		</a>
	</div>
</section>

<Footer />
