<script lang="ts">
	import { onMount } from 'svelte';
	import { _, locale } from 'svelte-i18n';
	import Footer from '$lib/components/Footer.svelte';
	import TypewriterText from '$lib/components/TypewriterText.svelte';
	import AnimatedCounter from '$lib/components/AnimatedCounter.svelte';
	import EcosystemDiagram from '$lib/components/EcosystemDiagram.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal';

	const techLogos = [
		'SvelteKit', 'Next.js', 'TypeScript', 'Supabase', 'Firebase', 'PostgreSQL',
		'Tailwind', 'Anthropic', 'OpenAI', 'Vercel', 'Jitsi',
		'SPEI', 'CoDi', 'WhatsApp', 'Node.js'
	];

	const ecosystemAppKeys = [
		{ key: 'patadas', gradient: 'from-orange-500 to-red-500' },
		{ key: 'camino', gradient: 'from-cyan-500 to-blue-500' },
		{ key: 'colectiva', gradient: 'from-purple-500 to-pink-500' },
		{ key: 'constanza', gradient: 'from-blue-500 to-indigo-500' },
		{ key: 'agora', gradient: 'from-indigo-500 to-violet-500' },
		{ key: 'caracol', gradient: 'from-green-500 to-emerald-500' },
		{ key: 'comal', gradient: 'from-blue-400 to-cyan-400' },
		{ key: 'lahoja', gradient: 'from-teal-500 to-green-500' },
		{ key: 'mancha', gradient: 'from-red-500 to-orange-500' },
		{ key: 'plenura', gradient: 'from-pink-500 to-rose-500' },
		{ key: 'rito', gradient: 'from-amber-500 to-yellow-500' },
		{ key: 'cosmosPet', gradient: 'from-yellow-500 to-amber-500' }
	] as const;

	const pillarKeys = [
		{ key: 'aiEverything', icon: '🧠' },
		{ key: 'integratedEcosystem', icon: '🔗' },
		{ key: 'globalReach', icon: '🌎' },
		{ key: 'enterpriseDay1', icon: '🛡️' }
	] as const;
</script>

<svelte:head>
	<title>{$_('home.meta.title')}</title>
	<meta name="description" content={$_('home.meta.description')} />
	<link rel="canonical" href="https://redbroomsoftware.com/" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://redbroomsoftware.com/" />
	<meta property="og:title" content={$_('home.meta.title')} />
	<meta property="og:description" content={$_('home.meta.description')} />
	<meta property="og:image" content="https://redbroomsoftware.com/logo.svg" />
	<meta property="og:locale" content={$locale === 'es' ? 'es_MX' : 'en_US'} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={$_('home.meta.title')} />

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Organization",
		"@id": "https://redbroomsoftware.com/#organization",
		"name": "Red Broom Software",
		"legalName": "Red Broom Software S.A.S. de C.V.",
		"alternateName": ["RBS", "RedBroom"],
		"url": "https://redbroomsoftware.com",
		"logo": { "@type": "ImageObject", "url": "https://redbroomsoftware.com/logo.svg" },
		"description": "22-app AI-powered business ecosystem. POS, CRM, payments, accounting, legal, e-commerce — all connected.",
		"foundingDate": "2023",
		"address": { "@type": "PostalAddress", "addressCountry": "MX" },
		"contactPoint": [{ "@type": "ContactPoint", "email": "dia@redbroomsoftware.com", "contactType": "sales", "availableLanguage": ["Spanish", "English"] }],
		"sameAs": ["https://github.com/r-bsoftware"]
	}
	</script>`}
</svelte:head>

<!-- Hero -->
	<section class="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
		<div class="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-purple-600/5 to-transparent"></div>
		<div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-3xl animate-glow"></div>

		<div class="max-w-7xl mx-auto text-center relative">
			<div class="inline-flex items-center px-4 py-2 glass rounded-full text-sm text-slate-300 mb-8">
				<span class="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
				{$_('home.hero.badge')}
			</div>

			<h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
				{$_('home.hero.titlePart1')}<br />
				<TypewriterText words={[$_('home.hero.typewriterWords.0'), $_('home.hero.typewriterWords.1'), $_('home.hero.typewriterWords.2'), $_('home.hero.typewriterWords.3')]} interval={2500} />
				<br />
				<span class="text-slate-300">{$_('home.hero.forGlobalBusiness')}</span>
			</h1>

			<p class="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
				{$_('home.hero.subtitle')}
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="https://patadas.redbroomsoftware.com/get-started" target="_blank" rel="noopener noreferrer" class="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all text-lg font-semibold shadow-lg shadow-orange-500/25 hover:shadow-xl hover:-translate-y-0.5">
					{$_('home.cta.findSolution')}
				</a>
				<a href="https://patadas.redbroomsoftware.com/developers/apply" target="_blank" rel="noopener noreferrer" class="px-8 py-4 glass text-white rounded-xl hover:bg-slate-800/80 transition-all text-lg font-semibold">
					{$_('home.cta.joinDeveloper')}
				</a>
			</div>

			<!-- Stats -->
			<div class="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 max-w-3xl mx-auto">
				<div>
					<p class="text-4xl font-bold text-white"><AnimatedCounter value={22} /></p>
					<p class="text-slate-400 text-sm">{$_('home.stats.apps')}</p>
				</div>
				<div>
					<p class="text-4xl font-bold text-white"><AnimatedCounter value={10} suffix="+" /></p>
					<p class="text-slate-400 text-sm">{$_('home.stats.industries')}</p>
				</div>
				<div>
					<p class="text-4xl font-bold text-white">1</p>
					<p class="text-slate-400 text-sm">{$_('home.stats.sdk')}</p>
				</div>
				<div>
					<p class="text-4xl font-bold text-white">2</p>
					<p class="text-slate-400 text-sm">{$_('home.stats.languages')}</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Tech Marquee -->
	<section class="py-8 overflow-hidden border-y border-slate-800/50">
		<div class="flex animate-marquee whitespace-nowrap">
			{#each [...techLogos, ...techLogos] as logo}
				<span class="mx-8 text-slate-500 text-sm font-medium">{logo}</span>
			{/each}
		</div>
	</section>

	<!-- Patadas CTA -->
	<section class="py-24 px-4 sm:px-6 lg:px-8">
		<div class="max-w-5xl mx-auto">
			<div class="glass-strong rounded-3xl p-8 md:p-12 text-center" use:scrollReveal>
				<div class="text-5xl mb-4">⚡</div>
				<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">{$_('home.patadas.title')}</h2>
				<p class="text-xl text-slate-300 mb-2">{$_('home.patadas.subtitle')}</p>
				<p class="text-slate-400 max-w-2xl mx-auto mb-8">
					{$_('home.patadas.description')}
				</p>
				<a href="https://patadas.redbroomsoftware.com" target="_blank" rel="noopener noreferrer" class="inline-flex px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all text-lg font-semibold shadow-lg shadow-orange-500/25 hover:shadow-xl hover:-translate-y-0.5">
					{$_('home.patadas.button')} →
				</a>
			</div>
		</div>
	</section>

	<!-- Pillars -->
	<section class="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16" use:scrollReveal>
				<h2 class="text-4xl font-bold text-white mb-4">{$_('home.pillars.title')}</h2>
				<p class="text-xl text-slate-400 max-w-2xl mx-auto">
					{$_('home.pillars.subtitle')}
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				{#each pillarKeys as pillar, i}
					<div
						use:scrollReveal={{ delay: i * 100 }}
						class="glass rounded-2xl p-8 hover:border-blue-500/50 transition-all group"
					>
						<div class="text-4xl mb-4">{pillar.icon}</div>
						<h3 class="text-xl font-bold text-white mb-3">{$_(`home.pillars.${pillar.key}.title`)}</h3>
						<p class="text-slate-400 leading-relaxed">{$_(`home.pillars.${pillar.key}.desc`)}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Ecosystem Grid -->
	<section class="py-24 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16" use:scrollReveal>
				<h2 class="text-4xl font-bold text-white mb-4">{$_('home.ecosystem.title')}</h2>
				<p class="text-xl text-slate-400">{$_('home.ecosystem.subtitle')}</p>
			</div>

			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each ecosystemAppKeys as app, i}
					<div
						use:scrollReveal={{ delay: i * 50 }}
						class="glass rounded-xl p-5 hover:scale-[1.03] transition-all group"
					>
						<div class="w-10 h-10 rounded-lg bg-gradient-to-r {app.gradient} mb-3 opacity-80 group-hover:opacity-100 transition-opacity"></div>
						<span class="inline-block px-2 py-0.5 bg-slate-700/50 text-slate-400 rounded-full text-[10px] font-medium mb-2">
							{$_(`home.ecosystem.apps.${app.key}.badge`)}
						</span>
						<h3 class="text-lg font-bold text-white">{$_(`home.ecosystem.apps.${app.key}.name`)}</h3>
						<p class="text-slate-400 text-sm">{$_(`home.ecosystem.apps.${app.key}.desc`)}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Ecosystem Diagram -->
	<section class="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
		<div class="max-w-5xl mx-auto">
			<div class="text-center mb-12" use:scrollReveal>
				<h2 class="text-4xl font-bold text-white mb-4">{$_('home.ecosystemDiagram.title')}</h2>
				<p class="text-xl text-slate-400">{$_('home.ecosystemDiagram.subtitle')}</p>
			</div>
			<div use:scrollReveal>
				<EcosystemDiagram />
			</div>
		</div>
	</section>

	<!-- Final CTA -->
	<section class="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
		<div class="absolute inset-0 bg-gradient-to-r from-orange-600/5 via-purple-600/5 to-orange-600/5"></div>
		<div class="max-w-4xl mx-auto text-center relative" use:scrollReveal>
			<h2 class="text-4xl font-bold text-white mb-6">{$_('home.finalCta.title')}</h2>
			<p class="text-xl text-slate-400 mb-10">
				{$_('home.finalCta.subtitle')}
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="https://patadas.redbroomsoftware.com/get-started" target="_blank" rel="noopener noreferrer" class="px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all text-lg font-semibold shadow-lg shadow-orange-500/25 hover:shadow-xl hover:-translate-y-0.5">
					{$_('home.finalCta.findSolution')}
				</a>
				<a href="mailto:dia@redbroomsoftware.com" class="px-10 py-5 glass text-white rounded-xl hover:bg-slate-800/80 transition-all text-lg font-semibold">
					{$_('home.finalCta.directContact')}
				</a>
			</div>
		</div>
	</section>
<Footer full={true} />
