<script lang="ts">
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
			{ name: 'OpenAI GPT-4', description: 'Agentes conversacionales y clasificación', icon: '🧠' },
			{ name: 'Claude', description: 'Análisis de documentos y código', icon: '🤖' },
			{ name: 'Whisper', description: 'Transcripción de audio', icon: '🎙️' },
			{ name: 'Custom ML', description: 'Modelos propios para casos específicos', icon: '📊' }
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
	<meta name="description" content="Stack tecnológico de Red Broom Software: SvelteKit, TypeScript, Supabase, OpenAI, y más. Desarrollo moderno para PyMEs mexicanas." />
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
					<a href="/tecnologia" class="text-white font-medium">Tecnología</a>
					<a href="/contacto" class="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium">
						Contactar
					</a>
				</nav>
			</div>
		</div>
	</header>

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

	<!-- Footer -->
	<footer class="border-t border-slate-800 py-8 px-4">
		<div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
			<p class="text-slate-500 text-sm">© 2025 Red Broom Software S.A.S. de C.V.</p>
			<div class="flex items-center gap-6">
				<a href="/privacidad" class="text-slate-500 hover:text-slate-300 text-sm">Privacidad</a>
				<a href="/terminos" class="text-slate-500 hover:text-slate-300 text-sm">Términos</a>
			</div>
		</div>
	</footer>
</div>
