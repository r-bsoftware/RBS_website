<script lang="ts">
	import { onMount } from 'svelte';
	import Footer from '$lib/components/Footer.svelte';
	import TypewriterText from '$lib/components/TypewriterText.svelte';
	import AnimatedCounter from '$lib/components/AnimatedCounter.svelte';
	import EcosystemDiagram from '$lib/components/EcosystemDiagram.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal';

	const CAMINO_API_URL = 'https://camino.redbroomsoftware.com/api/leads';

	let visitorId = $state('');

	function getVisitorId(): string {
		if (typeof window === 'undefined') return '';
		let id = localStorage.getItem('rbs_visitor_id');
		if (!id) {
			id = `v_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
			localStorage.setItem('rbs_visitor_id', id);
		}
		return id;
	}

	onMount(() => {
		visitorId = getVisitorId();
	});

	let quickForm = $state({ email: '', projectType: '' });
	let quickSubmitStatus: 'idle' | 'submitting' | 'success' | 'error' = $state('idle');

	async function handleQuickSubmit(event: Event) {
		event.preventDefault();
		quickSubmitStatus = 'submitting';

		try {
			const urlParams = new URLSearchParams(window.location.search);
			await fetch(CAMINO_API_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: quickForm.email,
					product: quickForm.projectType,
					source: 'rbs_website',
					formType: 'quick_contact',
					landingPage: window.location.href,
					utm_source: urlParams.get('utm_source') || 'direct',
					utm_medium: urlParams.get('utm_medium') || 'organic',
					visitorId
				})
			});
			quickSubmitStatus = 'success';
		} catch {
			quickSubmitStatus = 'error';
		}
	}

	const capabilities = [
		{ icon: '☁️', title: 'Desarrollo SaaS', desc: 'Plataformas multi-tenant con billing y escalabilidad' },
		{ icon: '🏪', title: 'POS & ERP', desc: 'Sistemas operacionales con CFDI 4.0 integrado' },
		{ icon: '🤖', title: 'CRM con IA', desc: 'Agentes conversacionales para WhatsApp y voz' },
		{ icon: '🏦', title: 'FinTech', desc: 'Open Banking, SPEI, CoDi, conciliación' },
		{ icon: '⚖️', title: 'Legal Tech', desc: 'Gestión de casos, trust accounting, documentos con IA' },
		{ icon: '📱', title: 'Apps Móviles', desc: 'Flutter cross-platform con sync en tiempo real' }
	];

	const techLogos = [
		'SvelteKit', 'TypeScript', 'Supabase', 'Firebase', 'PostgreSQL',
		'Tailwind', 'Anthropic', 'Groq', 'Vercel', 'Cloudflare',
		'SPEI', 'CoDi', 'WhatsApp', 'Flutter', 'Node.js'
	];

	const flagshipProducts = [
		{
			name: 'Camino CRM',
			desc: 'Agentes IA que atienden WhatsApp y llamadas 24/7',
			gradient: 'from-blue-500 to-cyan-500',
			badge: 'IA Multicanal'
		},
		{
			name: 'Colectiva',
			desc: 'Plataforma B2B: pagos, billing ecosistema, mercado de CPIs',
			gradient: 'from-purple-500 to-pink-500',
			badge: 'Oracle IA'
		},
		{
			name: 'Constanza',
			desc: 'Contabilidad multi-cliente con IA fiscal y DIOT automático',
			gradient: 'from-emerald-500 to-teal-500',
			badge: 'IA Fiscal'
		}
	];
</script>

<svelte:head>
	<title>Red Broom Software - Desarrollo de Software Empresarial</title>
	<meta name="description" content="Desarrollamos software empresarial de alto rendimiento: SaaS, POS, ERP, CRM con IA, apps móviles. Especialistas en soluciones para PyMEs mexicanas." />
	<link rel="canonical" href="https://redbroomsoftware.com/" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://redbroomsoftware.com/" />
	<meta property="og:title" content="Red Broom Software - Desarrollo de Software Empresarial" />
	<meta property="og:description" content="Desarrollamos SaaS, POS, CRM con IA y apps móviles para PyMEs mexicanas. 18 productos en producción." />
	<meta property="og:image" content="https://redbroomsoftware.com/logo.svg" />
	<meta property="og:locale" content="es_MX" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Red Broom Software - Software Empresarial" />
	<meta name="twitter:description" content="Desarrollo de software de alto rendimiento para PyMEs mexicanas." />

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Organization",
		"@id": "https://redbroomsoftware.com/#organization",
		"name": "Red Broom Software",
		"legalName": "Red Broom Software S.A.S. de C.V.",
		"alternateName": ["RBS", "RedBroom", "Red Broom"],
		"url": "https://redbroomsoftware.com",
		"logo": {
			"@type": "ImageObject",
			"url": "https://redbroomsoftware.com/logo.svg",
			"width": 512,
			"height": 512
		},
		"image": "https://redbroomsoftware.com/logo.svg",
		"description": "Desarrollo de software empresarial de alto rendimiento para PyMEs mexicanas. Especialistas en SaaS, POS, ERP, CRM con IA y apps móviles.",
		"foundingDate": "2023",
		"address": {
			"@type": "PostalAddress",
			"addressLocality": "Ciudad de México",
			"addressRegion": "CDMX",
			"addressCountry": "MX"
		},
		"contactPoint": [{
			"@type": "ContactPoint",
			"email": "dia@redbroomsoftware.com",
			"contactType": "sales",
			"availableLanguage": ["Spanish", "English"]
		}],
		"sameAs": [
			"https://github.com/r-bsoftware"
		],
		"knowsAbout": ["Software Development", "SaaS", "ERP", "POS", "CRM", "Mobile Apps", "FinTech", "Legal Tech"]
	}
	</script>`}

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": "https://redbroomsoftware.com/#website",
		"url": "https://redbroomsoftware.com",
		"name": "Red Broom Software",
		"alternateName": "RBS",
		"description": "Software empresarial para PyMEs mexicanas",
		"publisher": {
			"@id": "https://redbroomsoftware.com/#organization"
		},
		"inLanguage": "es-MX"
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
				18 productos en producción
			</div>

			<h2 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
				Construimos<br />
				<TypewriterText words={['SaaS', 'POS & ERP', 'CRM con IA', 'FinTech', 'Legal Tech', 'E-commerce']} interval={2500} />
				<br />
				<span class="text-slate-300">de alto rendimiento</span>
			</h2>
			<p class="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
				Desarrollo de plataformas SaaS, sistemas POS/ERP, CRM con IA, y aplicaciones móviles.
				Especialistas en soluciones para PyMEs mexicanas.
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/portafolio" class="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5">
					Ver Portafolio
				</a>
				<a href="/contacto" class="px-8 py-4 glass text-white rounded-xl hover:bg-slate-800/80 transition-all text-lg font-semibold">
					Iniciar Proyecto
				</a>
			</div>

			<!-- Stats -->
			<div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
				<div>
					<p class="text-4xl font-bold text-white"><AnimatedCounter value={18} /></p>
					<p class="text-slate-400 text-sm">Productos en producción</p>
				</div>
				<div>
					<p class="text-4xl font-bold text-white"><AnimatedCounter value={10} suffix="+" /></p>
					<p class="text-slate-400 text-sm">Industrias diferentes</p>
				</div>
				<div>
					<p class="text-4xl font-bold text-white">99.9%</p>
					<p class="text-slate-400 text-sm">Uptime promedio</p>
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

	<!-- Capabilities -->
	<section class="py-24 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16" use:scrollReveal>
				<h2 class="text-4xl font-bold text-white mb-4">¿Qué desarrollamos?</h2>
				<p class="text-xl text-slate-400 max-w-2xl mx-auto">
					Desde sistemas operacionales hasta plataformas con IA
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each capabilities as cap, i}
					<div
						use:scrollReveal={{ delay: i * 100 }}
						class="glass rounded-2xl p-6 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 group"
					>
						<div class="w-14 h-14 bg-slate-800/80 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
							{cap.icon}
						</div>
						<h3 class="text-xl font-bold text-white mb-2">{cap.title}</h3>
						<p class="text-slate-400">{cap.desc}</p>
					</div>
				{/each}
			</div>

			<div class="text-center mt-12">
				<a href="/servicios" class="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors">
					Ver todos los servicios
					<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
					</svg>
				</a>
			</div>
		</div>
	</section>

	<!-- Flagship Products -->
	<section class="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16" use:scrollReveal>
				<h2 class="text-4xl font-bold text-white mb-4">Productos estrella</h2>
				<p class="text-xl text-slate-400">Nuestras plataformas más avanzadas</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				{#each flagshipProducts as product, i}
					<div
						use:scrollReveal={{ delay: i * 150 }}
						class="glass-strong rounded-2xl p-8 hover:scale-[1.02] transition-all group"
					>
						<div class="w-12 h-12 rounded-xl bg-gradient-to-r {product.gradient} mb-4 opacity-80 group-hover:opacity-100 transition-opacity"></div>
						<span class="inline-block px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium mb-3">
							{product.badge}
						</span>
						<h3 class="text-xl font-bold text-white mb-2">{product.name}</h3>
						<p class="text-slate-400 text-sm">{product.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Ecosystem Diagram -->
	<section class="py-24 px-4 sm:px-6 lg:px-8">
		<div class="max-w-5xl mx-auto">
			<div class="text-center mb-12" use:scrollReveal>
				<h2 class="text-4xl font-bold text-white mb-4">Un ecosistema conectado</h2>
				<p class="text-xl text-slate-400">18 apps que comparten autenticación, pagos, facturación e IA</p>
			</div>
			<div use:scrollReveal>
				<EcosystemDiagram />
			</div>
		</div>
	</section>

	<!-- Why RBS -->
	<section class="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
		<div class="max-w-7xl mx-auto">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div use:scrollReveal>
					<h2 class="text-4xl font-bold text-white mb-6">¿Por qué trabajar con nosotros?</h2>
					<div class="space-y-6">
						<div class="flex items-start gap-4">
							<div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
								<svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
								</svg>
							</div>
							<div>
								<h3 class="text-lg font-semibold text-white">Productos en producción</h3>
								<p class="text-slate-400">No somos una agencia que solo hace proyectos. Operamos 18 plataformas SaaS propias. Sabemos lo que funciona.</p>
							</div>
						</div>
						<div class="flex items-start gap-4">
							<div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
								<svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
								</svg>
							</div>
							<div>
								<h3 class="text-lg font-semibold text-white">Especialistas en México</h3>
								<p class="text-slate-400">CFDI 4.0, SPEI, CoDi, SAT, IMSS. Conocemos las integraciones que tu negocio necesita.</p>
							</div>
						</div>
						<div class="flex items-start gap-4">
							<div class="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
								<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
								</svg>
							</div>
							<div>
								<h3 class="text-lg font-semibold text-white">IA desde el diseño</h3>
								<p class="text-slate-400">No agregamos IA como feature. La diseñamos como parte central de la arquitectura.</p>
							</div>
						</div>
					</div>
				</div>
				<div use:scrollReveal={{ delay: 200 }} class="glass-strong rounded-2xl p-8">
					<h3 class="text-xl font-bold text-white mb-6">Empecemos a hablar</h3>
					{#if quickSubmitStatus === 'success'}
						<div class="text-center py-8">
							<div class="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
							</div>
							<p class="text-white font-medium">Te contactamos pronto</p>
						</div>
					{:else}
						<form onsubmit={handleQuickSubmit} class="space-y-4">
							<div>
								<label for="quick-email" class="block text-sm text-slate-400 mb-2">Email</label>
								<input
									type="email"
									id="quick-email"
									bind:value={quickForm.email}
									required
									class="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
									placeholder="tu@empresa.com"
								/>
							</div>
							<div>
								<label for="quick-type" class="block text-sm text-slate-400 mb-2">¿Qué necesitas?</label>
								<select
									id="quick-type"
									bind:value={quickForm.projectType}
									required
									class="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
								>
									<option value="">Selecciona una opción</option>
									<option value="saas">Desarrollo SaaS</option>
									<option value="pos">Sistema POS/ERP</option>
									<option value="crm">CRM con IA</option>
									<option value="mobile">App Móvil</option>
									<option value="other">Otro</option>
								</select>
							</div>
							<button
								type="submit"
								disabled={quickSubmitStatus === 'submitting'}
								class="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-semibold disabled:opacity-50 hover:shadow-lg hover:shadow-blue-500/25"
							>
								{quickSubmitStatus === 'submitting' ? 'Enviando...' : 'Quiero saber más'}
							</button>
						</form>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
		<div class="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5"></div>
		<div class="max-w-4xl mx-auto text-center relative" use:scrollReveal>
			<h2 class="text-4xl font-bold text-white mb-6">¿Tienes un proyecto en mente?</h2>
			<p class="text-xl text-slate-400 mb-10">
				Cuéntanos qué necesitas y te daremos una propuesta en 48 horas.
			</p>
			<a href="/contacto" class="inline-flex px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5">
				Iniciar conversación
			</a>
		</div>
	</section>
</main>

<Footer full={true} />
