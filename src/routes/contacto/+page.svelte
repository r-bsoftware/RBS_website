<script lang="ts">
	import { onMount } from 'svelte';

	// Camino CRM API endpoint for lead capture
	const CAMINO_API_URL = 'https://camino.redbroomsoftware.com/api/leads';

	let visitorId = '';

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

	// Contact form state
	let contactForm = {
		name: '',
		email: '',
		company: '',
		phone: '',
		projectType: '',
		message: ''
	};
	let submitStatus: 'idle' | 'submitting' | 'success' | 'error' = 'idle';
	let errorMessage = '';

	const projectTypes = [
		{ value: 'saas', label: 'Desarrollo SaaS' },
		{ value: 'pos', label: 'Sistema POS/ERP' },
		{ value: 'crm', label: 'CRM con IA' },
		{ value: 'mobile', label: 'App Móvil' },
		{ value: 'integration', label: 'Integración/API' },
		{ value: 'consulting', label: 'Consultoría' },
		{ value: 'other', label: 'Otro' }
	];

	async function handleContactSubmit(event: Event) {
		event.preventDefault();
		submitStatus = 'submitting';
		errorMessage = '';

		try {
			const urlParams = new URLSearchParams(window.location.search);

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
					product: contactForm.projectType,
					message: contactForm.message,
					source: 'rbs_website',
					formType: 'contact',
					landingPage: window.location.href,
					referrer: document.referrer || undefined,
					utm_source: urlParams.get('utm_source') || 'direct',
					utm_medium: urlParams.get('utm_medium') || 'organic',
					utm_campaign: urlParams.get('utm_campaign'),
					campaign_id: urlParams.get('campaign_id'),
					visitorId
				})
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error || 'Error al enviar el formulario');
			}

			submitStatus = 'success';
			contactForm = { name: '', email: '', company: '', phone: '', projectType: '', message: '' };
		} catch (error) {
			console.error('Form submission error:', error);
			submitStatus = 'error';
			errorMessage = error instanceof Error ? error.message : 'Error al enviar. Por favor intenta de nuevo.';
		}
	}
</script>

<svelte:head>
	<title>Contacto - Red Broom Software</title>
	<meta name="description" content="Contáctanos para discutir tu proyecto de software. Desarrollo de SaaS, POS, CRM, apps móviles y más para PyMEs mexicanas." />
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
					<a href="/portafolio" class="text-slate-300 hover:text-white transition-colors">Portafolio</a>
					<a href="/tecnologia" class="text-slate-300 hover:text-white transition-colors">Tecnologia</a>
					<a href="/contacto" class="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium">
						Contactar
					</a>
				</nav>
			</div>
		</div>
	</header>

	<!-- Hero -->
	<section class="py-20 px-4 sm:px-6 lg:px-8 relative">
		<div class="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent"></div>
		<div class="max-w-7xl mx-auto text-center relative">
			<h2 class="text-4xl md:text-6xl font-bold text-white mb-6">
				Hablemos de tu <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">proyecto</span>
			</h2>
			<p class="text-xl text-slate-400 max-w-2xl mx-auto">
				Cuéntanos qué necesitas y te daremos una propuesta en 48 horas.
			</p>
		</div>
	</section>

	<!-- Contact Form & Info -->
	<section class="py-16 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
				<!-- Form -->
				<div class="bg-slate-900 rounded-2xl border border-slate-800 p-8">
					{#if submitStatus === 'success'}
						<div class="text-center py-12">
							<div class="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
							</div>
							<h3 class="text-2xl font-bold text-white mb-2">Mensaje enviado</h3>
							<p class="text-slate-400">Te responderemos en las próximas 48 horas.</p>
						</div>
					{:else}
						<h3 class="text-2xl font-bold text-white mb-6">Envíanos un mensaje</h3>
						<form on:submit={handleContactSubmit} class="space-y-6">
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label for="name" class="block text-sm text-slate-400 mb-2">Nombre *</label>
									<input
										type="text"
										id="name"
										bind:value={contactForm.name}
										required
										class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
									/>
								</div>
								<div>
									<label for="email" class="block text-sm text-slate-400 mb-2">Email *</label>
									<input
										type="email"
										id="email"
										bind:value={contactForm.email}
										required
										class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
									/>
								</div>
							</div>

							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label for="company" class="block text-sm text-slate-400 mb-2">Empresa</label>
									<input
										type="text"
										id="company"
										bind:value={contactForm.company}
										class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
									/>
								</div>
								<div>
									<label for="phone" class="block text-sm text-slate-400 mb-2">Teléfono</label>
									<input
										type="tel"
										id="phone"
										bind:value={contactForm.phone}
										class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
									/>
								</div>
							</div>

							<div>
								<label for="projectType" class="block text-sm text-slate-400 mb-2">Tipo de proyecto</label>
								<select
									id="projectType"
									bind:value={contactForm.projectType}
									class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
								>
									<option value="">Selecciona una opción</option>
									{#each projectTypes as type}
										<option value={type.value}>{type.label}</option>
									{/each}
								</select>
							</div>

							<div>
								<label for="message" class="block text-sm text-slate-400 mb-2">Cuéntanos sobre tu proyecto *</label>
								<textarea
									id="message"
									bind:value={contactForm.message}
									required
									rows="4"
									class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none resize-none"
									placeholder="¿Qué problema quieres resolver? ¿Qué funcionalidades necesitas?"
								></textarea>
							</div>

							{#if submitStatus === 'error'}
								<div class="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-400 text-sm">
									{errorMessage}
								</div>
							{/if}

							<button
								type="submit"
								disabled={submitStatus === 'submitting'}
								class="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{submitStatus === 'submitting' ? 'Enviando...' : 'Enviar mensaje'}
							</button>
						</form>
					{/if}
				</div>

				<!-- Info -->
				<div class="space-y-8">
					<div>
						<h3 class="text-2xl font-bold text-white mb-4">¿Qué sigue?</h3>
						<div class="space-y-4">
							<div class="flex items-start gap-4">
								<div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
								<div>
									<h4 class="text-white font-semibold">Recibimos tu mensaje</h4>
									<p class="text-slate-400 text-sm">Revisamos tu proyecto y asignamos al equipo adecuado.</p>
								</div>
							</div>
							<div class="flex items-start gap-4">
								<div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
								<div>
									<h4 class="text-white font-semibold">Llamada de discovery</h4>
									<p class="text-slate-400 text-sm">30 minutos para entender tu negocio y requerimientos.</p>
								</div>
							</div>
							<div class="flex items-start gap-4">
								<div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
								<div>
									<h4 class="text-white font-semibold">Propuesta detallada</h4>
									<p class="text-slate-400 text-sm">Alcance, arquitectura, timeline y presupuesto.</p>
								</div>
							</div>
						</div>
					</div>

					<div class="bg-slate-900 rounded-2xl border border-slate-800 p-6">
						<h4 class="text-white font-semibold mb-4">Contacto directo</h4>
						<div class="space-y-3">
							<a href="mailto:dia@redbroomsoftware.com" class="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
								</svg>
								dia@redbroomsoftware.com
							</a>
						</div>
					</div>

					<div class="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20 p-6">
						<h4 class="text-white font-semibold mb-2">Proyecto urgente?</h4>
						<p class="text-slate-400 text-sm mb-4">Si tienes un deadline crítico, mencionalo en tu mensaje y te priorizamos.</p>
					</div>
				</div>
			</div>
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
