<script lang="ts">
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
			subtitle: 'ERP para Cafeterías y Retail',
			description: 'Sistema ERP completo para operaciones de retail: POS ultra-rápido, inventario FIFO, gestión de proveedores, programa de lealtad y analytics.',
			icon: '☕',
			status: 'live',
			url: 'https://hoja.redbroomsoftware.com',
			tech: ['SvelteKit', 'PostgreSQL', 'FIFO Inventory', 'WhatsApp API'],
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
			subtitle: 'CRM con IA Multicanal',
			description: 'CRM con agentes de IA que atienden WhatsApp y llamadas telefónicas automáticamente. Contexto unificado de cliente, lead scoring, pipeline de ventas.',
			icon: '🛤️',
			status: 'live',
			url: 'https://camino.redbroomsoftware.com',
			tech: ['SvelteKit', 'Supabase', 'OpenAI', 'Twilio', 'WhatsApp Cloud API'],
			highlights: ['Agente IA WhatsApp', 'Agente IA Voz', 'Lead scoring', 'Automatización total']
		},
		{
			name: 'Colectiva',
			subtitle: 'Gateway de Pagos + Hub de IA',
			description: 'Plataforma de pagos con CoDi, SPEI, tarjetas y monedero virtual. Centro de control para metrificación de IA del ecosistema.',
			icon: '💳',
			status: 'live',
			url: 'https://colectiva.redbroomsoftware.com',
			tech: ['SvelteKit', 'SPEI', 'CoDi', 'Open Banking'],
			highlights: ['Pagos en tiempo real', 'Multi-merchant', 'Conciliación automática', 'Dashboard analytics']
		},
		{
			name: 'Constanza',
			subtitle: 'Contabilidad Inteligente para Despachos',
			description: 'Plataforma multi-cliente para contadores: gestiona decenas de empresas desde un solo dashboard. IA fiscal, CFDI 4.0, DIOT automático.',
			icon: '📊',
			status: 'live',
			url: 'https://constanza.redbroomsoftware.com',
			tech: ['SvelteKit', 'Firebase', 'SAT APIs', 'AI Classification'],
			highlights: ['Multi-cliente', 'IA Fiscal', 'DIOT/Balanza automático', 'Consolidación grupos']
		},
		{
			name: 'Plenura',
			subtitle: 'Plataforma de Nutrición con IA',
			description: 'Sistema para nutriólogos con planes alimenticios generados por IA, tracking de pacientes, recetas personalizadas y recordatorios automáticos.',
			icon: '🥗',
			status: 'live',
			url: 'https://plenura.redbroomsoftware.com',
			tech: ['SvelteKit', 'Supabase', 'OpenAI', 'Meal Planning AI'],
			highlights: ['Planes con IA', 'Tracking de pacientes', 'Recetas personalizadas', 'Multi-nutriólogo']
		}
	];
</script>

<svelte:head>
	<title>Portafolio - Red Broom Software</title>
	<meta name="description" content="Portafolio de productos desarrollados por Red Broom Software: 7 plataformas SaaS en producción para PyMEs mexicanas." />
</svelte:head>

<div class="min-h-screen bg-slate-950">
	<!-- Header -->
	<header class="bg-slate-950/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<div class="flex items-center justify-between">
				<a href="/" class="flex items-center space-x-3">
					<img src="/logo.svg" alt="Red Broom Software" class="w-10 h-10" />
					<div>
						<h1 class="text-xl font-bold text-white">Red Broom Software</h1>
						<p class="text-xs text-slate-400">Enterprise Solutions</p>
					</div>
				</a>
				<nav class="hidden md:flex items-center space-x-8">
					<a href="/servicios" class="text-slate-300 hover:text-white transition-colors">Servicios</a>
					<a href="/portafolio" class="text-white font-medium">Portafolio</a>
					<a href="/tecnologia" class="text-slate-300 hover:text-white transition-colors">Tecnología</a>
					<a href="/contacto" class="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium">
						Contactar
					</a>
				</nav>
			</div>
		</div>
	</header>

	<!-- Hero -->
	<section class="py-20 px-4 sm:px-6 lg:px-8 relative">
		<div class="absolute inset-0 bg-gradient-to-b from-purple-600/10 via-transparent to-transparent"></div>
		<div class="max-w-7xl mx-auto text-center relative">
			<div class="inline-flex items-center px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300 mb-6">
				<span class="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
				7 productos en producción
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
							<span class="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
								Live
							</span>
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

	<!-- Stats -->
	<section class="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
		<div class="max-w-7xl mx-auto">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
				<div>
					<p class="text-4xl font-bold text-white">7</p>
					<p class="text-slate-400">Productos en producción</p>
				</div>
				<div>
					<p class="text-4xl font-bold text-white">5</p>
					<p class="text-slate-400">Industrias diferentes</p>
				</div>
				<div>
					<p class="text-4xl font-bold text-white">99.9%</p>
					<p class="text-slate-400">Uptime promedio</p>
				</div>
				<div>
					<p class="text-4xl font-bold text-white">24/7</p>
					<p class="text-slate-400">Soporte disponible</p>
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

	<!-- Footer -->
	<footer class="border-t border-slate-800 py-8 px-4">
		<div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
			<p class="text-slate-500 text-sm">© 2024 Red Broom Software S.A.S. de C.V.</p>
			<div class="flex items-center gap-6">
				<a href="/privacidad" class="text-slate-500 hover:text-slate-300 text-sm">Privacidad</a>
				<a href="/terminos" class="text-slate-500 hover:text-slate-300 text-sm">Términos</a>
			</div>
		</div>
	</footer>
</div>
