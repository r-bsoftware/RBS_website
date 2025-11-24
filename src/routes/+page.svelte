<script lang="ts">
	const products = [
		{
			name: 'Constanza',
			subtitle: 'Contabilidad Electrónica',
			description: 'Plataforma de contabilidad fiscal con IA para RESICO y Régimen General. CFDI 4.0, SAT, optimización fiscal con IA.',
			url: 'https://constanza-oyc4b548x-rbss-projects-204990eb.vercel.app',
			status: 'live',
			icon: '📊',
			features: ['CFDI 4.0', 'IA Fiscal', 'Contabilidad SAT', 'RESICO Optimizer']
		},
		{
			name: 'Caracol',
			subtitle: 'Restaurante POS',
			description: 'Sistema punto de venta para restaurantes con mesas, comandas, cocina y facturación automática.',
			url: '#contacto',
			status: 'live',
			icon: '🍽️',
			features: ['POS Completo', 'KDS Cocina', 'Mesas', 'Facturación']
		},
		{
			name: 'Colectiva',
			subtitle: 'Wallet Ecosistema',
			description: 'Cartera digital del ecosistema con CoDi, SPEI, pagos NFC y gestión multi-empresa.',
			url: '#contacto',
			status: 'development',
			icon: '💳',
			features: ['CoDi', 'SPEI', 'NFC', 'Multi-org']
		},
		{
			name: 'Banxico',
			subtitle: 'Procesador de Pagos',
			description: 'Microservicio de procesamiento de pagos CoDi, SPEI y conciliación bancaria para todo el ecosistema.',
			url: '#contacto',
			status: 'live',
			icon: '🏦',
			features: ['CoDi API', 'SPEI', 'Multi-FX', 'Infraestructura']
		},
		{
			name: 'La Hoja',
			subtitle: 'Café POS',
			description: 'POS ligero para cafetería con pedidos rápidos, programa de lealtad y gestión de inventario.',
			url: '#contacto',
			status: 'development',
			icon: '☕',
			features: ['POS Rápido', 'Lealtad', 'Pedidos', 'Inventario']
		},
		{
			name: 'Plenura',
			subtitle: 'Terapia & Wellness',
			description: 'Plataforma para terapeutas: gestión de citas, expedientes clínicos, facturación y recordatorios automáticos.',
			url: '#contacto',
			status: 'development',
			icon: '🧘',
			features: ['Agenda', 'Expedientes', 'Facturación', 'Recordatorios']
		}
	];

	const getStatusBadge = (status: string) => {
		switch (status) {
			case 'live':
				return 'bg-green-100 text-green-800';
			case 'development':
				return 'bg-blue-100 text-blue-800';
			case 'planning':
				return 'bg-gray-100 text-gray-600';
			default:
				return 'bg-gray-100 text-gray-600';
		}
	};

	const getStatusLabel = (status: string) => {
		switch (status) {
			case 'live':
				return 'En Vivo';
			case 'development':
				return 'En Desarrollo';
			case 'planning':
				return 'Planeado';
			default:
				return 'Próximamente';
		}
	};
</script>

<svelte:head>
	<title>Red Broom Software - Ecosistema de Soluciones Empresariales</title>
	<meta
		name="description"
		content="Suite de soluciones empresariales para contabilidad, pagos, restaurantes y más"
	/>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
	<!-- Header -->
	<header class="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-3">
					<div class="text-3xl">🧹</div>
					<div>
						<h1 class="text-2xl font-bold text-gray-900">Red Broom Software</h1>
						<p class="text-sm text-gray-600">S.A.S. de C.V.</p>
					</div>
				</div>
				<nav class="hidden md:flex items-center space-x-6">
					<a href="#productos" class="text-gray-700 hover:text-blue-600">Productos</a>
					<a href="#ecosistema" class="text-gray-700 hover:text-blue-600">Ecosistema</a>
					<a href="#contacto" class="text-gray-700 hover:text-blue-600">Contacto</a>
					<a
						href="https://constanza-oyc4b548x-rbss-projects-204990eb.vercel.app"
						class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						Acceder a Constanza
					</a>
				</nav>
			</div>
		</div>
	</header>

	<!-- Hero Section -->
	<section class="py-20 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto text-center">
			<h2 class="text-5xl font-bold text-gray-900 mb-6">
				Ecosistema de Soluciones
				<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
					Empresariales
				</span>
			</h2>
			<p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
				Plataforma integral de software para contabilidad, pagos, comercio y gestión empresarial.
				Todo conectado, todo sincronizado.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="https://constanza-oyc4b548x-rbss-projects-204990eb.vercel.app"
					class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium text-center"
				>
					Comenzar con Constanza
				</a>
				<a
					href="#productos"
					class="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-lg font-medium text-center"
				>
					Explorar Productos
				</a>
			</div>
		</div>
	</section>

	<!-- Products Section -->
	<section id="productos" class="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
		<div class="max-w-7xl mx-auto">
			<h2 class="text-4xl font-bold text-gray-900 mb-12 text-center">Nuestros Productos</h2>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each products as product}
					<div
						class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
					>
						<!-- Header -->
						<div
							class="bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white group-hover:from-blue-600 group-hover:to-purple-700 transition-all"
						>
							<div class="flex items-start justify-between mb-2">
								<span class="text-5xl">{product.icon}</span>
								<span
									class="px-3 py-1 rounded-full text-xs font-medium {getStatusBadge(product.status)}"
								>
									{getStatusLabel(product.status)}
								</span>
							</div>
							<h3 class="text-2xl font-bold mb-1">{product.name}</h3>
							<p class="text-blue-100 text-sm">{product.subtitle}</p>
						</div>

						<!-- Content -->
						<div class="p-6">
							<p class="text-gray-600 mb-4">{product.description}</p>

							<!-- Features -->
							<div class="flex flex-wrap gap-2 mb-4">
								{#each product.features as feature}
									<span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{feature}</span
									>
								{/each}
							</div>

							<!-- Action -->
							{#if product.status === 'live'}
								<a
									href={product.url}
									target="_blank"
									rel="noopener noreferrer"
									class="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
								>
									Acceder →
								</a>
							{:else}
								<button
									disabled
									class="w-full px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed"
								>
									Próximamente
								</button>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Ecosystem Architecture -->
	<section id="ecosistema" class="py-20 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<h2 class="text-4xl font-bold text-gray-900 mb-12 text-center">
				Arquitectura del Ecosistema
			</h2>

			<div class="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
					<!-- Architecture Diagram -->
					<div class="space-y-6">
						<h3 class="text-2xl font-bold text-gray-900 mb-4">Flujo de Datos</h3>

						<!-- Core -->
						<div class="text-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
							<p class="text-sm font-medium mb-1">Núcleo</p>
							<p class="text-2xl font-bold">Red Broom Software</p>
						</div>

						<!-- Layer 1: Core Services -->
						<div class="grid grid-cols-3 gap-4">
							<div class="p-4 bg-green-50 border-2 border-green-200 rounded-lg text-center">
								<p class="text-2xl mb-1">📊</p>
								<p class="text-sm font-medium text-green-900">Constanza</p>
								<p class="text-xs text-green-700">Contabilidad</p>
							</div>
							<div class="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg text-center">
								<p class="text-2xl mb-1">💳</p>
								<p class="text-sm font-medium text-blue-900">Colectiva</p>
								<p class="text-xs text-blue-700">Wallet</p>
							</div>
							<div class="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg text-center">
								<p class="text-2xl mb-1">🏦</p>
								<p class="text-sm font-medium text-purple-900">Banxico</p>
								<p class="text-xs text-purple-700">Pagos</p>
							</div>
						</div>

						<!-- Layer 2: Business Apps -->
						<div class="grid grid-cols-3 gap-4">
							<div class="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg text-center">
								<p class="text-2xl mb-1">🍽️</p>
								<p class="text-sm font-medium text-gray-900">Caracol</p>
								<p class="text-xs text-gray-700">Restaurante</p>
							</div>
							<div class="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg text-center">
								<p class="text-2xl mb-1">☕</p>
								<p class="text-sm font-medium text-gray-900">La Hoja</p>
								<p class="text-xs text-gray-700">Café</p>
							</div>
							<div class="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg text-center">
								<p class="text-2xl mb-1">🧘</p>
								<p class="text-sm font-medium text-gray-900">Plenura</p>
								<p class="text-xs text-gray-700">Terapia</p>
							</div>
						</div>

						<div class="text-center text-sm text-gray-600 pt-4 border-t">
							Todas las apps envían transacciones → Constanza genera facturación
						</div>
					</div>

					<!-- Key Features -->
					<div class="space-y-6">
						<h3 class="text-2xl font-bold text-gray-900 mb-4">Características Clave</h3>

						<div class="space-y-4">
							<div class="flex items-start space-x-3">
								<div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
									<span class="text-green-600">✓</span>
								</div>
								<div>
									<p class="font-medium text-gray-900">Integración Total</p>
									<p class="text-sm text-gray-600">
										Todos los productos comparten datos en tiempo real
									</p>
								</div>
							</div>

							<div class="flex items-start space-x-3">
								<div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
									<span class="text-blue-600">✓</span>
								</div>
								<div>
									<p class="font-medium text-gray-900">Cumplimiento Fiscal</p>
									<p class="text-sm text-gray-600">
										CFDI 4.0, contabilidad electrónica SAT, reportes fiscales
									</p>
								</div>
							</div>

							<div class="flex items-start space-x-3">
								<div class="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
									<span class="text-purple-600">✓</span>
								</div>
								<div>
									<p class="font-medium text-gray-900">IA y Automatización</p>
									<p class="text-sm text-gray-600">
										Clasificación inteligente, optimización fiscal con IA
									</p>
								</div>
							</div>

							<div class="flex items-start space-x-3">
								<div class="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
									<span class="text-orange-600">✓</span>
								</div>
								<div>
									<p class="font-medium text-gray-900">Multi-tenancy</p>
									<p class="text-sm text-gray-600">
										Gestión de múltiples entidades y consolidación contable
									</p>
								</div>
							</div>

							<div class="flex items-start space-x-3">
								<div class="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
									<span class="text-red-600">✓</span>
								</div>
								<div>
									<p class="font-medium text-gray-900">Pagos Modernos</p>
									<p class="text-sm text-gray-600">CoDi, SPEI, NFC, Open Banking con Belvo</p>
								</div>
							</div>

							<div class="flex items-start space-x-3">
								<div class="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
									<span class="text-indigo-600">✓</span>
								</div>
								<div>
									<p class="font-medium text-gray-900">SaaS Escalable</p>
									<p class="text-sm text-gray-600">
										Arquitectura Firebase + Vercel para miles de clientes
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
		<div class="max-w-4xl mx-auto text-center text-white">
			<h2 class="text-4xl font-bold mb-6">¿Listo para empezar?</h2>
			<p class="text-xl mb-8 text-blue-100">
				Constanza está en vivo. Empieza a gestionar tu contabilidad con IA hoy mismo.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="https://constanza-oyc4b548x-rbss-projects-204990eb.vercel.app"
					class="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium inline-flex items-center space-x-2 justify-center"
				>
					<span>Acceder a Constanza</span>
					<span>→</span>
				</a>
				<a
					href="#contacto"
					class="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors text-lg font-medium inline-flex items-center space-x-2 justify-center"
				>
					<span>Solicitar Demo</span>
					<span>→</span>
				</a>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer id="contacto" class="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div>
					<div class="flex items-center space-x-2 mb-4">
						<span class="text-2xl">🧹</span>
						<span class="text-xl font-bold">Red Broom Software</span>
					</div>
					<p class="text-gray-400">
						Suite de soluciones empresariales para el México moderno.
					</p>
				</div>

				<div>
					<h3 class="font-bold mb-4">Productos</h3>
					<ul class="space-y-2 text-gray-400">
						<li><a href="https://constanza-oyc4b548x-rbss-projects-204990eb.vercel.app" class="hover:text-white">Constanza (Contabilidad)</a></li>
						<li><span class="text-white">Caracol (Restaurantes)</span></li>
						<li><span class="text-gray-600">Colectiva (Próximamente)</span></li>
						<li><span class="text-gray-600">La Hoja (Próximamente)</span></li>
					</ul>
				</div>

				<div>
					<h3 class="font-bold mb-4">Contacto</h3>
					<ul class="space-y-2 text-gray-400">
						<li>soporte@redbroomsoftware.com</li>
						<li>México</li>
					</ul>
				</div>
			</div>

			<div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
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
