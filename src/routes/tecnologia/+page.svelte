<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';

	const techStack = {
		frontend: [
			{ name: 'SvelteKit', description: 'Framework principal para todas las aplicaciones', icon: '🔥' },
			{ name: 'TypeScript', description: 'Type safety en todo el codebase', icon: '📘' },
			{ name: 'Tailwind CSS', description: 'Diseño consistente y responsive', icon: '🎨' },
			{ name: 'Flutter', description: 'Apps móviles cross-platform', icon: '📱' }
		],
		backend: [
			{ name: 'Supabase', description: 'PostgreSQL, Auth, Realtime, Storage', icon: '⚡' },
			{ name: 'Firebase', description: 'Auth, Firestore para algunos productos', icon: '🔥' },
			{ name: 'Node.js', description: 'APIs y microservicios', icon: '🟢' },
			{ name: 'PostgreSQL', description: 'Base de datos principal', icon: '🐘' }
		],
		ai: [
			{ name: 'Groq', description: 'Proveedor principal: inferencia ultra-rápida', icon: '⚡' },
			{ name: 'Anthropic Claude', description: 'Agentes con herramientas y análisis de documentos', icon: '🤖' },
			{ name: 'Google Gemini', description: 'Contexto largo para documentos extensos', icon: '🧠' },
			{ name: 'Modelos Propios', description: 'Scoring, matching y clasificación específicos', icon: '📊' }
		],
		integrations: [
			{ name: 'SAT/CFDI 4.0', description: 'Facturación electrónica mexicana', icon: '🧾' },
			{ name: 'SPEI/CoDi', description: 'Pagos bancarios en tiempo real', icon: '💳' },
			{ name: 'WhatsApp Cloud', description: 'Mensajería empresarial', icon: '💬' },
			{ name: 'Twilio', description: 'Voz, SMS, verificación', icon: '📞' },
			{ name: 'Fintoc/Belvo', description: 'Open Banking', icon: '🏦' },
			{ name: 'Stripe', description: 'Pagos internacionales', icon: '💰' }
		],
		infrastructure: [
			{ name: 'Vercel', description: 'Hosting y edge functions', icon: '▲' },
			{ name: 'Supabase Cloud', description: 'Base de datos managed', icon: '☁️' },
			{ name: 'GitHub Actions', description: 'CI/CD automatizado', icon: '🔄' },
			{ name: 'Cloudflare', description: 'DNS, CDN, protección', icon: '🛡️' }
		]
	};

	const principles = [
		{
			title: 'Svelte-First',
			description: 'Usamos SvelteKit para todo. Menos JavaScript, mejor performance, developer experience superior.'
		},
		{
			title: 'Type Safety',
			description: 'TypeScript estricto en todo el codebase. Menos bugs en producción, refactoring confiable.'
		},
		{
			title: 'Edge Performance',
			description: 'Serverless functions en el edge para latencia mínima. México primero, global después.'
		},
		{
			title: 'AI-Native',
			description: 'IA integrada desde el diseño, no como feature adicional. Clasificación, automatización, asistencia.'
		}
	];
</script>

<svelte:head>
	<title>Tecnología - Red Broom Software</title>
	<meta name="description" content="Stack tecnológico de Red Broom Software: SvelteKit, TypeScript, Supabase, Groq, Claude, Gemini y más. Desarrollo moderno para PyMEs mexicanas." />
	<link rel="canonical" href="https://redbroomsoftware.com/tecnologia" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://redbroomsoftware.com/tecnologia" />
	<meta property="og:title" content="Tecnología - Red Broom Software" />
	<meta property="og:description" content="Stack moderno probado en producción: SvelteKit, Supabase, multi-provider AI, FinTech integrations." />
	<meta property="og:image" content="https://redbroomsoftware.com/logo.svg" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<!-- Hero -->
<section class="py-20 px-4 sm:px-6 lg:px-8 relative">
	<div class="absolute inset-0 bg-gradient-to-b from-emerald-600/10 via-transparent to-transparent"></div>
	<div class="max-w-7xl mx-auto text-center relative">
		<h2 class="text-4xl md:text-6xl font-bold text-white mb-6">
			Nuestra <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Tecnología</span>
		</h2>
		<p class="text-xl text-slate-400 max-w-3xl mx-auto">
			Stack moderno, probado en producción. Cada decisión técnica optimizada para performance, mantenibilidad y escalabilidad.
		</p>
	</div>
</section>

<!-- Principles -->
<section class="py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each principles as principle}
				<div class="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
					<h3 class="text-lg font-bold text-emerald-400 mb-2">{principle.title}</h3>
					<p class="text-slate-400 text-sm">{principle.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Frontend -->
<section class="py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		<h3 class="text-2xl font-bold text-white mb-6">Frontend</h3>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{#each techStack.frontend as tech}
				<div class="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 transition-all">
					<div class="text-2xl mb-2">{tech.icon}</div>
					<h4 class="text-white font-semibold">{tech.name}</h4>
					<p class="text-slate-400 text-sm">{tech.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Backend -->
<section class="py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		<h3 class="text-2xl font-bold text-white mb-6">Backend & Database</h3>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{#each techStack.backend as tech}
				<div class="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 transition-all">
					<div class="text-2xl mb-2">{tech.icon}</div>
					<h4 class="text-white font-semibold">{tech.name}</h4>
					<p class="text-slate-400 text-sm">{tech.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- AI -->
<section class="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
	<div class="max-w-7xl mx-auto">
		<h3 class="text-2xl font-bold text-white mb-6">Inteligencia Artificial</h3>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{#each techStack.ai as tech}
				<div class="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-purple-500/50 transition-all">
					<div class="text-2xl mb-2">{tech.icon}</div>
					<h4 class="text-white font-semibold">{tech.name}</h4>
					<p class="text-slate-400 text-sm">{tech.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Integrations -->
<section class="py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		<h3 class="text-2xl font-bold text-white mb-6">Integraciones</h3>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each techStack.integrations as tech}
				<div class="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500/50 transition-all">
					<div class="text-2xl mb-2">{tech.icon}</div>
					<h4 class="text-white font-semibold">{tech.name}</h4>
					<p class="text-slate-400 text-sm">{tech.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Infrastructure -->
<section class="py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		<h3 class="text-2xl font-bold text-white mb-6">Infraestructura</h3>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{#each techStack.infrastructure as tech}
				<div class="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-cyan-500/50 transition-all">
					<div class="text-2xl mb-2">{tech.icon}</div>
					<h4 class="text-white font-semibold">{tech.name}</h4>
					<p class="text-slate-400 text-sm">{tech.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA -->
<section class="py-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-3xl mx-auto text-center">
		<h3 class="text-3xl font-bold text-white mb-4">¿Quieres ver el código?</h3>
		<p class="text-slate-400 mb-8">Si eres técnico y quieres evaluar nuestra calidad de código, podemos darte acceso a repos de demostración.</p>
		<a href="/contacto" class="inline-flex px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white rounded-xl hover:from-emerald-600 hover:to-cyan-700 transition-all font-semibold">
			Solicitar Demo Técnica
		</a>
	</div>
</section>

<Footer />
