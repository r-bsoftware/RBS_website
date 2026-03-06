<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal';

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
			{#each principles as principle, i}
				<div use:scrollReveal={{ delay: i * 100 }} class="glass rounded-xl p-6">
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
				<div class="glass rounded-xl p-5 hover:border-emerald-500/50 transition-all">
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
				<div class="glass rounded-xl p-5 hover:border-emerald-500/50 transition-all">
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
				<div class="glass rounded-xl p-5 hover:border-purple-500/50 transition-all">
					<div class="text-2xl mb-2">{tech.icon}</div>
					<h4 class="text-white font-semibold">{tech.name}</h4>
					<p class="text-slate-400 text-sm">{tech.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Agent Architecture -->
<section class="py-16 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		<div class="mb-10" use:scrollReveal>
			<h3 class="text-2xl font-bold text-white mb-2">Arquitectura de Agentes</h3>
			<p class="text-slate-400 max-w-2xl">
				Todos los agentes del ecosistema RBS comparten una infraestructura centralizada: enrutamiento inteligente al proveedor más económico capaz, herramientas MCP para acceso a datos en tiempo real, y ciclo agéntico para tareas de múltiples pasos.
			</p>
		</div>

		<!-- Pipeline flow -->
		<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
			<div class="glass rounded-xl p-5">
				<div class="text-purple-400 font-mono text-xs mb-2">1. REQUEST</div>
				<p class="text-white font-semibold text-sm mb-1">App cliente</p>
				<p class="text-slate-400 text-xs">Camino, Rito, Plenura u otro app envía mensajes y herramientas disponibles al proxy centralizado</p>
			</div>
			<div class="bg-slate-900 border border-purple-500/30 rounded-xl p-5">
				<div class="text-purple-400 font-mono text-xs mb-2">2. ROUTE</div>
				<p class="text-white font-semibold text-sm mb-1">AI Router (Colectiva)</p>
				<p class="text-slate-400 text-xs">Herramientas → Anthropic · Contexto largo → Gemini · Texto simple → Groq</p>
			</div>
			<div class="glass rounded-xl p-5">
				<div class="text-purple-400 font-mono text-xs mb-2">3. EXECUTE</div>
				<p class="text-white font-semibold text-sm mb-1">Herramientas MCP</p>
				<p class="text-slate-400 text-xs">Acceso a Firestore, Supabase, APIs externas. Ciclo agéntico hasta completar la tarea</p>
			</div>
			<div class="glass rounded-xl p-5">
				<div class="text-purple-400 font-mono text-xs mb-2">4. METER</div>
				<p class="text-white font-semibold text-sm mb-1">Metering centralizado</p>
				<p class="text-slate-400 text-xs">Tokens contados, costo calculado en MXN, cuota aplicada por organización</p>
			</div>
		</div>

		<!-- Live agents -->
		<h4 class="text-lg font-semibold text-white mb-4" use:scrollReveal>Agentes en producción</h4>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<div class="glass rounded-xl p-5">
				<div class="flex items-center gap-2 mb-3">
					<span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
					<span class="text-xs text-emerald-400 font-medium">En vivo · Colectiva</span>
				</div>
				<h5 class="text-white font-semibold mb-1">Oracle</h5>
				<p class="text-slate-400 text-sm">Chat interno de BI con 15+ herramientas MCP: consulta en tiempo real acuerdos, distribuciones, quotas, wallets y salud del ecosistema.</p>
			</div>
			<div class="glass rounded-xl p-5">
				<div class="flex items-center gap-2 mb-3">
					<span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
					<span class="text-xs text-emerald-400 font-medium">En vivo · Rito</span>
				</div>
				<h5 class="text-white font-semibold mb-1">Deal Copilot</h5>
				<p class="text-slate-400 text-sm">Asistente de underwriting con 8 herramientas: analiza PDFs de deals, genera pro-formas, calcula distribuciones y redacta paquetes para instituciones financieras.</p>
			</div>
			<div class="glass rounded-xl p-5">
				<div class="flex items-center gap-2 mb-3">
					<span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
					<span class="text-xs text-emerald-400 font-medium">En vivo · Camino</span>
				</div>
				<h5 class="text-white font-semibold mb-1">Agentes de Atención</h5>
				<p class="text-slate-400 text-sm">Atienden WhatsApp y llamadas 24/7, califican prospectos, coordinan citas y sintetizan conversaciones. El equipo solo interviene con oportunidades reales.</p>
			</div>
			<div class="glass rounded-xl p-5">
				<div class="flex items-center gap-2 mb-3">
					<span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
					<span class="text-xs text-emerald-400 font-medium">En vivo · Plenura</span>
				</div>
				<h5 class="text-white font-semibold mb-1">Matching de Bienestar</h5>
				<p class="text-slate-400 text-sm">Prescreening conversacional, matching semántico paciente-terapeuta, notas de sesión automatizadas y resúmenes de reseñas.</p>
			</div>
			<div class="glass rounded-xl p-5">
				<div class="flex items-center gap-2 mb-3">
					<span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
					<span class="text-xs text-emerald-400 font-medium">En vivo · Constanza</span>
				</div>
				<h5 class="text-white font-semibold mb-1">Clasificación Fiscal</h5>
				<p class="text-slate-400 text-sm">Clasifica transacciones contables, sugiere cuentas SAT, detecta deducciones y genera DIOT sin intervención manual.</p>
			</div>
			<div class="glass rounded-xl p-5">
				<div class="flex items-center gap-2 mb-3">
					<span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
					<span class="text-xs text-emerald-400 font-medium">En vivo · Agora</span>
				</div>
				<h5 class="text-white font-semibold mb-1">Redacción Legal</h5>
				<p class="text-slate-400 text-sm">Genera 8 tipos de documentos legales desde contexto de casos: contratos, poderes, convenios y escritos judiciales en segundos.</p>
			</div>
		</div>
	</div>
</section>

<!-- Integrations -->
<section class="py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-7xl mx-auto">
		<h3 class="text-2xl font-bold text-white mb-6">Integraciones</h3>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each techStack.integrations as tech}
				<div class="glass rounded-xl p-5 hover:border-blue-500/50 transition-all">
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
				<div class="glass rounded-xl p-5 hover:border-cyan-500/50 transition-all">
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
