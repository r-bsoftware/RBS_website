<script lang="ts">
	// Contact form state
	let contactForm = {
		name: '',
		email: '',
		company: '',
		phone: '',
		product: '',
		message: ''
	};
	let isSubmitting = false;
	let submitStatus: 'idle' | 'success' | 'error' = 'idle';
	let submitMessage = '';

	async function handleContactSubmit(event: Event) {
		event.preventDefault();
		isSubmitting = true;
		submitStatus = 'idle';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(contactForm)
			});

			const result = await response.json();

			if (response.ok) {
				submitStatus = 'success';
				submitMessage = result.message || '¡Gracias por contactarnos!';
				contactForm = { name: '', email: '', company: '', phone: '', product: '', message: '' };
			} else {
				submitStatus = 'error';
				submitMessage = result.message || 'Error al enviar el mensaje. Por favor intenta de nuevo.';
			}
		} catch {
			submitStatus = 'error';
			submitMessage = 'Error de conexión. Por favor intenta de nuevo.';
		} finally {
			isSubmitting = false;
		}
	}

	const products = [
		{
			name: 'Caracol',
			subtitle: 'Sistema POS para Restaurantes',
			description: 'Punto de venta completo con gestión de mesas, comandas a cocina en tiempo real, sistema de meseros, facturación CFDI 4.0 y reportes avanzados.',
			icon: '🍽️',
			tier: 'enterprise',
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
			subtitle: 'CRM con Automatización',
			description: 'CRM moderno con captura de leads, scoring automático con IA, pipeline de ventas, tickets de soporte y automatización de marketing.',
			icon: '🛤️',
			tier: 'standard',
			pricing: {
				setup: '$18,000',
				monthly: '$190/usuario',
				setupLabel: 'Implementación',
				monthlyLabel: 'por mes'
			},
			features: ['Lead scoring con IA', 'Pipeline de ventas', 'Tickets de soporte', 'Email automation', 'Integraciones', 'Reportes', 'API REST'],
			highlights: ['Fácil adopción', 'Integra todo', 'Sin límites']
		},
		{
			name: 'Colectiva',
			subtitle: 'Gateway de Pagos',
			description: 'Plataforma de pagos con CoDi, SPEI, tarjetas y monedero virtual. Integración completa con facturación y contabilidad automática.',
			icon: '💳',
			tier: 'enterprise',
			pricing: {
				setup: '$75,000',
				monthly: '0.8% + $3.50',
				setupLabel: 'Integración',
				monthlyLabel: 'por transacción'
			},
			features: ['CoDi en tiempo real', 'SPEI automatizado', 'Monedero virtual', 'Webhooks', 'Dashboard analytics', 'Conciliación automática', 'Multi-merchant'],
			highlights: ['99.9% uptime', 'PCI DSS', 'Liquidación 24h']
		},
		{
			name: 'Constanza',
			subtitle: 'Contabilidad con IA',
			description: 'Sistema de contabilidad electrónica con inteligencia artificial para optimización fiscal, CFDI 4.0, y cumplimiento SAT automatizado.',
			icon: '📊',
			tier: 'enterprise',
			pricing: {
				setup: '$45,000',
				monthly: '$590/contador',
				setupLabel: 'Implementación',
				monthlyLabel: 'por mes'
			},
			features: ['IA Fiscal', 'CFDI 4.0', 'Contabilidad SAT', 'IMSS/IDSE', 'Multi-empresa', 'Declaraciones', 'Auditoría'],
			highlights: ['Ahorro fiscal real', 'Cumplimiento 100%', 'Soporte fiscal']
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
</script>

<svelte:head>
	<title>Red Broom Software - Software Empresarial de Alto Rendimiento</title>
	<meta
		name="description"
		content="Soluciones de software empresarial para restaurantes, retail, veterinarias, pagos y contabilidad. Tecnología de clase mundial para negocios mexicanos."
	/>
</svelte:head>

<div class="min-h-screen bg-slate-950">
	<!-- Header -->
	<header class="bg-slate-950/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-3">
					<div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
						<span class="text-white font-bold text-xl">R</span>
					</div>
					<div>
						<h1 class="text-xl font-bold text-white">Red Broom Software</h1>
						<p class="text-xs text-slate-400">Enterprise Solutions</p>
					</div>
				</div>
				<nav class="hidden md:flex items-center space-x-8">
					<a href="#productos" class="text-slate-300 hover:text-white transition-colors">Productos</a>
					<a href="#porque" class="text-slate-300 hover:text-white transition-colors">Por qué RBS</a>
					<a href="#contacto" class="text-slate-300 hover:text-white transition-colors">Contacto</a>
					<a
						href="#contacto"
						class="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium"
					>
						Solicitar Demo
					</a>
				</nav>
			</div>
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

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{#each products as product}
					<div
						class="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-all group"
					>
						<div class="p-8">
							<!-- Header -->
							<div class="flex items-start justify-between mb-6">
								<div class="flex items-center gap-4">
									<div class="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
										{product.icon}
									</div>
									<div>
										<h3 class="text-2xl font-bold text-white">{product.name}</h3>
										<p class="text-slate-400 text-sm">{product.subtitle}</p>
									</div>
								</div>
								<span class="px-3 py-1 rounded-full text-xs font-semibold {getTierBadge(product.tier)}">
									{getTierLabel(product.tier)}
								</span>
							</div>

							<p class="text-slate-300 mb-6 leading-relaxed">{product.description}</p>

							<!-- Pricing -->
							<div class="bg-slate-800/50 rounded-xl p-5 mb-6">
								<div class="flex items-end gap-6">
									<div>
										<p class="text-xs text-slate-400 uppercase tracking-wide mb-1">{product.pricing.setupLabel}</p>
										<p class="text-2xl font-bold text-white">{product.pricing.setup}</p>
									</div>
									<div class="text-slate-600">+</div>
									<div>
										<p class="text-xs text-slate-400 uppercase tracking-wide mb-1">{product.pricing.monthlyLabel}</p>
										<p class="text-2xl font-bold text-white">{product.pricing.monthly}</p>
									</div>
								</div>
							</div>

							<!-- Features -->
							<div class="grid grid-cols-2 gap-2 mb-6">
								{#each product.features as feature}
									<div class="flex items-center gap-2 text-sm text-slate-300">
										<svg class="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
										</svg>
										{feature}
									</div>
								{/each}
							</div>

							<!-- Highlights -->
							<div class="flex flex-wrap gap-2 mb-6">
								{#each product.highlights as highlight}
									<span class="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium">
										{highlight}
									</span>
								{/each}
							</div>

							<!-- CTA -->
							<a
								href="#contacto"
								class="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-semibold"
							>
								Solicitar Demo de {product.name}
							</a>
						</div>
					</div>
				{/each}
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
						<h3 class="text-2xl font-bold text-white mb-2">¡Mensaje Enviado!</h3>
						<p class="text-slate-400 mb-8">{submitMessage}</p>
						<button
							on:click={() => submitStatus = 'idle'}
							class="px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors"
						>
							Enviar otro mensaje
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

						{#if submitStatus === 'error'}
							<div class="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
								<p class="text-red-400 text-sm">{submitMessage}</p>
							</div>
						{/if}

						<button
							type="submit"
							disabled={isSubmitting}
							class="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
						>
							{#if isSubmitting}
								<svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
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
						<div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
							<span class="text-white font-bold text-xl">R</span>
						</div>
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
						<li><a href="#productos" class="hover:text-white transition-colors">Caracol (Restaurantes)</a></li>
						<li><a href="#productos" class="hover:text-white transition-colors">La Hoja (Retail)</a></li>
						<li><a href="#productos" class="hover:text-white transition-colors">Cosmos Pet (Veterinarias)</a></li>
						<li><a href="#productos" class="hover:text-white transition-colors">Camino CRM</a></li>
						<li><a href="#productos" class="hover:text-white transition-colors">Colectiva (Pagos)</a></li>
						<li><a href="https://constanza.redbroomsoftware.com" class="hover:text-white transition-colors">Constanza (Contabilidad)</a></li>
					</ul>
				</div>

				<div>
					<h4 class="font-semibold text-white mb-4">Contacto</h4>
					<ul class="space-y-3 text-slate-400">
						<li>ventas@redbroomsoftware.com</li>
						<li>soporte@redbroomsoftware.com</li>
						<li>Ciudad de México, México</li>
					</ul>
				</div>
			</div>

			<div class="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
				<p>© 2025 Red Broom Software S.A.S. de C.V. Todos los derechos reservados.</p>
			</div>
		</div>
	</footer>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
