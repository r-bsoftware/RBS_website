<script lang="ts">
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
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

	const ecosystemApps = [
		{ name: 'Patadas', desc: 'AI Marketplace — broker inteligente', gradient: 'from-orange-500 to-red-500', badge: 'Puerta de Entrada' },
		{ name: 'Camino', desc: 'CRM con copiloto IA, SSO, marketing', gradient: 'from-cyan-500 to-blue-500', badge: 'Infraestructura' },
		{ name: 'Colectiva', desc: 'Pagos, escrow, wallets, cerebro IA', gradient: 'from-purple-500 to-pink-500', badge: 'Infraestructura' },
		{ name: 'Constanza', desc: 'Contabilidad, CFDI, facturación intl', gradient: 'from-blue-500 to-indigo-500', badge: 'Infraestructura' },
		{ name: 'Agora', desc: 'Legal: contratos, trust, time tracking', gradient: 'from-indigo-500 to-violet-500', badge: 'Vertical' },
		{ name: 'Caracol', desc: 'POS con añadas, FIFO, facturación', gradient: 'from-green-500 to-emerald-500', badge: 'Revenue' },
		{ name: 'Comal', desc: 'E-commerce con clubs de suscripción', gradient: 'from-blue-400 to-cyan-400', badge: 'Revenue' },
		{ name: 'La Hoja', desc: 'ERP de producción, recetas, costos', gradient: 'from-teal-500 to-green-500', badge: 'Vertical' },
		{ name: 'Mancha', desc: 'Reservaciones con IA predictiva', gradient: 'from-red-500 to-orange-500', badge: 'Vertical' },
		{ name: 'Plenura', desc: 'Marketplace de terapeutas, video', gradient: 'from-pink-500 to-rose-500', badge: 'Vertical' },
		{ name: 'Rito', desc: 'Capital privado e inversiones', gradient: 'from-amber-500 to-yellow-500', badge: 'Revenue' },
		{ name: 'Cosmos Pet', desc: 'Veterinaria: SOAP, cirugía, vacunas', gradient: 'from-yellow-500 to-amber-500', badge: 'Vertical' }
	];

	const pillars = [
		{
			icon: '🧠',
			title: 'IA en Todo',
			desc: 'Copiloto de ventas, matching inteligente, análisis fiscal, predicción de demanda, generación de contratos. No es un feature — es la base.'
		},
		{
			icon: '🔗',
			title: 'Ecosistema Integrado',
			desc: 'Cada app comparte autenticación, pagos, facturación e inteligencia. Agrega una y las demás se vuelven más inteligentes.'
		},
		{
			icon: '🌎',
			title: 'Alcance Global',
			desc: 'CFDI para México, facturas estándar para internacional. Bilingüe EN+ES. Contratos legales adaptados por jurisdicción.'
		},
		{
			icon: '🛡️',
			title: 'Enterprise desde el Día 1',
			desc: 'RLS en cada tabla, HMAC en cada webhook, escrow en cada transacción, JWT verificado criptográficamente. No hay atajos.'
		}
	];
</script>

<svelte:head>
	<title>Red Broom Software — 22 Apps, Un Ecosistema Inteligente</title>
	<meta name="description" content="Construimos el ecosistema de software empresarial más integrado del mundo. 22 aplicaciones con IA, pagos, facturación y contratos — conectadas por un SDK y un marketplace inteligente." />
	<link rel="canonical" href="https://redbroomsoftware.com/" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://redbroomsoftware.com/" />
	<meta property="og:title" content="Red Broom Software — 22 Apps, Un Ecosistema Inteligente" />
	<meta property="og:description" content="22 aplicaciones con IA conectadas por un SDK unificado. POS, CRM, pagos, contabilidad, legal, e-commerce — todo integrado." />
	<meta property="og:image" content="https://redbroomsoftware.com/logo.svg" />
	<meta property="og:locale" content="es_MX" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Red Broom Software — Ecosistema de 22 Apps" />

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

<main id="main">
	<!-- Hero -->
	<section class="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
		<div class="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-purple-600/5 to-transparent"></div>
		<div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-3xl animate-glow"></div>

		<div class="max-w-7xl mx-auto text-center relative">
			<div class="inline-flex items-center px-4 py-2 glass rounded-full text-sm text-slate-300 mb-8">
				<span class="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
				22 aplicaciones · 1 SDK · IA en todo
			</div>

			<h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
				Construimos<br />
				<TypewriterText words={['software inteligente', 'ecosistemas conectados', 'plataformas con IA', 'soluciones que escalan']} interval={2500} />
				<br />
				<span class="text-slate-300">para negocios globales</span>
			</h1>

			<p class="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
				Red Broom Software es el ecosistema de software empresarial más integrado del mundo.
				22 aplicaciones que comparten autenticación, pagos, facturación e inteligencia artificial.
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="https://patadas.redbroomsoftware.com/get-started" class="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all text-lg font-semibold shadow-lg shadow-orange-500/25 hover:shadow-xl hover:-translate-y-0.5">
					⚡ Encontrar mi solución
				</a>
				<a href="https://patadas.redbroomsoftware.com/developers/apply" class="px-8 py-4 glass text-white rounded-xl hover:bg-slate-800/80 transition-all text-lg font-semibold">
					Unirse como desarrollador
				</a>
			</div>

			<!-- Stats -->
			<div class="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 max-w-3xl mx-auto">
				<div>
					<p class="text-4xl font-bold text-white"><AnimatedCounter value={22} /></p>
					<p class="text-slate-400 text-sm">Aplicaciones</p>
				</div>
				<div>
					<p class="text-4xl font-bold text-white"><AnimatedCounter value={10} suffix="+" /></p>
					<p class="text-slate-400 text-sm">Industrias</p>
				</div>
				<div>
					<p class="text-4xl font-bold text-white">1</p>
					<p class="text-slate-400 text-sm">SDK unificado</p>
				</div>
				<div>
					<p class="text-4xl font-bold text-white">2</p>
					<p class="text-slate-400 text-sm">Idiomas</p>
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
				<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Patadas</h2>
				<p class="text-xl text-slate-300 mb-2">Nuestro marketplace inteligente</p>
				<p class="text-slate-400 max-w-2xl mx-auto mb-8">
					¿Necesitas una solución de software o un desarrollador de IA? Patadas te evalúa,
					te conecta con el producto correcto o un desarrollador verificado, genera el contrato,
					maneja el escrow y la facturación. Todo en un solo lugar.
				</p>
				<a href="https://patadas.redbroomsoftware.com" class="inline-flex px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all text-lg font-semibold shadow-lg shadow-orange-500/25 hover:shadow-xl hover:-translate-y-0.5">
					Ir a Patadas →
				</a>
			</div>
		</div>
	</section>

	<!-- Pillars -->
	<section class="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16" use:scrollReveal>
				<h2 class="text-4xl font-bold text-white mb-4">¿Qué nos hace diferentes?</h2>
				<p class="text-xl text-slate-400 max-w-2xl mx-auto">
					No somos una agencia. No somos un marketplace genérico. Somos dueños de cada producto que recomendamos.
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				{#each pillars as pillar, i}
					<div
						use:scrollReveal={{ delay: i * 100 }}
						class="glass rounded-2xl p-8 hover:border-blue-500/50 transition-all group"
					>
						<div class="text-4xl mb-4">{pillar.icon}</div>
						<h3 class="text-xl font-bold text-white mb-3">{pillar.title}</h3>
						<p class="text-slate-400 leading-relaxed">{pillar.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Ecosystem Grid -->
	<section class="py-24 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16" use:scrollReveal>
				<h2 class="text-4xl font-bold text-white mb-4">El Ecosistema</h2>
				<p class="text-xl text-slate-400">22 apps que comparten autenticación, pagos, facturación e IA</p>
			</div>

			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each ecosystemApps as app, i}
					<div
						use:scrollReveal={{ delay: i * 50 }}
						class="glass rounded-xl p-5 hover:scale-[1.03] transition-all group"
					>
						<div class="w-10 h-10 rounded-lg bg-gradient-to-r {app.gradient} mb-3 opacity-80 group-hover:opacity-100 transition-opacity"></div>
						<span class="inline-block px-2 py-0.5 bg-slate-700/50 text-slate-400 rounded-full text-[10px] font-medium mb-2">
							{app.badge}
						</span>
						<h3 class="text-lg font-bold text-white">{app.name}</h3>
						<p class="text-slate-400 text-sm">{app.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Ecosystem Diagram -->
	<section class="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
		<div class="max-w-5xl mx-auto">
			<div class="text-center mb-12" use:scrollReveal>
				<h2 class="text-4xl font-bold text-white mb-4">Un ecosistema conectado</h2>
				<p class="text-xl text-slate-400">Cada app fortalece a las demás</p>
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
			<h2 class="text-4xl font-bold text-white mb-6">¿Listo para empezar?</h2>
			<p class="text-xl text-slate-400 mb-10">
				Ya sea que necesites un producto listo o un desarrollador verificado,
				Patadas te conecta con la solución correcta.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="https://patadas.redbroomsoftware.com/get-started" class="px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all text-lg font-semibold shadow-lg shadow-orange-500/25 hover:shadow-xl hover:-translate-y-0.5">
					⚡ Encontrar mi solución
				</a>
				<a href="mailto:dia@redbroomsoftware.com" class="px-10 py-5 glass text-white rounded-xl hover:bg-slate-800/80 transition-all text-lg font-semibold">
					Contacto directo
				</a>
			</div>
		</div>
	</section>
</main>

<Footer full={true} />
