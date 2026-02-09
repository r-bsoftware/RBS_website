<script lang="ts">
	import { onMount } from 'svelte';

	// Camino CRM API endpoint for lead capture
	const CAMINO_API_URL = 'https://camino.redbroomsoftware.com/api/leads';

	let visitorId = '';
	let mobileMenuOpen = false;

	function getVisitorId(): string {
		if (typeof window === 'undefined') return '';
		let id = localStorage.getItem('rbs_visitor_id');
		if (!id) {
			id = `v_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
			localStorage.setItem('rbs_visitor_id', id);
		}
		return id;
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	onMount(() => {
		visitorId = getVisitorId();
	});

	// Quick contact form
	let quickForm = { email: '', projectType: '' };
	let quickSubmitStatus: 'idle' | 'submitting' | 'success' | 'error' = 'idle';

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

	const stats = [
		{ value: '15', label: 'Productos en producción' },
		{ value: '10+', label: 'Industrias diferentes' },
		{ value: '99.9%', label: 'Uptime promedio' }
	];
</script>

<svelte:head>
	<title>Red Broom Software - Desarrollo de Software Empresarial</title>
	<meta name="description" content="Desarrollamos software empresarial de alto rendimiento: SaaS, POS, ERP, CRM con IA, apps móviles. Especialistas en soluciones para PyMEs mexicanas." />
	<link rel="canonical" href="https://redbroomsoftware.com/" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://redbroomsoftware.com/" />
	<meta property="og:title" content="Red Broom Software - Desarrollo de Software Empresarial" />
	<meta property="og:description" content="Desarrollamos SaaS, POS, CRM con IA y apps móviles para PyMEs mexicanas. 15 productos en producción." />
	<meta property="og:image" content="https://redbroomsoftware.com/og-image.png" />
	<meta property="og:locale" content="es_MX" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Red Broom Software - Software Empresarial" />
	<meta name="twitter:description" content="Desarrollo de software de alto rendimiento para PyMEs mexicanas." />

	<!-- Organization Schema - Establishes brand entity -->
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
		"image": "https://redbroomsoftware.com/og-image.png",
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
			"https://github.com/redbroomsoftware",
			"https://twitter.com/redbroomsoftware"
		],
		"knowsAbout": ["Software Development", "SaaS", "ERP", "POS", "CRM", "Mobile Apps", "FinTech", "Legal Tech"]
	}
	</script>`}

	<!-- WebSite Schema - Critical for brand name searches -->
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

<div class="min-h-screen bg-slate-950">
	<!-- Skip link -->
	<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white focus:rounded-lg">
		Saltar al contenido
	</a>

	<!-- Header -->
	<header class="bg-slate-950/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-3">
					<img src="/logo.svg" alt="Red Broom Software" class="w-10 h-10" />
					<div>
						<h1 class="text-xl font-bold text-white">Red Broom Software</h1>
						<p class="text-xs text-slate-400">Enterprise Solutions</p>
					</div>
				</div>

				<!-- Desktop Nav -->
				<nav class="hidden md:flex items-center space-x-8">
					<a href="/servicios" class="text-slate-300 hover:text-white transition-colors">Servicios</a>
					<a href="/portafolio" class="text-slate-300 hover:text-white transition-colors">Portafolio</a>
					<a href="/tecnologia" class="text-slate-300 hover:text-white transition-colors">Tecnología</a>
					<a href="/contacto" class="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium">
						Contactar
					</a>
				</nav>

				<!-- Mobile Menu Button -->
				<button class="md:hidden p-2 text-slate-300 hover:text-white" on:click={toggleMobileMenu} aria-label="Menú">
					{#if mobileMenuOpen}
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					{:else}
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					{/if}
				</button>
			</div>

			<!-- Mobile Nav -->
			{#if mobileMenuOpen}
				<nav class="md:hidden mt-4 pb-4 border-t border-slate-800 pt-4">
					<div class="flex flex-col space-y-4">
						<a href="/servicios" on:click={closeMobileMenu} class="text-slate-300 hover:text-white py-2">Servicios</a>
						<a href="/portafolio" on:click={closeMobileMenu} class="text-slate-300 hover:text-white py-2">Portafolio</a>
						<a href="/tecnologia" on:click={closeMobileMenu} class="text-slate-300 hover:text-white py-2">Tecnología</a>
						<a href="/contacto" on:click={closeMobileMenu} class="px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-center font-medium">
							Contactar
						</a>
					</div>
				</nav>
			{/if}
		</div>
	</header>

	<main id="main">
		<!-- Hero -->
		<section class="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
			<div class="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-purple-600/5 to-transparent"></div>
			<div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>

			<div class="max-w-7xl mx-auto text-center relative">
				<div class="inline-flex items-center px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300 mb-8">
					<span class="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
					15 productos en producción
				</div>

				<h2 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
					Construimos
					<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
						software
					</span>
					<br />de alto rendimiento
				</h2>
				<p class="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
					Desarrollo de plataformas SaaS, sistemas POS/ERP, CRM con IA, y aplicaciones móviles.
					Especialistas en soluciones para PyMEs mexicanas.
				</p>

				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a href="/portafolio" class="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all text-lg font-semibold shadow-lg shadow-blue-500/25">
						Ver Portafolio
					</a>
					<a href="/contacto" class="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-xl hover:bg-slate-700 transition-all text-lg font-semibold">
						Iniciar Proyecto
					</a>
				</div>

				<!-- Stats -->
				<div class="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
					{#each stats as stat}
						<div>
							<p class="text-4xl font-bold text-white">{stat.value}</p>
							<p class="text-slate-400 text-sm">{stat.label}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Capabilities -->
		<section class="py-24 px-4 sm:px-6 lg:px-8">
			<div class="max-w-7xl mx-auto">
				<div class="text-center mb-16">
					<h2 class="text-4xl font-bold text-white mb-4">¿Qué desarrollamos?</h2>
					<p class="text-xl text-slate-400 max-w-2xl mx-auto">
						Desde sistemas operacionales hasta plataformas con IA
					</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each capabilities as cap}
						<div class="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 group">
							<div class="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
								{cap.icon}
							</div>
							<h3 class="text-xl font-bold text-white mb-2">{cap.title}</h3>
							<p class="text-slate-400">{cap.desc}</p>
						</div>
					{/each}
				</div>

				<div class="text-center mt-12">
					<a href="/servicios" class="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium">
						Ver todos los servicios
						<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
						</svg>
					</a>
				</div>
			</div>
		</section>

		<!-- Why RBS -->
		<section class="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
			<div class="max-w-7xl mx-auto">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div>
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
									<p class="text-slate-400">No somos una agencia que solo hace proyectos. Operamos 15 plataformas SaaS propias. Sabemos lo que funciona.</p>
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
					<div class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
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
							<form on:submit={handleQuickSubmit} class="space-y-4">
								<div>
									<label for="quick-email" class="block text-sm text-slate-400 mb-2">Email</label>
									<input
										type="email"
										id="quick-email"
										bind:value={quickForm.email}
										required
										class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
										placeholder="tu@empresa.com"
									/>
								</div>
								<div>
									<label for="quick-type" class="block text-sm text-slate-400 mb-2">¿Qué necesitas?</label>
									<select
										id="quick-type"
										bind:value={quickForm.projectType}
										class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
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
									class="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-semibold disabled:opacity-50"
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
		<section class="py-24 px-4 sm:px-6 lg:px-8">
			<div class="max-w-4xl mx-auto text-center">
				<h2 class="text-4xl font-bold text-white mb-6">¿Tienes un proyecto en mente?</h2>
				<p class="text-xl text-slate-400 mb-10">
					Cuéntanos qué necesitas y te daremos una propuesta en 48 horas.
				</p>
				<a href="/contacto" class="inline-flex px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all text-lg font-semibold shadow-lg shadow-blue-500/25">
					Iniciar conversación
				</a>
			</div>
		</section>
	</main>

	<!-- Footer -->
	<footer class="border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
				<div>
					<div class="flex items-center space-x-3 mb-4">
						<img src="/logo.svg" alt="Red Broom Software" class="w-8 h-8" />
						<span class="text-white font-bold">Red Broom Software</span>
					</div>
					<p class="text-slate-400 text-sm">Desarrollo de software empresarial de alto rendimiento.</p>
				</div>
				<div>
					<h4 class="text-white font-semibold mb-4">Servicios</h4>
					<ul class="space-y-2 text-sm">
						<li><a href="/servicios" class="text-slate-400 hover:text-white transition-colors">Desarrollo SaaS</a></li>
						<li><a href="/servicios" class="text-slate-400 hover:text-white transition-colors">POS & ERP</a></li>
						<li><a href="/servicios" class="text-slate-400 hover:text-white transition-colors">CRM con IA</a></li>
						<li><a href="/servicios" class="text-slate-400 hover:text-white transition-colors">Apps Móviles</a></li>
					</ul>
				</div>
				<div>
					<h4 class="text-white font-semibold mb-4">Empresa</h4>
					<ul class="space-y-2 text-sm">
						<li><a href="/portafolio" class="text-slate-400 hover:text-white transition-colors">Portafolio</a></li>
						<li><a href="/tecnologia" class="text-slate-400 hover:text-white transition-colors">Tecnología</a></li>
						<li><a href="/contacto" class="text-slate-400 hover:text-white transition-colors">Contacto</a></li>
						<li><a href="https://developers.redbroomsoftware.com" class="text-slate-400 hover:text-white transition-colors">Developers</a></li>
					</ul>
				</div>
				<div>
					<h4 class="text-white font-semibold mb-4">Legal</h4>
					<ul class="space-y-2 text-sm">
						<li><a href="/privacidad" class="text-slate-400 hover:text-white transition-colors">Privacidad</a></li>
						<li><a href="/terminos" class="text-slate-400 hover:text-white transition-colors">Términos</a></li>
					</ul>
				</div>
			</div>
			<div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
				<p class="text-slate-500 text-sm">© 2025 Red Broom Software S.A.S. de C.V. Todos los derechos reservados.</p>
				<a href="mailto:dia@redbroomsoftware.com" class="text-slate-400 hover:text-white text-sm transition-colors">
					dia@redbroomsoftware.com
				</a>
			</div>
		</div>
	</footer>
</div>
