<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';

	const products = [
		{
			name: 'Caracol',
			subtitle: 'Sistema POS para Restaurantes',
			description: 'Punto de venta completo con gestión de mesas, comandas a cocina en tiempo real, sistema de meseros, facturación CFDI 4.0 y reportes avanzados.',
			icon: '🍽️',
			status: 'live',
			url: 'https://caracol.redbroomsoftware.com',
			tech: ['SvelteKit', 'Supabase', 'CFDI 4.0', 'Real-time sync'],
			highlights: ['Multi-terminal', 'KDS Cocina', 'Gestión de Meseros', 'Multi-sucursal']
		},
		{
			name: 'La Hoja',
			subtitle: 'ERP para Restaurantes y Retail',
			description: 'Sistema ERP completo para restaurantes y negocios de alimentos: POS ultra-rápido, inventario FIFO, gestión de proveedores, programa de lealtad y analytics.',
			icon: '🍽️',
			status: 'live',
			url: 'https://hoja.redbroomsoftware.com',
			tech: ['Next.js', 'Firebase', 'FIFO Inventory', 'WhatsApp API'],
			highlights: ['POS de alta velocidad', 'Programa de lealtad', 'Multi-sucursal', 'Analíticas avanzadas']
		},
		{
			name: 'Cosmos Pet',
			subtitle: 'Software para Veterinarias',
			description: 'Plataforma SaaS especializada para clínicas veterinarias: expedientes médicos SOAP, control de vacunas, agenda, estética canina y facturación.',
			icon: '🐾',
			status: 'live',
			url: 'https://cosmos.redbroomsoftware.com',
			tech: ['SvelteKit', 'Supabase', 'SOAP Records', 'Notifications'],
			highlights: ['Expedientes SOAP', 'Control de vacunas', 'Agenda inteligente', 'Multi-clínica']
		},
		{
			name: 'Camino CRM',
			subtitle: 'CRM con Agentes IA Multicanal',
			description: 'CRM con agentes de IA que atienden WhatsApp y llamadas telefónicas automáticamente. Contexto unificado de cliente, lead scoring, pipeline de ventas.',
			icon: '🛤️',
			status: 'live',
			agentBadge: 'Agentes IA',
			url: 'https://camino.redbroomsoftware.com',
			tech: ['SvelteKit', 'Supabase', 'Multi-provider AI', 'Twilio', 'WhatsApp Cloud API'],
			highlights: ['Agente IA WhatsApp', 'Agente IA Voz', 'Lead scoring', 'Automatización total']
		},
		{
			name: 'Colectiva',
			subtitle: 'Plataforma B2B de Pagos, Billing y Capital',
			description: 'Plataforma B2B multi-merchant: billing para el ecosistema RBS, gateway de pagos (CoDi, SPEI, MercadoPago), suscripciones, monedero virtual y mercado de CPIs para financiamiento colectivo. Incluye Oracle, el agente de BI del ecosistema.',
			icon: '💳',
			status: 'live',
			agentBadge: 'Oracle IA',
			url: 'https://colectiva.redbroomsoftware.com',
			tech: ['SvelteKit', 'SPEI', 'CoDi', 'MercadoPago', 'Polygon', 'Multi-provider AI'],
			highlights: ['Billing ecosistema', 'Mercado de CPIs', 'Oracle IA chat', 'Conciliación automática']
		},
		{
			name: 'Constanza',
			subtitle: 'Contabilidad Inteligente para Despachos',
			description: 'Plataforma multi-cliente para contadores: gestiona decenas de empresas desde un solo dashboard. IA fiscal, CFDI 4.0, DIOT automático.',
			icon: '📊',
			status: 'live',
			agentBadge: 'IA Fiscal',
			url: 'https://constanza.redbroomsoftware.com',
			tech: ['SvelteKit', 'Firebase', 'SAT APIs', 'AI Classification'],
			highlights: ['Multi-cliente', 'IA Fiscal', 'DIOT/Balanza automático', 'Consolidación grupos']
		},
		{
			name: 'Plenura',
			subtitle: 'Plataforma de Bienestar con IA',
			description: 'Sistema para profesionales de salud y bienestar: matching inteligente de pacientes, prescreening con IA, notas de sesión automatizadas, búsqueda semántica y gestión de citas.',
			icon: '🧘',
			status: 'live',
			agentBadge: 'Matching IA',
			url: 'https://plenura.redbroomsoftware.com',
			tech: ['SvelteKit', 'Supabase', 'Multi-provider AI', 'Smart Matching'],
			highlights: ['Matching con IA', 'Prescreening inteligente', 'Notas de sesión IA', 'Multi-profesional']
		},
		{
			name: 'Rito',
			subtitle: 'Real Estate Private Equity',
			description: 'Plataforma para fondos de inversión inmobiliaria: underwriting de deals, pro-formas, cascadas de distribución, gestión de inversionistas y reportes de performance.',
			icon: '🏢',
			status: 'live',
			agentBadge: 'Deal Copilot',
			url: 'https://rito.redbroomsoftware.com',
			tech: ['SvelteKit', 'Supabase', 'Claude AI', 'Financial Modeling'],
			highlights: ['Underwriting completo', 'Deal Copilot IA', 'Portal inversionistas', 'Análisis con IA']
		},
		{
			name: 'Agora',
			subtitle: 'Software Legal para Despachos',
			description: 'Plataforma completa para firmas legales: gestión de casos, control de horas, cuentas trust IOLTA, facturación, documentos con IA y calendario judicial.',
			icon: '⚖️',
			status: 'live',
			agentBadge: 'Doc IA',
			url: 'https://agora.redbroomsoftware.com',
			tech: ['SvelteKit', 'Supabase', 'Trust Accounting', 'AI Documents'],
			highlights: ['Gestión de casos', 'Cuentas Trust IOLTA', 'Control de tiempo', 'IA para documentos']
		},
		{
			name: 'Mancha',
			subtitle: 'Reservaciones para Restaurantes',
			description: 'Plataforma estilo OpenTable para restaurantes mexicanos: reservaciones en línea, gestión de mesas, confirmaciones automáticas por email y WhatsApp, y analytics de ocupación.',
			icon: '🪑',
			status: 'live',
			url: 'https://mancha.redbroomsoftware.com',
			tech: ['SvelteKit', 'Supabase', 'Camino API', 'Real-time'],
			highlights: ['Reservaciones 24/7', 'Confirmaciones automáticas', 'Gestión de mesas', 'Widget embebible']
		},
		{
			name: 'Cookie Monster',
			subtitle: 'E-commerce para Panaderías',
			description: 'Plataforma de comercio electrónico para panaderías y repostería artesanal: catálogo, carrito, pedidos personalizados, checkout y gestión de entregas.',
			icon: '🍪',
			status: 'live',
			url: 'https://cookiemonster.redbroomsoftware.com',
			tech: ['SvelteKit', 'Supabase', 'Stripe', 'Colectiva API'],
			highlights: ['Pedidos personalizados', 'Checkout integrado', 'Gestión de entregas', 'Catálogo visual']
		},
		{
			name: 'Continua',
			subtitle: 'Plataforma de Donación de Sangre',
			description: 'Conecta donadores con hospitales: registro de donadores, emergencias activas, historial de donaciones, notificaciones por tipo de sangre.',
			icon: '🩸',
			status: 'live',
			url: 'https://continua.redbroomsoftware.com',
			tech: ['SvelteKit', 'Supabase', 'Geolocation', 'Push Notifications'],
			highlights: ['Emergencias en tiempo real', 'Matching por tipo', 'Historial de donaciones', 'Alertas hospitales']
		},
		{
			name: 'Puppy Love',
			subtitle: 'Matching para Mascotas',
			description: 'Plataforma de matching para dueños de mascotas: encuentra compañeros de juego, parejas para cría responsable, y adopción. Perfiles verificados.',
			icon: '🐕',
			status: 'live',
			url: 'https://puppylove.redbroomsoftware.com',
			tech: ['SvelteKit', 'Supabase', 'Matching Algorithm', 'Chat'],
			highlights: ['Matching inteligente', 'Perfiles verificados', 'Chat integrado', 'Suscripción premium']
		},
		{
			name: 'Baul',
			subtitle: 'Almacenamiento y Bodegas',
			description: 'Renta de espacios de almacenamiento: mini-bodegas, pallets, gestión de inventario, recolección y entrega a domicilio.',
			icon: '📦',
			status: 'live',
			url: 'https://baul.redbroomsoftware.com',
			tech: ['SvelteKit', 'Supabase', 'Inventory Management', 'Logistics'],
			highlights: ['Multi-tamaño', 'Recolección a domicilio', 'Control de acceso', 'Inventario digital']
		},
		{
			name: 'Servilleta',
			subtitle: 'Marketplace de Servicios',
			description: 'Conecta clientes con taskers verificados para limpieza, mudanzas, reparaciones y más. Reviews, pagos seguros y garantía de servicio.',
			icon: '🧹',
			status: 'live',
			url: 'https://servilleta.redbroomsoftware.com',
			tech: ['SvelteKit', 'Supabase', 'Colectiva API', 'Geolocation'],
			highlights: ['Taskers verificados', 'Pagos seguros', 'Reviews', 'Garantía de servicio']
		},
		{
			name: 'Hospitality Fiscal',
			subtitle: 'Alquiler Vacacional Inteligente',
			description: 'Plataforma de renta vacacional con modelo fiscal optimizado: propiedades, reservaciones, servicios bajo demanda y gestión de limpieza.',
			icon: '🏖️',
			status: 'live',
			url: 'https://hospitality.redbroomsoftware.com',
			tech: ['SvelteKit', 'Supabase', 'Booking Engine', 'Fiscal Optimization'],
			highlights: ['Modelo fiscal inteligente', 'Limpieza bajo demanda', 'Multi-propiedad', 'Gestión de huéspedes']
		}
	];

	// B2C Services - Managed services we offer directly to businesses
	const b2cServices = [
		{
			name: 'Constanza Servicios',
			subtitle: 'Contabilidad Administrada',
			description: 'Tu departamento de contabilidad completo: declaraciones, CFDI 4.0, DIOT, Balanza, IMSS - todo resuelto por expertos. Desde $8,900/mes.',
			icon: '📊',
			status: 'live',
			url: 'https://constanza.redbroomsoftware.com/servicios',
			highlights: ['Cumplimiento SAT 100%', 'Contador asignado', 'Multi-régimen', 'Sin complicaciones']
		},
		{
			name: 'Camino Servicios',
			subtitle: 'Marketing Administrado',
			description: 'Tu departamento de marketing completo: redes sociales, campañas, WhatsApp IA, publicidad digital y analytics. Desde $5,900/mes.',
			icon: '📣',
			status: 'live',
			url: 'https://camino.redbroomsoftware.com/servicios',
			highlights: ['Redes sociales 24/7', 'WhatsApp IA', 'Campañas automatizadas', 'Publicidad digital']
		},
		{
			name: 'Colectiva Servicios',
			subtitle: 'Tesorería Administrada',
			description: 'Cobranza, dispersiones SPEI, nómina integrada y tesorería completamente administrada. Desde $3,900/mes.',
			icon: '💳',
			status: 'live',
			url: 'https://colectiva.redbroomsoftware.com/servicios',
			highlights: ['Cobranza CoDi/SPEI', 'Dispersiones masivas', 'Nómina integrada', 'Conciliación automática']
		},
		{
			name: 'Atención al Cliente IA',
			subtitle: 'Ecosistema Completo',
			description: 'Agentes IA que atienden WhatsApp y llamadas 24/7 para cualquier negocio: restaurantes, veterinarias, clínicas, retail. Integra con todo el ecosistema.',
			icon: '🤖',
			status: 'live',
			url: 'https://camino.redbroomsoftware.com',
			highlights: ['Multi-industria', 'WhatsApp + Voz', 'Integra con Mancha', 'Contexto unificado']
		},
		{
			name: 'Mancha Servicios',
			subtitle: 'Reservaciones Universal',
			description: 'Sistema de citas y reservaciones para cualquier negocio: restaurantes, veterinarias, clínicas, salones, estudios. Confirmaciones automáticas y widget embebible.',
			icon: '📅',
			status: 'coming_soon',
			url: 'https://mancha.redbroomsoftware.com',
			highlights: ['Multi-industria', 'IA predictiva', 'Confirmaciones auto', 'Widget embebible']
		}
	];
</script>

<svelte:head>
	<title>Portafolio - Red Broom Software</title>
	<meta name="description" content="Portafolio de productos desarrollados por Red Broom Software: 16 plataformas SaaS + 5 servicios B2C para PyMEs mexicanas." />
	<link rel="canonical" href="https://redbroomsoftware.com/portafolio" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://redbroomsoftware.com/portafolio" />
	<meta property="og:title" content="Portafolio - Red Broom Software" />
	<meta property="og:description" content="16 plataformas SaaS + 5 servicios B2C para PyMEs mexicanas. POS, ERP, CRM, FinTech, IA y más." />
	<meta property="og:image" content="https://redbroomsoftware.com/logo.svg" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<!-- Hero -->
<section class="py-20 px-4 sm:px-6 lg:px-8 relative">
	<div class="absolute inset-0 bg-gradient-to-b from-purple-600/10 via-transparent to-transparent"></div>
	<div class="max-w-7xl mx-auto text-center relative">
		<div class="inline-flex items-center px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300 mb-6">
			<span class="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
			16 plataformas + 5 servicios B2C
		</div>
		<h2 class="text-4xl md:text-6xl font-bold text-white mb-6">
			Nuestro <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Portafolio</span>
		</h2>
		<p class="text-xl text-slate-400 max-w-3xl mx-auto">
			Plataformas SaaS que hemos desarrollado y operamos. Cada una resuelve problemas reales de negocios mexicanos.
		</p>
	</div>
</section>

<!-- Products Grid -->
<section class="py-16 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			{#each products as product}
				<article class="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 group">
					<div class="flex items-start justify-between mb-4">
						<div class="flex items-center gap-4">
							<div class="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
								{product.icon}
							</div>
							<div>
								<h3 class="text-xl font-bold text-white">{product.name}</h3>
								<p class="text-sm text-purple-400">{product.subtitle}</p>
							</div>
						</div>
						<div class="flex flex-col items-end gap-1">
							<span class="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
								Live
							</span>
							{#if product.agentBadge}
								<span class="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium">
									🤖 {product.agentBadge}
								</span>
							{/if}
						</div>
					</div>

					<p class="text-slate-400 text-sm mb-4">{product.description}</p>

					<!-- Tech Stack -->
					<div class="flex flex-wrap gap-2 mb-4">
						{#each product.tech as tech}
							<span class="px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs">{tech}</span>
						{/each}
					</div>

					<!-- Highlights -->
					<ul class="grid grid-cols-2 gap-2 mb-4">
						{#each product.highlights as highlight}
							<li class="flex items-center text-sm text-slate-300">
								<svg class="w-4 h-4 text-purple-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								{highlight}
							</li>
						{/each}
					</ul>

					<a href={product.url} target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm font-medium">
						Visitar producto
						<svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
						</svg>
					</a>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- B2C Services Section -->
<section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-emerald-950/20 to-slate-950">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-12">
			<div class="inline-flex items-center px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-sm text-emerald-300 mb-6">
				Nuevo
			</div>
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
				Servicios <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">B2C</span>
			</h2>
			<p class="text-xl text-slate-400 max-w-2xl mx-auto">
				Además de software, operamos servicios directos para empresas que prefieren solución llave en mano.
			</p>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			{#each b2cServices as service}
				<article class="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10 group">
					<div class="flex items-start justify-between mb-4">
						<div class="flex items-center gap-4">
							<div class="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
								{service.icon}
							</div>
							<div>
								<h3 class="text-xl font-bold text-white">{service.name}</h3>
								<p class="text-sm text-emerald-400">{service.subtitle}</p>
							</div>
						</div>
						{#if service.status === 'live'}
							<span class="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
								Servicio Activo
							</span>
						{:else}
							<span class="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium">
								Próximamente
							</span>
						{/if}
					</div>

					<p class="text-slate-400 text-sm mb-4">{service.description}</p>

					<!-- Highlights -->
					<ul class="grid grid-cols-2 gap-2 mb-4">
						{#each service.highlights as highlight}
							<li class="flex items-center text-sm text-slate-300">
								<svg class="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								{highlight}
							</li>
						{/each}
					</ul>

					{#if service.status === 'live'}
						<a href={service.url} target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-emerald-400 hover:text-emerald-300 text-sm font-medium">
							Conocer servicio
							<svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
							</svg>
						</a>
					{:else}
						<span class="inline-flex items-center text-slate-500 text-sm">
							Disponible pronto
						</span>
					{/if}
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- Stats -->
<section class="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
	<div class="max-w-7xl mx-auto">
		<div class="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
			<div>
				<p class="text-4xl font-bold text-white">16</p>
				<p class="text-slate-400">Productos SaaS</p>
			</div>
			<div>
				<p class="text-4xl font-bold text-white">5</p>
				<p class="text-slate-400">Servicios B2C</p>
			</div>
			<div>
				<p class="text-4xl font-bold text-white">10+</p>
				<p class="text-slate-400">Industrias</p>
			</div>
			<div>
				<p class="text-4xl font-bold text-white">99.9%</p>
				<p class="text-slate-400">Uptime</p>
			</div>
			<div>
				<p class="text-4xl font-bold text-white">24/7</p>
				<p class="text-slate-400">Soporte</p>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="py-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-3xl mx-auto text-center">
		<h3 class="text-3xl font-bold text-white mb-4">¿Tu producto aquí?</h3>
		<p class="text-slate-400 mb-8">Podemos desarrollar la próxima plataforma para tu industria.</p>
		<a href="/contacto" class="inline-flex px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all font-semibold">
			Platiquemos
		</a>
	</div>
</section>

<Footer />
