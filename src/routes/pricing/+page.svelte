<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal';

	const plans = [
		{
			id: 'starter',
			name: 'Starter',
			price: '$499',
			period: 'MXN/mes',
			features: [
				'1 app incluida (elige cualquiera)',
				'SSO (Camino) incluido',
				'CFDI basico (5 timbres/mes)',
				'Soporte por email'
			],
			cta: 'Empezar Prueba Gratis (30 dias)',
			href: 'https://camino.redbroomsoftware.com/register?plan=starter&utm_source=rbs_website&utm_medium=pricing_page',
			highlighted: false
		},
		{
			id: 'profesional',
			name: 'Profesional',
			price: '$1,499',
			period: 'MXN/mes',
			badge: 'Recomendado',
			features: [
				'3 apps incluidas',
				'SSO + CRM (Camino) incluido',
				'CFDI completo (50 timbres/mes)',
				'Funciones de IA (10K tokens)',
				'Soporte prioritario'
			],
			cta: 'Empezar Prueba Gratis (30 dias)',
			href: 'https://camino.redbroomsoftware.com/register?plan=profesional&utm_source=rbs_website&utm_medium=pricing_page',
			highlighted: true
		},
		{
			id: 'empresa',
			name: 'Empresa',
			price: '$3,999',
			period: 'MXN/mes',
			features: [
				'Todas las apps incluidas',
				'Soporte dedicado',
				'CFDI ilimitado',
				'Funciones de IA (100K tokens)',
				'Integraciones personalizadas'
			],
			cta: 'Contactar Ventas',
			href: '/contacto',
			highlighted: false
		}
	];

	const faqs = [
		{
			q: 'Puedo cambiar de plan despues?',
			a: 'Si, puedes cambiar de plan en cualquier momento. Los cambios se aplican al siguiente ciclo de facturacion.'
		},
		{
			q: 'Que incluye la prueba gratuita?',
			a: 'La prueba de 30 dias incluye todas las funciones del plan seleccionado sin restricciones. No se requiere tarjeta de credito.'
		},
		{
			q: 'Que pasa con mis datos si cancelo?',
			a: 'Tus datos se mantienen por 90 dias despues de la cancelacion. Puedes exportar todo en cualquier momento.'
		},
		{
			q: 'Ofrecen descuentos por pago anual?',
			a: 'Si, al pagar anualmente obtienes 2 meses gratis en cualquier plan.'
		},
		{
			q: 'Que metodos de pago aceptan?',
			a: 'Aceptamos tarjeta de credito/debito, transferencia bancaria (SPEI), y facturamos con CFDI.'
		},
		{
			q: 'Necesito soporte tecnico para la implementacion?',
			a: 'Todos los planes incluyen onboarding guiado. Los planes Profesional y Empresa incluyen sesiones de configuracion personalizadas.'
		}
	];
</script>

<svelte:head>
	<title>Precios - Red Broom Software</title>
	<meta name="description" content="Planes y precios del ecosistema RBS. Desde $499 MXN/mes. Prueba gratuita de 30 dias. SaaS, CRM, CFDI y mas para tu negocio." />
	<link rel="canonical" href="https://redbroomsoftware.com/pricing" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://redbroomsoftware.com/pricing" />
	<meta property="og:title" content="Precios - Red Broom Software" />
	<meta property="og:description" content="Planes y precios del ecosistema RBS. Desde $499 MXN/mes. Prueba gratuita de 30 dias." />
	<meta property="og:image" content="https://redbroomsoftware.com/logo.svg" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<!-- Hero -->
<section class="py-20 px-4 sm:px-6 lg:px-8 relative">
	<div class="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent"></div>
	<div class="max-w-7xl mx-auto text-center relative">
		<h2 class="text-4xl md:text-6xl font-bold text-white mb-6">
			Precios <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">simples</span>, sin sorpresas
		</h2>
		<p class="text-xl text-slate-400 max-w-3xl mx-auto">
			Elige el plan que mejor se adapte a tu negocio. Todos incluyen prueba gratuita de 30 dias.
		</p>
	</div>
</section>

<!-- Pricing Cards -->
<section class="py-16 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
			{#each plans as plan, i}
				<div
					use:scrollReveal={{ delay: i * 100 }}
					class="glass rounded-2xl p-8 relative flex flex-col transition-all hover:shadow-lg
						{plan.highlighted ? 'border-blue-500 border-2 hover:shadow-blue-500/20 scale-[1.02] md:scale-105' : 'hover:border-blue-500/50 hover:shadow-blue-500/10'}"
				>
					{#if plan.badge}
						<div class="absolute -top-4 left-1/2 -translate-x-1/2">
							<span class="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-500/25">
								{plan.badge}
							</span>
						</div>
					{/if}

					<div class="mb-6">
						<h3 class="text-xl font-bold text-white mb-2">{plan.name}</h3>
						<div class="flex items-baseline gap-1">
							<span class="text-4xl font-bold text-white">{plan.price}</span>
							<span class="text-slate-400 text-sm">{plan.period}</span>
						</div>
					</div>

					<ul class="space-y-3 mb-8 flex-1">
						{#each plan.features as feature}
							<li class="flex items-start text-sm text-slate-300">
								<svg class="w-5 h-5 text-emerald-400 mr-2.5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								{feature}
							</li>
						{/each}
					</ul>

					<a
						href={plan.href}
						class="block w-full text-center px-6 py-3.5 rounded-xl font-semibold transition-all
							{plan.highlighted
								? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
								: 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 hover:border-slate-600'}"
					>
						{plan.cta}
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- FAQ Section -->
<section class="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
	<div class="max-w-3xl mx-auto">
		<h3 class="text-3xl font-bold text-white text-center mb-12" use:scrollReveal>Preguntas frecuentes</h3>
		<div class="space-y-4">
			{#each faqs as faq, i}
				<details
					use:scrollReveal={{ delay: i * 80 }}
					class="glass rounded-xl group"
				>
					<summary class="px-6 py-4 cursor-pointer text-white font-medium flex items-center justify-between list-none">
						{faq.q}
						<svg class="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
						</svg>
					</summary>
					<div class="px-6 pb-4 text-slate-400 text-sm">
						{faq.a}
					</div>
				</details>
			{/each}
		</div>
	</div>
</section>

<!-- Bottom CTA -->
<section class="py-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-3xl mx-auto text-center" use:scrollReveal>
		<h3 class="text-3xl font-bold text-white mb-4">
			Listo para transformar tu negocio?
		</h3>
		<p class="text-slate-400 mb-8">
			Empieza tu prueba gratuita de 30 dias hoy. Sin tarjeta de credito, sin compromisos.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a
				href="https://camino.redbroomsoftware.com/register?plan=profesional&utm_source=rbs_website&utm_medium=pricing_page"
				class="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
			>
				Empezar Prueba Gratis
			</a>
			<a
				href="/contacto"
				class="inline-flex items-center justify-center px-8 py-4 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-all font-semibold border border-slate-700 hover:border-slate-600"
			>
				Contactar Ventas
			</a>
		</div>
	</div>
</section>

<Footer />
