<script lang="ts">
	import { onMount } from 'svelte';

	// Camino CRM API endpoint for lead capture
	const CAMINO_API_URL = 'https://camino.redbroomsoftware.com/api/leads';

	// A/B Testing configuration
	interface ABTestConfig {
		testId: string;
		variants: { name: string; weight: number }[];
	}

	// Active A/B tests (can be fetched from API or defined here)
	const activeTests: ABTestConfig[] = [
		{
			testId: 'hero_cta_dec24',
			variants: [
				{ name: 'control', weight: 50 },
				{ name: 'urgency', weight: 50 }
			]
		}
	];

	// Current variant assignment
	let currentVariants: Record<string, string> = {};
	let visitorId = '';

	// Generate or retrieve visitor ID
	function getVisitorId(): string {
		if (typeof window === 'undefined') return '';
		let id = localStorage.getItem('rbs_visitor_id');
		if (!id) {
			id = `v_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
			localStorage.setItem('rbs_visitor_id', id);
		}
		return id;
	}

	// Mobile menu state
	let mobileMenuOpen = false;

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	// Assign visitor to test variants (deterministic based on visitor ID)
	function assignVariant(testId: string, variants: { name: string; weight: number }[], vid: string): string {
		const hash = simpleHash(`${testId}-${vid}`);
		const normalized = Math.abs(hash) / 0x7FFFFFFF;
		const percentage = normalized * 100;

		let cumulative = 0;
		for (const variant of variants) {
			cumulative += variant.weight;
			if (percentage < cumulative) {
				return variant.name;
			}
		}
		return variants[variants.length - 1]?.name || 'control';
	}

	function simpleHash(str: string): number {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + char;
			hash = hash & hash;
		}
		return hash;
	}

	onMount(() => {
		visitorId = getVisitorId();
		// Assign variants for all active tests
		for (const test of activeTests) {
			currentVariants[test.testId] = assignVariant(test.testId, test.variants, visitorId);
		}
	});

	// Contact form state
	let contactForm = {
		name: '',
		email: '',
		company: '',
		phone: '',
		product: '',
		message: ''
	};
	let submitStatus: 'idle' | 'submitting' | 'success' | 'error' = 'idle';
	let errorMessage = '';

	async function handleContactSubmit(event: Event) {
		event.preventDefault();
		submitStatus = 'submitting';
		errorMessage = '';

		try {
			// Get URL parameters for UTM and campaign tracking
			const urlParams = new URLSearchParams(window.location.search);

			// Campaign tracking: campaign_id from URL (for paid campaigns) or use utm_campaign
			const campaignId = urlParams.get('campaign_id') || undefined;
			const campaignName = urlParams.get('campaign_name') || urlParams.get('utm_campaign') || 'RBS Website Organic';

			const response = await fetch(CAMINO_API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: contactForm.name,
					email: contactForm.email,
					company: contactForm.company,
					phone: contactForm.phone,
					product: contactForm.product,
					message: contactForm.message,
					source: 'rbs_website',
					formType: 'demo',
					landingPage: window.location.href,
					referrer: document.referrer || undefined,
					// UTM tracking
					utm_source: urlParams.get('utm_source') || 'direct',
					utm_medium: urlParams.get('utm_medium') || 'organic',
					utm_campaign: urlParams.get('utm_campaign'),
					utm_content: urlParams.get('utm_content'),
					utm_term: urlParams.get('utm_term'),
					// Campaign tracking (links to Camino marketing_campaigns)
					campaign_id: campaignId,
					campaign_name: campaignName,
					// A/B Test tracking (send primary test variant)
					abTestId: activeTests[0]?.testId,
					abTestVariant: currentVariants[activeTests[0]?.testId],
					visitorId
				})
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Error al enviar el formulario');
			}

			// Success
			submitStatus = 'success';
			contactForm = { name: '', email: '', company: '', phone: '', product: '', message: '' };
		} catch (error) {
			console.error('Form submission error:', error);
			submitStatus = 'error';
			errorMessage = error instanceof Error ? error.message : 'Error al enviar el formulario. Por favor intenta de nuevo.';
		}
	}

	const products = [
		{
			name: 'Caracol',
			subtitle: 'Sistema POS para Restaurantes',
			description: 'Punto de venta completo con gestión de mesas, comandas a cocina en tiempo real, sistema de meseros, facturación CFDI 4.0 y reportes avanzados.',
			icon: '🍽️',
			tier: 'enterprise',
			url: 'https://caracol.redbroomsoftware.com',
			pricing: {
				setup: '$52,500',
				monthly: '$396/usuario',
				setupLabel: 'Implementación',
				monthlyLabel: 'por mes'
			},
			features: ['POS Multi-terminal', 'KDS Cocina en tiempo real', 'Gestión de Meseros', 'CFDI 4.0 Integrado', 'Inventario automatizado', 'Reportes de caja', 'Multi-sucursal'],
			highlights: ['ROI en 3 meses', 'Soporte 24/7', 'Capacitación incluida']
		},
		{
			name: 'La Hoja',
			subtitle: 'ERP para Cafeterías y Retail',
			description: 'Sistema ERP completo para operaciones de retail: POS ultra-rápido, inventario FIFO, gestión de proveedores, programa de lealtad y analytics.',
			icon: '☕',
			tier: 'professional',
			url: 'https://hoja.redbroomsoftware.com',
			pricing: {
				setup: '$35,000',
				monthly: '$290/usuario',
				setupLabel: 'Implementación',
				monthlyLabel: 'por mes'
			},
			features: ['POS de alta velocidad', 'Inventario FIFO', 'Gestión de proveedores', 'Programa de lealtad', 'WhatsApp integrado', 'Multi-sucursal', 'Analíticas avanzadas'],
			highlights: ['Ideal para franquicias', 'Escalable', 'API abierta']
		},
		{
			name: 'Cosmos Pet',
			subtitle: 'Software para Veterinarias',
			description: 'Plataforma SaaS especializada para clínicas veterinarias: expedientes médicos SOAP, control de vacunas, agenda, estética canina y facturación.',
			icon: '🐾',
			tier: 'professional',
			url: 'https://cosmos.redbroomsoftware.com',
			pricing: {
				setup: '$28,000',
				monthly: '$245/usuario',
				setupLabel: 'Implementación',
				monthlyLabel: 'por mes'
			},
			features: ['Expedientes SOAP', 'Control de vacunas', 'Agenda inteligente', 'Módulo de estética', 'Recordatorios automáticos', 'Facturación CFDI', 'Multi-clínica'],
			highlights: ['Especializado', 'Cloud nativo', 'Backups automáticos']
		},
		{
			name: 'Camino CRM',
			subtitle: 'CRM con IA Multicanal',
			description: 'CRM con agentes de IA que atienden WhatsApp y llamadas telefónicas automáticamente. Contexto unificado de cliente, lead scoring, pipeline de ventas y automatización completa.',
			icon: '🛤️',
			tier: 'enterprise',
			url: 'https://camino.redbroomsoftware.com',
			pricing: {
				setup: '$18,000',
				monthly: '$290/usuario',
				setupLabel: 'Implementación',
				monthlyLabel: 'por mes'
			},
			features: ['Agente IA WhatsApp', 'Agente IA Voz (llamadas)', 'Contexto 360° del cliente', 'Lead scoring con IA', 'Pipeline de ventas', 'Automatización de citas', 'API REST'],
			highlights: ['IA Multicanal', 'Contexto unificado', 'Automatización total']
		},
		{
			name: 'Colectiva',
			subtitle: 'Gateway de Pagos + Hub de IA',
			description: 'Plataforma de pagos con CoDi, SPEI, tarjetas y monedero virtual. Centro de control para metrificación de IA del ecosistema con auditoría fiscal completa.',
			icon: '💳',
			tier: 'enterprise',
			url: 'https://colectiva.redbroomsoftware.com',
			pricing: {
				setup: '$75,000',
				monthly: '0.8% + $3.50',
				setupLabel: 'Integración',
				monthlyLabel: 'por transacción'
			},
			features: ['CoDi en tiempo real', 'SPEI automatizado', 'Monedero virtual', 'Metrificación IA centralizada', 'Dashboard analytics', 'Conciliación automática', 'Multi-merchant'],
			highlights: ['99.9% uptime', 'PCI DSS', 'Control de tokens IA']
		},
		{
			name: 'Constanza',
			subtitle: 'Contabilidad Inteligente para Despachos',
			description: 'Plataforma multi-cliente para contadores: gestiona decenas de empresas desde un solo dashboard. IA fiscal, CFDI 4.0, DIOT automático, y optimización RESICO.',
			icon: '📊',
			tier: 'enterprise',
			url: 'https://constanza.redbroomsoftware.com',
			pricing: {
				setup: '$45,000',
				monthly: '$590/contador',
				setupLabel: 'Implementación',
				monthlyLabel: 'por mes'
			},
			features: ['Multi-cliente (despachos)', 'IA Fiscal + RESICO', 'CFDI 4.0 ilimitado', 'DIOT/Balanza automático', 'IMSS/IDSE integrado', 'Consolidación grupos', 'API ecosistema'],
			highlights: ['Ideal para despachos', 'Ahorro fiscal real', 'Cumplimiento SAT 100%']
		}
	];

	const getTierBadge = (tier: string) => {
		switch (tier) {
			case 'enterprise':
				return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white';
			case 'professional':
				return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white';
			case 'standard':
				return 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white';
			default:
				return 'bg-gray-100 text-gray-600';
		}
	};

	const getTierLabel = (tier: string) => {
		switch (tier) {
			case 'enterprise':
				return 'Enterprise';
			case 'professional':
				return 'Professional';
			case 'standard':
				return 'Standard';
			default:
				return 'Coming Soon';
		}
	};

	// Dynamic hover state for products
	let hoveredProduct: number | null = null;
	let isAnyHovered = false;

	function handleProductEnter(index: number) {
		hoveredProduct = index;
		isAnyHovered = true;
	}

	function handleProductLeave() {
		hoveredProduct = null;
		isAnyHovered = false;
	}
</script>

<svelte:head>
	<title>Red Broom Software - Software Empresarial de Alto Rendimiento</title>
	<meta
		name="description"
		content="Soluciones de software empresarial para restaurantes, retail, veterinarias, pagos y contabilidad. Tecnología de clase mundial para negocios mexicanos."
	/>
	<!-- Canonical URL -->
	<link rel="canonical" href="https://redbroomsoftware.com/" />

	<!-- OpenGraph Meta Tags -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://redbroomsoftware.com/" />
	<meta property="og:title" content="Red Broom Software - Software Empresarial de Alto Rendimiento" />
	<meta property="og:description" content="Soluciones de software empresarial para restaurantes, retail, veterinarias, pagos y contabilidad. 6 productos integrados para PyMEs mexicanas." />
	<meta property="og:image" content="https://redbroomsoftware.com/og-image.png" />
	<meta property="og:locale" content="es_MX" />
	<meta property="og:site_name" content="Red Broom Software" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Red Broom Software - Software Empresarial" />
	<meta name="twitter:description" content="6 productos integrados: POS, ERP, CRM, Pagos, Contabilidad, Veterinario. Para PyMEs mexicanas." />
	<meta name="twitter:image" content="https://redbroomsoftware.com/og-image.png" />

	<!-- Additional SEO -->
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Red Broom Software S.A.S. de C.V." />
	<meta name="keywords" content="software empresarial, POS restaurantes, ERP retail, CRM, pagos, contabilidad, veterinarias, México, PyMEs, facturación CFDI" />

	<!-- Schema.org Organization -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "Red Broom Software",
		"legalName": "Red Broom Software S.A.S. de C.V.",
		"url": "https://redbroomsoftware.com",
		"logo": "https://redbroomsoftware.com/logo.svg",
		"description": "Software empresarial de alto rendimiento para PyMEs mexicanas",
		"address": {
			"@type": "PostalAddress",
			"addressLocality": "Ciudad de México",
			"addressCountry": "MX"
		},
		"contactPoint": {
			"@type": "ContactPoint",
			"email": "dia@redbroomsoftware.com",
			"contactType": "sales"
		},
		"sameAs": []
	}
	</script>`}

	<!-- Schema.org SoftwareApplication for each product -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "ItemList",
		"itemListElement": [
			{
				"@type": "SoftwareApplication",
				"position": 1,
				"name": "Caracol POS",
				"applicationCategory": "BusinessApplication",
				"operatingSystem": "Web",
				"description": "Sistema POS para restaurantes con gestión de mesas, comandas y facturación CFDI 4.0",
				"offers": {
					"@type": "Offer",
					"price": "396",
					"priceCurrency": "MXN",
					"priceValidUntil": "2025-12-31"
				}
			},
			{
				"@type": "SoftwareApplication",
				"position": 2,
				"name": "La Hoja ERP",
				"applicationCategory": "BusinessApplication",
				"operatingSystem": "Web",
				"description": "ERP para cafeterías y retail con inventario FIFO y programa de lealtad"
			},
			{
				"@type": "SoftwareApplication",
				"position": 3,
				"name": "Cosmos Pet",
				"applicationCategory": "BusinessApplication",
				"operatingSystem": "Web",
				"description": "Software para veterinarias con expedientes SOAP y control de vacunas"
			},
			{
				"@type": "SoftwareApplication",
				"position": 4,
				"name": "Camino CRM",
				"applicationCategory": "BusinessApplication",
				"operatingSystem": "Web",
				"description": "CRM con lead scoring con IA y automatización de marketing"
			},
			{
				"@type": "SoftwareApplication",
				"position": 5,
				"name": "Colectiva",
				"applicationCategory": "BusinessApplication",
				"operatingSystem": "Web",
				"description": "Gateway de pagos con CoDi, SPEI y monedero virtual"
			},
			{
				"@type": "SoftwareApplication",
				"position": 6,
				"name": "Constanza",
				"applicationCategory": "BusinessApplication",
				"operatingSystem": "Web",
				"description": "Contabilidad inteligente para despachos con IA fiscal y CFDI 4.0"
			}
		]
	}
	</script>`}

	<!-- Schema.org FAQPage -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": [
			{
				"@type": "Question",
				"name": "¿Cuánto tiempo toma la implementación?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "La implementación típica toma de 2 a 4 semanas dependiendo del producto y la complejidad de tu operación. Incluye migración de datos existentes, capacitación de tu equipo y soporte durante el arranque."
				}
			},
			{
				"@type": "Question",
				"name": "¿Puedo usar múltiples productos del ecosistema?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Sí, nuestros productos están diseñados para trabajar juntos. Por ejemplo, puedes usar Caracol para tu POS, Colectiva para procesar pagos, y Constanza para tu contabilidad. Todos se comunican automáticamente."
				}
			},
			{
				"@type": "Question",
				"name": "¿Qué pasa con mis datos si cancelo?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Tus datos siempre son tuyos. Al cancelar, te proporcionamos una exportación completa de tu información en formatos estándar (CSV, JSON, PDF). Mantenemos tus datos por 90 días después de la cancelación."
				}
			},
			{
				"@type": "Question",
				"name": "¿Cómo funciona la facturación CFDI 4.0?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Todos nuestros productos incluyen facturación CFDI 4.0 integrada. Solo necesitas subir tu Certificado de Sello Digital (CSD) y nosotros nos encargamos del resto: timbrado automático, envío por email, almacenamiento de XMLs y reportes fiscales."
				}
			},
			{
				"@type": "Question",
				"name": "¿Ofrecen soporte técnico?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Sí, ofrecemos soporte 24/7 para todos nuestros clientes. Los planes Professional y Enterprise incluyen un Account Manager dedicado, soporte prioritario y capacitaciones periódicas."
				}
			},
			{
				"@type": "Question",
				"name": "¿Puedo probar antes de comprar?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Sí, ofrecemos demos personalizadas y para algunos productos periodos de prueba de 14 días con funcionalidad completa."
				}
			}
		]
	}
	</script>`}
</svelte:head>

<div class="min-h-screen bg-slate-950">
	<!-- Skip to main content link for accessibility -->
	<a
		href="#productos"
		class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white focus:rounded-lg focus:outline-none"
	>
		Saltar al contenido principal
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

				<!-- Desktop Navigation -->
				<nav class="hidden md:flex items-center space-x-8" aria-label="Navegación principal">
					<a href="#productos" class="text-slate-300 hover:text-white transition-colors">Productos</a>
					<a href="#ecosistema" class="text-slate-300 hover:text-white transition-colors">Ecosistema</a>
					<a href="#porque" class="text-slate-300 hover:text-white transition-colors">Por qué RBS</a>
					<a href="#faq" class="text-slate-300 hover:text-white transition-colors">FAQ</a>
					<a href="#contacto" class="text-slate-300 hover:text-white transition-colors">Contacto</a>
					<a
						href="#contacto"
						class="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium"
					>
						Solicitar Demo
					</a>
				</nav>

				<!-- Mobile Menu Button -->
				<button
					class="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
					on:click={toggleMobileMenu}
					aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
					aria-expanded={mobileMenuOpen}
					aria-controls="mobile-menu"
				>
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

			<!-- Mobile Navigation -->
			{#if mobileMenuOpen}
				<nav
					id="mobile-menu"
					class="md:hidden mt-4 pb-4 border-t border-slate-800 pt-4"
					aria-label="Navegación móvil"
				>
					<div class="flex flex-col space-y-4">
						<a href="#productos" on:click={closeMobileMenu} class="text-slate-300 hover:text-white transition-colors py-2">Productos</a>
						<a href="#ecosistema" on:click={closeMobileMenu} class="text-slate-300 hover:text-white transition-colors py-2">Ecosistema</a>
						<a href="#porque" on:click={closeMobileMenu} class="text-slate-300 hover:text-white transition-colors py-2">Por qué RBS</a>
						<a href="#faq" on:click={closeMobileMenu} class="text-slate-300 hover:text-white transition-colors py-2">FAQ</a>
						<a href="#contacto" on:click={closeMobileMenu} class="text-slate-300 hover:text-white transition-colors py-2">Contacto</a>
						<a
							href="#contacto"
							on:click={closeMobileMenu}
							class="px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium text-center"
						>
							Solicitar Demo
						</a>
					</div>
				</nav>
			{/if}
		</div>
	</header>

	<!-- Hero Section -->
	<section class="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
		<!-- Background gradient -->
		<div class="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-purple-600/5 to-transparent"></div>
		<div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>

		<div class="max-w-7xl mx-auto text-center relative">
			<div class="inline-flex items-center px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300 mb-8">
				<span class="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
				6 productos en producción
			</div>

			<h2 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
				Software que
				<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
					transforma
				</span>
				<br />negocios
			</h2>
			<p class="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
				Soluciones empresariales de alto rendimiento para restaurantes, retail, veterinarias,
				pagos y contabilidad. Diseñado para escalar con tu negocio.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="#productos"
					class="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all text-lg font-semibold shadow-lg shadow-blue-500/25"
				>
					Ver Productos
				</a>
				<a
					href="#contacto"
					class="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-xl hover:bg-slate-700 transition-all text-lg font-semibold"
				>
					Agendar Llamada
				</a>
			</div>

			<!-- Stats -->
			<div class="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
				<div>
					<p class="text-4xl font-bold text-white">6</p>
					<p class="text-slate-400 text-sm">Productos</p>
				</div>
				<div>
					<p class="text-4xl font-bold text-white">99.9%</p>
					<p class="text-slate-400 text-sm">Uptime</p>
				</div>
				<div>
					<p class="text-4xl font-bold text-white">24/7</p>
					<p class="text-slate-400 text-sm">Soporte</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Products Section -->
	<section id="productos" class="py-24 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-4xl font-bold text-white mb-4">Nuestras Soluciones</h2>
				<p class="text-xl text-slate-400 max-w-2xl mx-auto">
					Cada producto está diseñado para resolver problemas específicos de tu industria
				</p>
			</div>

			<!-- Dynamic Products Grid with Hover Effects -->
			<div class="products-grid grid grid-cols-1 lg:grid-cols-2 gap-6" role="list">
				{#each products as product, index}
					<article
						class="product-card bg-slate-900 rounded-2xl border overflow-hidden
							{hoveredProduct === index ? 'border-blue-500/50 shadow-2xl shadow-blue-500/20 z-10 ring-1 ring-blue-500/30' : 'border-slate-800'}
							{isAnyHovered && hoveredProduct !== index ? 'opacity-50 blur-[1px]' : 'opacity-100'}"
						style="transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); transform: {hoveredProduct === index ? 'scale(1.03)' : isAnyHovered && hoveredProduct !== index ? 'scale(0.97)' : 'scale(1)'};"
						role="listitem"
					>
						<div class="p-6 lg:p-8">
							<!-- Header with Dynamic Title - HOVER TRIGGER ZONE -->
							<div class="flex items-start justify-between mb-4">
								<button
									type="button"
									class="flex items-center gap-4 text-left cursor-pointer rounded-lg p-2 -m-2 transition-colors hover:bg-slate-800/30"
									on:mouseenter={() => handleProductEnter(index)}
									on:mouseleave={handleProductLeave}
									on:focus={() => handleProductEnter(index)}
									on:blur={handleProductLeave}
									aria-label="Ver detalles de {product.name}"
								>
									<div
										class="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center text-3xl"
										style="transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); transform: {hoveredProduct === index ? 'scale(1.25) rotate(5deg)' : 'scale(1)'}; background: {hoveredProduct === index ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))' : ''};"
										aria-hidden="true"
									>
										{product.icon}
									</div>
									<div style="transition: transform 0.25s ease; transform: {hoveredProduct === index ? 'translateX(4px)' : 'translateX(0)'};">
										<h3
											class="font-bold text-white"
											style="transition: all 0.2s ease; font-size: {hoveredProduct === index ? '1.75rem' : '1.5rem'}; line-height: 1.2;"
										>{product.name}</h3>
										<p
											class="text-sm"
											style="transition: color 0.2s ease; color: {hoveredProduct === index ? 'rgb(147, 197, 253)' : 'rgb(148, 163, 184)'};"
										>{product.subtitle}</p>
									</div>
								</button>
								<span class="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap {getTierBadge(product.tier)}">
									{getTierLabel(product.tier)}
								</span>
							</div>

							<!-- Description - Expands on hover -->
							<div
								class="overflow-hidden"
								style="transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); max-height: {hoveredProduct === index ? '120px' : '48px'}; opacity: {hoveredProduct === index ? '1' : '0.7'}; margin-bottom: {hoveredProduct === index ? '1rem' : '0.5rem'};"
							>
								<p class="text-slate-300 leading-relaxed text-sm lg:text-base">{product.description}</p>
							</div>

							<!-- Pricing - Enhanced on hover -->
							<div
								class="bg-slate-800/50 rounded-xl p-4 lg:p-5 mb-4"
								style="transition: all 0.25s ease; background: {hoveredProduct === index ? 'rgba(30, 41, 59, 0.9)' : ''}; box-shadow: {hoveredProduct === index ? 'inset 0 0 0 1px rgba(59, 130, 246, 0.2)' : 'none'};"
							>
								<div class="flex items-end gap-4 lg:gap-6">
									<div>
										<p class="text-xs text-slate-400 uppercase tracking-wide mb-1">{product.pricing.setupLabel}</p>
										<p
											class="font-bold text-white"
											style="transition: font-size 0.2s ease; font-size: {hoveredProduct === index ? '1.5rem' : '1.25rem'};"
										>{product.pricing.setup}</p>
									</div>
									<div class="text-slate-600 pb-1">+</div>
									<div>
										<p class="text-xs text-slate-400 uppercase tracking-wide mb-1">{product.pricing.monthlyLabel}</p>
										<p
											class="font-bold text-white"
											style="transition: font-size 0.2s ease; font-size: {hoveredProduct === index ? '1.5rem' : '1.25rem'};"
										>{product.pricing.monthly}</p>
									</div>
								</div>
							</div>

							<!-- Features - Cascade reveal on hover -->
							<div
								class="overflow-hidden"
								style="transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); max-height: {hoveredProduct === index ? '200px' : '60px'}; opacity: {hoveredProduct === index ? '1' : '0.6'}; margin-bottom: {hoveredProduct === index ? '1rem' : '0.5rem'};"
							>
								<div class="grid grid-cols-2 gap-1.5 lg:gap-2">
									{#each product.features as feature, fi}
										<div
											class="flex items-center gap-2 text-xs lg:text-sm text-slate-300"
											style="transition: all 0.2s ease; transition-delay: {fi * 25}ms; opacity: {hoveredProduct === index ? 1 : (fi < 4 ? 0.8 : 0.3)}; transform: {hoveredProduct === index ? 'translateX(0)' : 'translateX(-4px)'};"
										>
											<svg class="w-3.5 h-3.5 lg:w-4 lg:h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
											</svg>
											<span class="truncate">{feature}</span>
										</div>
									{/each}
								</div>
							</div>

							<!-- Highlights - Slide in on hover -->
							<div
								class="overflow-hidden"
								style="transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); max-height: {hoveredProduct === index ? '60px' : '0'}; opacity: {hoveredProduct === index ? '1' : '0'}; margin-bottom: {hoveredProduct === index ? '1rem' : '0'};"
							>
								<div class="flex flex-wrap gap-2">
									{#each product.highlights as highlight, hi}
										<span
											class="px-3 py-1 rounded-lg text-xs font-medium"
											style="transition: all 0.2s ease; transition-delay: {hi * 40}ms; background: {hoveredProduct === index ? 'rgba(59, 130, 246, 0.15)' : 'rgb(30, 41, 59)'}; color: {hoveredProduct === index ? 'rgb(147, 197, 253)' : 'rgb(203, 213, 225)'}; border: {hoveredProduct === index ? '1px solid rgba(59, 130, 246, 0.3)' : 'none'}; transform: {hoveredProduct === index ? 'translateY(0)' : 'translateY(8px)'};"
										>
											{highlight}
										</span>
									{/each}
								</div>
							</div>

							<!-- CTA - Glow on hover -->
							<div
								class="flex gap-2 lg:gap-3"
								style="transition: opacity 0.2s ease; opacity: {hoveredProduct === index ? '1' : '0.85'};"
							>
								<a
									href={product.url}
									target="_blank"
									rel="noopener noreferrer"
									class="flex-1 text-center px-4 lg:px-6 py-2.5 lg:py-3 bg-slate-800 text-white border border-slate-700 rounded-xl hover:bg-slate-700 hover:border-slate-600 transition-all font-semibold flex items-center justify-center gap-2 text-sm lg:text-base"
								>
									<span class="hidden sm:inline">Ver Producto</span>
									<span class="sm:hidden">Ver</span>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
									</svg>
								</a>
								<a
									href="#contacto"
									class="flex-1 text-center px-4 lg:px-6 py-2.5 lg:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-semibold text-sm lg:text-base"
									style="box-shadow: {hoveredProduct === index ? '0 10px 40px -10px rgba(59, 130, 246, 0.5)' : 'none'};"
								>
									<span class="hidden sm:inline">Solicitar Demo</span>
									<span class="sm:hidden">Demo</span>
								</a>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- Ecosystem Integration Section -->
	<section id="ecosistema" class="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-slate-900">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<div class="inline-flex items-center px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-sm text-emerald-400 mb-6">
					<span class="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
					Ecosistema Integrado
				</div>
				<h2 class="text-4xl font-bold text-white mb-4">Todo conectado, todo automatizado</h2>
				<p class="text-xl text-slate-400 max-w-3xl mx-auto">
					Nuestros productos se comunican entre sí. Una venta en tu POS genera automáticamente la factura,
					registra el pago, actualiza inventario y alimenta tu contabilidad.
				</p>
			</div>

			<!-- Integration Flow Diagram -->
			<div class="bg-slate-900 rounded-2xl border border-slate-800 p-8 mb-12">
				<div class="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
					<div class="text-center p-4">
						<div class="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center text-3xl mx-auto mb-3">
							🍽️
						</div>
						<p class="text-white font-semibold">Caracol/La Hoja</p>
						<p class="text-slate-400 text-sm">Punto de venta</p>
					</div>
					<div class="hidden md:flex items-center justify-center">
						<svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
						</svg>
					</div>
					<div class="text-center p-4">
						<div class="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center text-3xl mx-auto mb-3">
							💳
						</div>
						<p class="text-white font-semibold">Colectiva</p>
						<p class="text-slate-400 text-sm">Procesa pago</p>
					</div>
					<div class="hidden md:flex items-center justify-center">
						<svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
						</svg>
					</div>
					<div class="text-center p-4">
						<div class="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center text-3xl mx-auto mb-3">
							📊
						</div>
						<p class="text-white font-semibold">Constanza</p>
						<p class="text-slate-400 text-sm">Contabiliza</p>
					</div>
				</div>
			</div>

			<!-- Benefits Grid -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div class="text-center">
					<div class="text-4xl font-bold text-emerald-400 mb-2">0</div>
					<p class="text-white font-semibold mb-1">Capturas manuales</p>
					<p class="text-slate-400 text-sm">Todo fluye automáticamente entre sistemas</p>
				</div>
				<div class="text-center">
					<div class="text-4xl font-bold text-emerald-400 mb-2">100%</div>
					<p class="text-white font-semibold mb-1">Conciliación automática</p>
					<p class="text-slate-400 text-sm">Ventas, pagos y facturas siempre cuadran</p>
				</div>
				<div class="text-center">
					<div class="text-4xl font-bold text-emerald-400 mb-2">1-2.5%</div>
					<p class="text-white font-semibold mb-1">Impuestos con RESICO</p>
					<p class="text-slate-400 text-sm">Optimización fiscal automática si calificas</p>
				</div>
			</div>

			<!-- AI Token Management Feature -->
			<div class="mt-16 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl border border-purple-500/20 p-8">
				<div class="flex flex-col md:flex-row items-center gap-8">
					<div class="flex-shrink-0">
						<div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-4xl">
							🤖
						</div>
					</div>
					<div class="flex-1 text-center md:text-left">
						<div class="inline-flex items-center px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300 mb-3">
							<span class="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
							NUEVO: Gestión Centralizada de IA
						</div>
						<h3 class="text-2xl font-bold text-white mb-3">Sistema de Metrificación de Tokens de IA</h3>
						<p class="text-slate-300 mb-4">
							Control total sobre el consumo de IA en todo el ecosistema RBS. Límites por plan, auditoría completa
							de uso, cumplimiento fiscal, y facturación automática. Todo desde un solo dashboard.
						</p>
						<div class="flex flex-wrap gap-4 justify-center md:justify-start">
							<div class="flex items-center gap-2 text-sm text-slate-300">
								<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								Auditoría completa
							</div>
							<div class="flex items-center gap-2 text-sm text-slate-300">
								<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								Límites por organización
							</div>
							<div class="flex items-center gap-2 text-sm text-slate-300">
								<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								Multi-proveedor (OpenAI, Anthropic, Google)
							</div>
							<div class="flex items-center gap-2 text-sm text-slate-300">
								<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								Facturación automática
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Why RBS Section -->
	<section id="porque" class="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-4xl font-bold text-white mb-4">¿Por qué Red Broom Software?</h2>
				<p class="text-xl text-slate-400 max-w-2xl mx-auto">
					No solo vendemos software, construimos soluciones que impulsan tu crecimiento
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<div class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
					<div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
						<svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
						</svg>
					</div>
					<h3 class="text-xl font-bold text-white mb-3">Implementación Rápida</h3>
					<p class="text-slate-400">
						De 2 a 4 semanas para estar operando. Incluye migración de datos, capacitación y soporte durante el arranque.
					</p>
				</div>

				<div class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
					<div class="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
						<svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
						</svg>
					</div>
					<h3 class="text-xl font-bold text-white mb-3">Seguridad Enterprise</h3>
					<p class="text-slate-400">
						Infraestructura en la nube con encriptación end-to-end, backups automáticos y cumplimiento de normativas mexicanas.
					</p>
				</div>

				<div class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
					<div class="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
						<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
						</svg>
					</div>
					<h3 class="text-xl font-bold text-white mb-3">Soporte Dedicado</h3>
					<p class="text-slate-400">
						Equipo de soporte técnico disponible 24/7. Account manager dedicado para clientes Enterprise.
					</p>
				</div>

				<div class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
					<div class="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6">
						<svg class="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
						</svg>
					</div>
					<h3 class="text-xl font-bold text-white mb-3">Integraciones</h3>
					<p class="text-slate-400">
						Todos nuestros productos se integran entre sí. Conecta tu POS con contabilidad, pagos y CRM automáticamente.
					</p>
				</div>

				<div class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
					<div class="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6">
						<svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
						</svg>
					</div>
					<h3 class="text-xl font-bold text-white mb-3">Escalabilidad</h3>
					<p class="text-slate-400">
						Desde una sucursal hasta cientos. Nuestra infraestructura escala automáticamente con tu crecimiento.
					</p>
				</div>

				<div class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
					<div class="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6">
						<svg class="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
					</div>
					<h3 class="text-xl font-bold text-white mb-3">ROI Garantizado</h3>
					<p class="text-slate-400">
						Nuestros clientes reportan reducción de costos operativos del 30% en promedio durante el primer año.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Trust & Testimonials Section -->
	<section id="testimonios" class="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-4xl font-bold text-white mb-4">Lo que dicen nuestros clientes</h2>
				<p class="text-xl text-slate-400 max-w-2xl mx-auto">
					Empresas de diversos sectores confían en nuestras soluciones
				</p>
			</div>

			<!-- Testimonials Grid -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
				<div class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
					<div class="flex items-center gap-1 mb-4">
						{#each Array(5) as _}
							<svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
							</svg>
						{/each}
					</div>
					<p class="text-slate-300 mb-6 italic">
						"Caracol transformó completamente nuestra operación. Ahora tenemos visibilidad total de nuestras 3 sucursales desde un solo dashboard. La facturación automática nos ahorra horas cada día."
					</p>
					<div class="flex items-center gap-4">
						<div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
							MR
						</div>
						<div>
							<p class="text-white font-semibold">María Rodríguez</p>
							<p class="text-slate-400 text-sm">Dueña, Restaurante La Perla</p>
						</div>
					</div>
				</div>

				<div class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
					<div class="flex items-center gap-1 mb-4">
						{#each Array(5) as _}
							<svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
							</svg>
						{/each}
					</div>
					<p class="text-slate-300 mb-6 italic">
						"Como contador con 15 clientes, Constanza me permite gestionar todo desde un lugar. La IA fiscal me ha ayudado a encontrar deducciones que antes se me escapaban."
					</p>
					<div class="flex items-center gap-4">
						<div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
							JG
						</div>
						<div>
							<p class="text-white font-semibold">Jorge García</p>
							<p class="text-slate-400 text-sm">Contador Público, Despacho García</p>
						</div>
					</div>
				</div>

				<div class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
					<div class="flex items-center gap-1 mb-4">
						{#each Array(5) as _}
							<svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
							</svg>
						{/each}
					</div>
					<p class="text-slate-300 mb-6 italic">
						"Cosmos Pet nos permitió digitalizar completamente nuestra clínica. Los recordatorios automáticos de vacunas aumentaron nuestras citas un 40%. ¡Increíble!"
					</p>
					<div class="flex items-center gap-4">
						<div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
							AL
						</div>
						<div>
							<p class="text-white font-semibold">Ana López</p>
							<p class="text-slate-400 text-sm">MVZ, Clínica Veterinaria Patitas</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Trust Badges -->
			<div class="bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
				<p class="text-center text-slate-400 text-sm uppercase tracking-wide mb-8">Cumplimiento y Seguridad</p>
				<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
					<div class="text-center">
						<div class="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-3">
							<svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
							</svg>
						</div>
						<p class="text-white font-semibold text-sm">CFDI 4.0</p>
						<p class="text-slate-400 text-xs">Certificado SAT</p>
					</div>
					<div class="text-center">
						<div class="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-3">
							<svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
							</svg>
						</div>
						<p class="text-white font-semibold text-sm">Encriptación</p>
						<p class="text-slate-400 text-xs">AES-256 End-to-End</p>
					</div>
					<div class="text-center">
						<div class="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-3">
							<svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
							</svg>
						</div>
						<p class="text-white font-semibold text-sm">PCI DSS</p>
						<p class="text-slate-400 text-xs">Pagos Seguros</p>
					</div>
					<div class="text-center">
						<div class="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-3">
							<svg class="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
							</svg>
						</div>
						<p class="text-white font-semibold text-sm">99.9% Uptime</p>
						<p class="text-slate-400 text-xs">SLA Garantizado</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Investors Section -->
	<section id="inversionistas" class="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-950">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<div class="inline-flex items-center px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-sm text-amber-400 mb-6">
					<span class="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
					Oportunidad de Inversión
				</div>
				<h2 class="text-4xl font-bold text-white mb-4">Para Inversionistas</h2>
				<p class="text-xl text-slate-400 max-w-3xl mx-auto">
					Red Broom Software está construyendo el ecosistema de software empresarial más completo para el mercado mexicano.
					6 productos integrados, cada uno atacando un vertical específico.
				</p>
			</div>

			<!-- Investment Highlights -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
				<div class="bg-slate-900/50 rounded-2xl border border-slate-800 p-8 text-center">
					<div class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">6</div>
					<p class="text-white font-semibold mb-1">Productos en Producción</p>
					<p class="text-slate-400 text-sm">POS, ERP, CRM, Pagos, Contabilidad, Veterinario</p>
				</div>
				<div class="bg-slate-900/50 rounded-2xl border border-slate-800 p-8 text-center">
					<div class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2">1</div>
					<p class="text-white font-semibold mb-1">Ecosistema Integrado</p>
					<p class="text-slate-400 text-sm">Todos los productos se comunican entre sí</p>
				</div>
				<div class="bg-slate-900/50 rounded-2xl border border-slate-800 p-8 text-center">
					<div class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-2">∞</div>
					<p class="text-white font-semibold mb-1">Potencial de Mercado</p>
					<p class="text-slate-400 text-sm">+4M PyMEs en México sin software adecuado</p>
				</div>
			</div>

			<!-- Why Invest -->
			<div class="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 md:p-12">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-12">
					<div>
						<h3 class="text-2xl font-bold text-white mb-6">¿Por qué invertir en RBS?</h3>
						<ul class="space-y-4">
							<li class="flex items-start gap-3">
								<svg class="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<div>
									<p class="text-white font-medium">Productos validados en producción</p>
									<p class="text-slate-400 text-sm">Clientes reales pagando, no solo MVPs</p>
								</div>
							</li>
							<li class="flex items-start gap-3">
								<svg class="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<div>
									<p class="text-white font-medium">Modelo de negocio SaaS recurrente</p>
									<p class="text-slate-400 text-sm">Revenue predecible mes a mes</p>
								</div>
							</li>
							<li class="flex items-start gap-3">
								<svg class="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<div>
									<p class="text-white font-medium">Cross-sell nativo</p>
									<p class="text-slate-400 text-sm">Un cliente puede usar múltiples productos</p>
								</div>
							</li>
							<li class="flex items-start gap-3">
								<svg class="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<div>
									<p class="text-white font-medium">IA integrada desde el día 1</p>
									<p class="text-slate-400 text-sm">Metrificación centralizada de tokens, facturación automática</p>
								</div>
							</li>
						</ul>
					</div>
					<div>
						<h3 class="text-2xl font-bold text-white mb-6">Uso de Fondos</h3>
						<ul class="space-y-4">
							<li class="flex items-start gap-3">
								<div class="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">1</div>
								<div>
									<p class="text-white font-medium">Expansión comercial</p>
									<p class="text-slate-400 text-sm">Equipo de ventas dedicado por vertical</p>
								</div>
							</li>
							<li class="flex items-start gap-3">
								<div class="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 font-bold text-sm flex-shrink-0">2</div>
								<div>
									<p class="text-white font-medium">Desarrollo de producto</p>
									<p class="text-slate-400 text-sm">Funcionalidades enterprise y mobile</p>
								</div>
							</li>
							<li class="flex items-start gap-3">
								<div class="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 font-bold text-sm flex-shrink-0">3</div>
								<div>
									<p class="text-white font-medium">Marketing y branding</p>
									<p class="text-slate-400 text-sm">Posicionamiento en mercado mexicano</p>
								</div>
							</li>
							<li class="flex items-start gap-3">
								<div class="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 font-bold text-sm flex-shrink-0">4</div>
								<div>
									<p class="text-white font-medium">Infraestructura</p>
									<p class="text-slate-400 text-sm">Escalar para +10,000 clientes simultáneos</p>
								</div>
							</li>
						</ul>
					</div>
				</div>

				<div class="mt-12 pt-8 border-t border-slate-700 text-center">
					<p class="text-slate-400 mb-6">¿Interesado en conocer más sobre la oportunidad de inversión?</p>
					<a
						href="mailto:dia@redbroomsoftware.com?subject=Interés en Inversión - RBS"
						class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all text-lg font-semibold"
					>
						Contactar para Inversión
						<svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
		<div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
		<div class="max-w-4xl mx-auto text-center relative">
			<h2 class="text-4xl font-bold text-white mb-6">
				¿Listo para modernizar tu negocio?
			</h2>
			<p class="text-xl text-slate-300 mb-10">
				Agenda una llamada con nuestro equipo comercial. Te mostraremos cómo nuestras soluciones
				pueden transformar tu operación.
			</p>
			<a
				href="#contacto"
				class="inline-flex items-center px-8 py-4 bg-white text-slate-900 rounded-xl hover:bg-slate-100 transition-all text-lg font-semibold"
			>
				Agendar Demostración
				<svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
				</svg>
			</a>
		</div>
	</section>

	<!-- FAQ Section -->
	<section id="faq" class="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950">
		<div class="max-w-4xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-4xl font-bold text-white mb-4">Preguntas Frecuentes</h2>
				<p class="text-xl text-slate-400">
					Respuestas a las dudas más comunes sobre nuestros productos
				</p>
			</div>

			<div class="space-y-4">
				<details class="group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
					<summary class="flex items-center justify-between p-6 cursor-pointer list-none">
						<h3 class="text-lg font-semibold text-white pr-4">¿Cuánto tiempo toma la implementación?</h3>
						<svg class="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
						</svg>
					</summary>
					<div class="px-6 pb-6 text-slate-300">
						<p>La implementación típica toma de 2 a 4 semanas dependiendo del producto y la complejidad de tu operación. Incluye migración de datos existentes, capacitación de tu equipo y soporte durante el arranque. Para implementaciones enterprise con múltiples sucursales, el proceso puede extenderse a 6-8 semanas.</p>
					</div>
				</details>

				<details class="group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
					<summary class="flex items-center justify-between p-6 cursor-pointer list-none">
						<h3 class="text-lg font-semibold text-white pr-4">¿Puedo usar múltiples productos del ecosistema?</h3>
						<svg class="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
						</svg>
					</summary>
					<div class="px-6 pb-6 text-slate-300">
						<p>¡Absolutamente! Nuestros productos están diseñados para trabajar juntos. Por ejemplo, puedes usar Caracol para tu POS, Colectiva para procesar pagos, y Constanza para tu contabilidad. Todos se comunican automáticamente, eliminando capturas duplicadas y errores humanos. Ofrecemos descuentos por usar múltiples productos.</p>
					</div>
				</details>

				<details class="group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
					<summary class="flex items-center justify-between p-6 cursor-pointer list-none">
						<h3 class="text-lg font-semibold text-white pr-4">¿Qué pasa con mis datos si cancelo?</h3>
						<svg class="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
						</svg>
					</summary>
					<div class="px-6 pb-6 text-slate-300">
						<p>Tus datos siempre son tuyos. Al cancelar, te proporcionamos una exportación completa de tu información en formatos estándar (CSV, JSON, PDF). Mantenemos tus datos por 90 días después de la cancelación por si decides regresar. Cumplimos con las normativas de protección de datos vigentes en México.</p>
					</div>
				</details>

				<details class="group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
					<summary class="flex items-center justify-between p-6 cursor-pointer list-none">
						<h3 class="text-lg font-semibold text-white pr-4">¿Cómo funciona la facturación CFDI 4.0?</h3>
						<svg class="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
						</svg>
					</summary>
					<div class="px-6 pb-6 text-slate-300">
						<p>Todos nuestros productos incluyen facturación CFDI 4.0 integrada. Solo necesitas subir tu Certificado de Sello Digital (CSD) y nosotros nos encargamos del resto: timbrado automático, envío por email, almacenamiento de XMLs y reportes fiscales. Cumplimos 100% con los requisitos del SAT y actualizamos automáticamente cuando hay cambios normativos.</p>
					</div>
				</details>

				<details class="group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
					<summary class="flex items-center justify-between p-6 cursor-pointer list-none">
						<h3 class="text-lg font-semibold text-white pr-4">¿Ofrecen soporte técnico?</h3>
						<svg class="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
						</svg>
					</summary>
					<div class="px-6 pb-6 text-slate-300">
						<p>Sí, ofrecemos soporte 24/7 para todos nuestros clientes. Los planes Professional y Enterprise incluyen un Account Manager dedicado, soporte prioritario y capacitaciones periódicas. También contamos con una base de conocimientos, tutoriales en video y webinars mensuales sobre mejores prácticas.</p>
					</div>
				</details>

				<details class="group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
					<summary class="flex items-center justify-between p-6 cursor-pointer list-none">
						<h3 class="text-lg font-semibold text-white pr-4">¿Puedo probar antes de comprar?</h3>
						<svg class="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
						</svg>
					</summary>
					<div class="px-6 pb-6 text-slate-300">
						<p>¡Por supuesto! Ofrecemos demos personalizadas donde te mostramos el producto funcionando con datos similares a tu negocio. Para algunos productos también ofrecemos periodos de prueba de 14 días con funcionalidad completa. Agenda una llamada con nuestro equipo comercial para conocer las opciones disponibles.</p>
					</div>
				</details>
			</div>
		</div>
	</section>

	<!-- Contact Form Section -->
	<section id="contacto" class="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
		<div class="max-w-4xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="text-4xl font-bold text-white mb-4">Hablemos de tu proyecto</h2>
				<p class="text-xl text-slate-400">
					Cuéntanos sobre tu negocio y te contactaremos en menos de 24 horas
				</p>
			</div>

			<div class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
				{#if submitStatus === 'success'}
					<div class="text-center py-12">
						<div class="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
							<svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
							</svg>
						</div>
						<h3 class="text-2xl font-bold text-white mb-2">¡Gracias por contactarnos!</h3>
						<p class="text-slate-400 mb-8">Tu mensaje ha sido recibido. Un especialista te contactará en menos de 24 horas.</p>
						<button
							on:click={() => submitStatus = 'idle'}
							class="px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors"
						>
							Enviar otro mensaje
						</button>
					</div>
				{:else if submitStatus === 'error'}
					<div class="text-center py-12">
						<div class="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
							<svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
							</svg>
						</div>
						<h3 class="text-2xl font-bold text-white mb-2">Error al enviar</h3>
						<p class="text-slate-400 mb-8">{errorMessage}</p>
						<button
							on:click={() => submitStatus = 'idle'}
							class="px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors"
						>
							Intentar de nuevo
						</button>
					</div>
				{:else}
					<form on:submit={handleContactSubmit} class="space-y-6">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label for="name" class="block text-sm font-medium text-slate-300 mb-2">
									Nombre completo *
								</label>
								<input
									type="text"
									id="name"
									bind:value={contactForm.name}
									required
									class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									placeholder="Tu nombre"
								/>
							</div>

							<div>
								<label for="email" class="block text-sm font-medium text-slate-300 mb-2">
									Email corporativo *
								</label>
								<input
									type="email"
									id="email"
									bind:value={contactForm.email}
									required
									class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									placeholder="tu@empresa.com"
								/>
							</div>

							<div>
								<label for="company" class="block text-sm font-medium text-slate-300 mb-2">
									Empresa *
								</label>
								<input
									type="text"
									id="company"
									bind:value={contactForm.company}
									required
									class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									placeholder="Nombre de tu empresa"
								/>
							</div>

							<div>
								<label for="phone" class="block text-sm font-medium text-slate-300 mb-2">
									Teléfono
								</label>
								<input
									type="tel"
									id="phone"
									bind:value={contactForm.phone}
									class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
									placeholder="+52 55 1234 5678"
								/>
							</div>
						</div>

						<div>
							<label for="product" class="block text-sm font-medium text-slate-300 mb-2">
								Producto de interés *
							</label>
							<select
								id="product"
								bind:value={contactForm.product}
								required
								class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
							>
								<option value="">Selecciona un producto...</option>
								<option value="Caracol">Caracol - POS para Restaurantes</option>
								<option value="La Hoja">La Hoja - ERP para Retail</option>
								<option value="Cosmos Pet">Cosmos Pet - Software Veterinario</option>
								<option value="Camino CRM">Camino CRM - CRM con IA</option>
								<option value="Colectiva">Colectiva - Gateway de Pagos</option>
								<option value="Constanza">Constanza - Contabilidad con IA</option>
								<option value="Multiple">Múltiples productos</option>
							</select>
						</div>

						<div>
							<label for="message" class="block text-sm font-medium text-slate-300 mb-2">
								Cuéntanos sobre tu proyecto *
							</label>
							<textarea
								id="message"
								bind:value={contactForm.message}
								required
								rows="4"
								class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
								placeholder="¿Cuántas sucursales tienes? ¿Qué problemas buscas resolver? ¿Tienes un sistema actual?"
							></textarea>
						</div>

						<button
							type="submit"
							disabled={submitStatus === 'submitting'}
							class="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{#if submitStatus === 'submitting'}
								<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								<span>Enviando...</span>
							{:else}
								<span>Solicitar Demostración</span>
							{/if}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-slate-950 border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-12">
				<div class="col-span-1 md:col-span-2">
					<div class="flex items-center space-x-3 mb-6">
						<img src="/logo.svg" alt="Red Broom Software" class="w-10 h-10" />
						<div>
							<h3 class="text-xl font-bold text-white">Red Broom Software</h3>
							<p class="text-xs text-slate-400">S.A.S. de C.V.</p>
						</div>
					</div>
					<p class="text-slate-400 max-w-md">
						Construimos software empresarial de clase mundial para negocios mexicanos.
						Desde restaurantes hasta despachos contables, nuestras soluciones impulsan
						la eficiencia y el crecimiento.
					</p>
				</div>

				<div>
					<h4 class="font-semibold text-white mb-4">Productos</h4>
					<ul class="space-y-3 text-slate-400">
						<li><a href="https://caracol.redbroomsoftware.com" target="_blank" rel="noopener" class="hover:text-white transition-colors">Caracol (Restaurantes)</a></li>
						<li><a href="https://hoja.redbroomsoftware.com" target="_blank" rel="noopener" class="hover:text-white transition-colors">La Hoja (Retail)</a></li>
						<li><a href="https://cosmos.redbroomsoftware.com" target="_blank" rel="noopener" class="hover:text-white transition-colors">Cosmos Pet (Veterinarias)</a></li>
						<li><a href="https://camino.redbroomsoftware.com" target="_blank" rel="noopener" class="hover:text-white transition-colors">Camino CRM</a></li>
						<li><a href="https://colectiva.redbroomsoftware.com" target="_blank" rel="noopener" class="hover:text-white transition-colors">Colectiva (Pagos)</a></li>
						<li><a href="https://constanza.redbroomsoftware.com" target="_blank" rel="noopener" class="hover:text-white transition-colors">Constanza (Contabilidad)</a></li>
					</ul>
				</div>

				<div>
					<h4 class="font-semibold text-white mb-4">Contacto</h4>
					<ul class="space-y-3 text-slate-400">
						<li><a href="mailto:dia@redbroomsoftware.com" class="hover:text-white transition-colors">dia@redbroomsoftware.com</a></li>
						<li>Ciudad de México, México</li>
					</ul>

					<h4 class="font-semibold text-white mb-4 mt-8">Legal</h4>
					<ul class="space-y-3 text-slate-400">
						<li><a href="/privacidad" class="hover:text-white transition-colors">Aviso de Privacidad</a></li>
						<li><a href="/terminos" class="hover:text-white transition-colors">Términos de Servicio</a></li>
					</ul>
				</div>
			</div>

			<div class="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500">
				<p>© 2025 Red Broom Software S.A.S. de C.V. Todos los derechos reservados.</p>
				<div class="flex items-center gap-6 text-sm">
					<a href="/privacidad" class="hover:text-white transition-colors">Privacidad</a>
					<a href="/terminos" class="hover:text-white transition-colors">Términos</a>
					<a href="#faq" class="hover:text-white transition-colors">FAQ</a>
				</div>
			</div>
		</div>
	</footer>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
