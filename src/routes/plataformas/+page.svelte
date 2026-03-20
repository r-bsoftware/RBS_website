<script>
	import Footer from '$lib/components/Footer.svelte';

	let { data } = $props();

	function scrollReveal(node, params = {}) {
		const { delay = 0, threshold = 0.15 } = params;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setTimeout(() => node.classList.add('visible'), delay);
						observer.unobserve(node);
					}
				});
			},
			{ threshold }
		);
		observer.observe(node);
		return { destroy() { observer.disconnect(); } };
	}

	// Extract content blocks from Camino API response, or use defaults
	const content = data.content?.page?.content || [];

	function getBlock(id) {
		return content.find(b => b.id === id)?.data;
	}

	// Defaults for when Camino API is unavailable
	const heroData = getBlock('hero-main') || {
		title: 'Soluciones para tu',
		title_highlight: 'Negocio',
		subtitle: 'Cada plataforma resuelve un problema real. Usa las que necesites — entre más uses, más ahorras.',
		cta_primary: { text: 'Explorar Plataformas', href: '#plataformas' },
		cta_secondary: { text: 'Cotización Personalizada', href: '/contacto' }
	};

	const bannerData = getBlock('bundle-discount') || {
		title: 'Descuento multi-app',
		subtitle: 'automático al suscribirte a más de una plataforma',
		description: 'Los descuentos aplican sobre la suscripción base. Sin códigos, sin trámites.',
		items: [
			{ label: '2 apps', value: '5%' },
			{ label: '3 apps', value: '10%' },
			{ label: '4+ apps', value: '15%' }
		]
	};

	const gridData = getBlock('plataformas-grid') || {
		title: 'Nuestras Plataformas',
		subtitle: 'Cada una con su propio precio justo, diseñada para resolver un problema específico.',
		platforms: defaultPlatforms()
	};

	const ctaData = getBlock('enterprise-cta') || {
		title: '¿Necesitas una solución a medida?',
		subtitle: 'Para empresas con múltiples sucursales, integraciones personalizadas o volúmenes altos — diseñamos paquetes a medida con precios preferenciales y soporte dedicado.',
		cta_primary: { text: 'Cotización Personalizada', href: '/contacto' },
		cta_secondary: { text: 'Empezar con Prueba Gratis', href: 'https://camino.redbroomsoftware.com/register?utm_source=rbs_website&utm_medium=plataformas_enterprise' }
	};

	function defaultPlatforms() {
		return [
			{ id: 'caracol', name: 'Caracol POS', tagline: 'Punto de venta para restaurantes y bares', pricing: '$425/usuario/mes', features: ['CFDI 4.0 en punto de venta', 'Control de inventario y añadas', 'Modo mostrador rápido'], color: 'amber', cta_href: 'https://camino.redbroomsoftware.com/register?app=caracol&utm_source=rbs_website&utm_medium=plataformas' },
			{ id: 'comal', name: 'Comal', tagline: 'Tu tienda en línea — en pesos, con facturación', pricing: 'Desde $399/mes', features: ['Vs Shopify: $399 vs $600+ MXN', 'Clubs de suscripción incluidos', 'CFDI automático por venta'], color: 'rose', cta_href: 'https://camino.redbroomsoftware.com/register?app=comal&utm_source=rbs_website&utm_medium=plataformas' },
			{ id: 'constanza', name: 'Constanza', tagline: 'Facturación CFDI y contabilidad fiscal', pricing: 'Desde $590/mes', features: ['Timbrado CFDI con clasificación IA', 'Conciliación bancaria automática', 'RESICO Guardian (optimizador fiscal)'], color: 'purple', cta_href: 'https://camino.redbroomsoftware.com/register?app=constanza&utm_source=rbs_website&utm_medium=plataformas' },
			{ id: 'plenura', name: 'Plenura', tagline: 'Marketplace de bienestar y terapia', pricing: 'Desde $299/mes + comisión', features: ['Escrow protege a ambas partes', '5 herramientas de IA clínica', 'Video sesiones integradas'], color: 'teal', cta_href: 'https://camino.redbroomsoftware.com/register?app=plenura&utm_source=rbs_website&utm_medium=plataformas' },
			{ id: 'rito', name: 'Rito', tagline: 'Capital privado inmobiliario', pricing: 'Desde $2,499/mes', features: ['AI Copilot para análisis de deals', 'Portal LP con capital calls', 'Cumplimiento fiscal mexicano nativo'], color: 'indigo', cta_href: 'https://camino.redbroomsoftware.com/register?app=rito&utm_source=rbs_website&utm_medium=plataformas' },
			{ id: 'agora', name: 'Agora', tagline: 'Gestión de despachos jurídicos', pricing: 'Próximamente', features: ['IOLTA trust accounting', 'Redacción IA con plantillas MX', 'Ghost timer para tiempo facturable'], color: 'sky', cta_href: 'https://camino.redbroomsoftware.com/register?app=agora&utm_source=rbs_website&utm_medium=plataformas' },
			{ id: 'la-hoja', name: 'La Hoja', tagline: 'ERP para cafeterías y panaderías', pricing: 'Desde $499/mes', features: ['Inventario FIFO para perecederos', 'Gestión multi-sucursal', 'Reportes operativos en tiempo real'], color: 'lime', cta_href: 'https://camino.redbroomsoftware.com/register?app=la-hoja&utm_source=rbs_website&utm_medium=plataformas' },
			{ id: 'mancha', name: 'Mancha', tagline: 'Reservaciones para restaurantes', pricing: 'Desde $12/cubierto', features: ['Integración nativa con Caracol POS', 'Booking por WhatsApp con IA', 'Pricing dinámico por demanda'], color: 'orange', cta_href: 'https://camino.redbroomsoftware.com/register?app=mancha&utm_source=rbs_website&utm_medium=plataformas' },
			{ id: 'cosmos-pet', name: 'Cosmos Pet', tagline: 'Gestión de clínicas veterinarias', pricing: 'Desde $599/mes', features: ['Expediente clínico digital', 'Inventario veterinario', 'Facturación CFDI integrada'], color: 'cyan', cta_href: 'https://camino.redbroomsoftware.com/register?app=cosmos-pet&utm_source=rbs_website&utm_medium=plataformas' }
		];
	}

	// Color map for Tailwind (static classes for purging)
	const colors = {
		amber:  { text: 'text-amber-400',  border: 'hover:border-amber-500/50',  shadow: 'hover:shadow-amber-500/10' },
		rose:   { text: 'text-rose-400',   border: 'hover:border-rose-500/50',   shadow: 'hover:shadow-rose-500/10' },
		purple: { text: 'text-purple-400', border: 'hover:border-purple-500/50', shadow: 'hover:shadow-purple-500/10' },
		teal:   { text: 'text-teal-400',   border: 'hover:border-teal-500/50',   shadow: 'hover:shadow-teal-500/10' },
		indigo: { text: 'text-indigo-400', border: 'hover:border-indigo-500/50', shadow: 'hover:shadow-indigo-500/10' },
		sky:    { text: 'text-sky-400',    border: 'hover:border-sky-500/50',    shadow: 'hover:shadow-sky-500/10' },
		lime:   { text: 'text-lime-400',   border: 'hover:border-lime-500/50',   shadow: 'hover:shadow-lime-500/10' },
		orange: { text: 'text-orange-400', border: 'hover:border-orange-500/50', shadow: 'hover:shadow-orange-500/10' },
		cyan:   { text: 'text-cyan-400',   border: 'hover:border-cyan-500/50',   shadow: 'hover:shadow-cyan-500/10' },
		blue:   { text: 'text-blue-400',   border: 'hover:border-blue-500/50',   shadow: 'hover:shadow-blue-500/10' },
		emerald:{ text: 'text-emerald-400',border: 'hover:border-emerald-500/50',shadow: 'hover:shadow-emerald-500/10' }
	};

	function c(color) { return colors[color] || colors.blue; }
</script>

<svelte:head>
	<title>Plataformas — Red Broom Software</title>
	<meta name="description" content="Plataformas SaaS integradas para empresas mexicanas. Punto de venta, e-commerce, facturación, CRM y más. Precios en pesos." />
</svelte:head>

<!-- Hero -->
<section class="py-20 px-4 sm:px-6 lg:px-8 relative">
	<div class="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent"></div>
	<div class="max-w-7xl mx-auto text-center relative">
		<h1 class="text-4xl md:text-6xl font-bold text-white mb-6" use:scrollReveal>
			{heroData.title} <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{heroData.title_highlight}</span>
		</h1>
		<p class="text-xl text-slate-400 max-w-3xl mx-auto mb-8" use:scrollReveal={{ delay: 100 }}>
			{heroData.subtitle}
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center" use:scrollReveal={{ delay: 200 }}>
			<a href={heroData.cta_primary.href} class="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all rounded-xl px-8 py-4 font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40" data-camino-cta="hero-primary">
				{heroData.cta_primary.text}
			</a>
			<a href={heroData.cta_secondary.href} class="glass text-white hover:bg-slate-800/80 transition-all rounded-xl px-8 py-4 font-semibold" data-camino-cta="hero-secondary">
				{heroData.cta_secondary.text}
			</a>
		</div>
	</div>
</section>

<!-- Bundle Discount Banner -->
<section class="px-4 sm:px-6 lg:px-8 -mt-8 mb-16">
	<div class="max-w-4xl mx-auto" use:scrollReveal={{ delay: 200 }}>
		<div class="glass rounded-2xl p-6 md:p-8 border border-emerald-500/20">
			<div class="flex flex-col md:flex-row items-center gap-6">
				<div class="flex-1">
					<h3 class="text-lg font-semibold text-white mb-2">
						<span class="text-emerald-400">{bannerData.title}</span> — {bannerData.subtitle}
					</h3>
					<p class="text-slate-400 text-sm">{bannerData.description}</p>
				</div>
				<div class="flex gap-4">
					{#each bannerData.items as item}
						<div class="text-center">
							<div class="text-2xl font-bold text-emerald-400">{item.value}</div>
							<div class="text-xs text-slate-500">{item.label}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Platforms Grid -->
<section id="plataformas" class="py-16 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		<div class="mb-10" use:scrollReveal>
			<h2 class="text-3xl font-bold text-white mb-2">{gridData.title}</h2>
			<p class="text-slate-400">{gridData.subtitle}</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each gridData.platforms as platform, i}
				<div
					class="glass rounded-2xl p-6 {c(platform.color).border} {c(platform.color).shadow} transition-all hover:shadow-lg flex flex-col"
					use:scrollReveal={{ delay: i * 80 }}
				>
					<div class="mb-4">
						<h3 class="text-lg font-bold text-white">{platform.name}</h3>
						<p class="text-sm text-slate-400 mt-1">{platform.tagline}</p>
					</div>
					<div class="mb-4">
						<span class="text-xl font-bold {c(platform.color).text}">{platform.pricing}</span>
					</div>
					<ul class="space-y-2 mb-6 flex-1">
						{#each platform.features as feature}
							<li class="flex items-start gap-2 text-sm text-slate-300">
								<svg class="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
								{feature}
							</li>
						{/each}
					</ul>
					<a
						href={platform.cta_href}
						class="block text-center glass text-white hover:bg-slate-800/80 transition-all rounded-xl px-6 py-3 font-semibold text-sm"
						data-camino-cta="platform-{platform.id}"
					>
						Prueba Gratis
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Enterprise CTA -->
<section class="py-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-4xl mx-auto text-center" use:scrollReveal>
		<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
			{ctaData.title.split(' ').slice(0, -3).join(' ')} <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{ctaData.title.split(' ').slice(-3).join(' ')}</span>
		</h2>
		<p class="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">{ctaData.subtitle}</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a href={ctaData.cta_primary.href} class="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all rounded-xl px-8 py-4 font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40" data-camino-cta="enterprise-primary">
				{ctaData.cta_primary.text}
			</a>
			<a href={ctaData.cta_secondary.href} class="glass text-white hover:bg-slate-800/80 transition-all rounded-xl px-8 py-4 font-semibold" data-camino-cta="enterprise-secondary">
				{ctaData.cta_secondary.text}
			</a>
		</div>
	</div>
</section>

<Footer />
