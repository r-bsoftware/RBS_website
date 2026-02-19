<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';

	const services = [
		{
			title: 'Desarrollo SaaS',
			subtitle: 'Plataformas multi-tenant de alto rendimiento',
			description: 'Construimos aplicaciones SaaS con arquitectura multi-tenant, billing automatizado, y escalabilidad horizontal. Experiencia en Stripe, SPEI, CoDi y Open Banking.',
			icon: '☁️',
			features: ['Multi-tenancy nativo', 'Billing recurrente', 'API REST + Webhooks', 'White-labeling']
		},
		{
			title: 'Sistemas POS & ERP',
			subtitle: 'Software operacional para PyMEs',
			description: 'Puntos de venta, inventarios, control de caja, comandas en tiempo real. Integración con SAT para facturación CFDI 4.0 y cumplimiento fiscal mexicano.',
			icon: '🏪',
			features: ['CFDI 4.0 integrado', 'Sincronización offline', 'Multi-sucursal', 'Reportes fiscales']
		},
		{
			title: 'CRM con IA',
			subtitle: 'Automatización de ventas y marketing',
			description: 'CRMs con lead scoring, agentes de IA para WhatsApp y llamadas telefónicas, pipelines de ventas, y automatización de nurturing.',
			icon: '🤖',
			features: ['Agentes IA multicanal', 'Lead scoring automático', 'Automatización de citas', 'Analytics de conversión']
		},
		{
			title: 'Integraciones FinTech',
			subtitle: 'Open Banking, pagos y conciliación',
			description: 'Conectamos tu sistema con Fintoc, Belvo, Stripe, SPEI, CoDi. Conciliación automática de transacciones bancarias.',
			icon: '🏦',
			features: ['Open Banking', 'Pagos SPEI/CoDi', 'Conciliación automática', 'Multi-merchant']
		},
		{
			title: 'Aplicaciones Móviles',
			subtitle: 'Flutter cross-platform',
			description: 'Apps nativas para iOS y Android con una sola base de código. Sincronización en tiempo real, notificaciones push, y modo offline.',
			icon: '📱',
			features: ['iOS + Android', 'Sync en tiempo real', 'Modo offline', 'Push notifications']
		},
		{
			title: 'Consultoría Técnica',
			subtitle: 'Arquitectura y optimización',
			description: 'Revisión de arquitectura, optimización de performance, migración de sistemas legacy, y capacitación de equipos técnicos.',
			icon: '🎯',
			features: ['Code review', 'Migración de datos', 'Performance tuning', 'Capacitación']
		}
	];
</script>

<svelte:head>
	<title>Servicios de Desarrollo - Red Broom Software</title>
	<meta name="description" content="Desarrollo de software empresarial: SaaS, POS, ERP, CRM con IA, integraciones FinTech y aplicaciones móviles. Especialistas en soluciones para México." />
	<link rel="canonical" href="https://redbroomsoftware.com/servicios" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://redbroomsoftware.com/servicios" />
	<meta property="og:title" content="Servicios de Desarrollo - Red Broom Software" />
	<meta property="og:description" content="Desarrollo de software empresarial: SaaS, POS, ERP, CRM con IA, integraciones FinTech y aplicaciones móviles." />
	<meta property="og:image" content="https://redbroomsoftware.com/logo.svg" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<!-- Hero -->
<section class="py-20 px-4 sm:px-6 lg:px-8 relative">
	<div class="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent"></div>
	<div class="max-w-7xl mx-auto text-center relative">
		<h2 class="text-4xl md:text-6xl font-bold text-white mb-6">
			¿Qué podemos <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">construir</span> para ti?
		</h2>
		<p class="text-xl text-slate-400 max-w-3xl mx-auto">
			Desarrollamos software empresarial de alto rendimiento. Desde sistemas POS hasta plataformas SaaS con IA.
		</p>
	</div>
</section>

<!-- Services Grid -->
<section class="py-16 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each services as service}
				<article class="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10">
					<div class="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center text-3xl mb-4">
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
		<h3 class="text-3xl font-bold text-white text-center mb-12">Nuestro Proceso</h3>
		<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
			<div class="text-center">
				<div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">1</div>
				<h4 class="text-white font-semibold mb-2">Discovery</h4>
				<p class="text-slate-400 text-sm">Entendemos tu negocio, procesos y objetivos</p>
			</div>
			<div class="text-center">
				<div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">2</div>
				<h4 class="text-white font-semibold mb-2">Diseño</h4>
				<p class="text-slate-400 text-sm">Arquitectura técnica y prototipos</p>
			</div>
			<div class="text-center">
				<div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">3</div>
				<h4 class="text-white font-semibold mb-2">Desarrollo</h4>
				<p class="text-slate-400 text-sm">Sprints iterativos con demos frecuentes</p>
			</div>
			<div class="text-center">
				<div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">4</div>
				<h4 class="text-white font-semibold mb-2">Launch</h4>
				<p class="text-slate-400 text-sm">Deployment, capacitación y soporte</p>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="py-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-3xl mx-auto text-center">
		<h3 class="text-3xl font-bold text-white mb-4">¿Listo para construir?</h3>
		<p class="text-slate-400 mb-8">Cuéntanos sobre tu proyecto y te daremos una propuesta en 48 horas.</p>
		<a href="/contacto" class="inline-flex px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-semibold">
			Solicitar Cotización
		</a>
	</div>
</section>

<Footer />
