<script>
	let { full = false } = $props();

	const ecosystemApps = [
		'Camino', 'Colectiva', 'Constanza', 'Caracol', 'La Hoja', 'Plenura',
		'Rito', 'Agora', 'Comal', 'Mancha', 'Cosmos Pet', 'Servilleta',
		'Cookie Monster', 'Puppy Love', 'Continua', 'Baul', 'Goodbay', 'Hospitality'
	];
</script>

{#if full}
	<footer class="border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
				<div>
					<div class="flex items-center space-x-3 mb-4">
						<img src="/logo.svg" alt="Red Broom Software" class="w-8 h-8" />
						<span class="text-white font-bold">Red Broom Software</span>
					</div>
					<p class="text-slate-400 text-sm mb-4">Desarrollo de software empresarial de alto rendimiento para PyMEs mexicanas.</p>
					<a href="https://github.com/r-bsoftware" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="text-slate-500 hover:text-white transition-colors">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
					</a>
				</div>
				<div>
					<h4 class="text-white font-semibold mb-4">Servicios</h4>
					<ul class="space-y-2 text-sm">
						<li><a href="/servicios" class="text-slate-400 hover:text-white transition-colors">Desarrollo SaaS</a></li>
						<li><a href="/servicios" class="text-slate-400 hover:text-white transition-colors">POS & ERP</a></li>
						<li><a href="/servicios" class="text-slate-400 hover:text-white transition-colors">CRM con IA</a></li>
						<li><a href="/servicios" class="text-slate-400 hover:text-white transition-colors">Apps Móviles</a></li>
					</ul>
				</div>
				<div>
					<h4 class="text-white font-semibold mb-4">Empresa</h4>
					<ul class="space-y-2 text-sm">
						<li><a href="/portafolio" class="text-slate-400 hover:text-white transition-colors">Portafolio</a></li>
						<li><a href="/tecnologia" class="text-slate-400 hover:text-white transition-colors">Tecnología</a></li>
						<li><a href="/contacto" class="text-slate-400 hover:text-white transition-colors">Contacto</a></li>
						<li><a href="https://developers.redbroomsoftware.com" class="text-slate-400 hover:text-white transition-colors">Developers</a></li>
					</ul>
				</div>
				<div>
					<h4 class="text-white font-semibold mb-4">Legal</h4>
					<ul class="space-y-2 text-sm">
						<li><a href="/privacidad" class="text-slate-400 hover:text-white transition-colors">Privacidad</a></li>
						<li><a href="/terminos" class="text-slate-400 hover:text-white transition-colors">Términos</a></li>
					</ul>
				</div>
			</div>

			<!-- Ecosystem strip -->
			<div class="border-t border-slate-800 pt-6 mb-6">
				<p class="text-xs text-slate-500 mb-3">Ecosistema RBS</p>
				<div class="flex flex-wrap gap-2">
					{#each ecosystemApps as app}
						<span class="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-default">{app}</span>
						{#if app !== ecosystemApps[ecosystemApps.length - 1]}
							<span class="text-slate-700">·</span>
						{/if}
					{/each}
				</div>
			</div>

			<div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
				<p class="text-slate-500 text-sm">&copy; {new Date().getFullYear()} Red Broom Software S.A.S. de C.V. Todos los derechos reservados.</p>
				<a href="mailto:dia@redbroomsoftware.com" class="text-slate-400 hover:text-white text-sm transition-colors">
					dia@redbroomsoftware.com
				</a>
			</div>
		</div>
	</footer>
{:else}
	<footer class="border-t border-slate-800 py-8 px-4">
		<div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
			<p class="text-slate-500 text-sm">&copy; {new Date().getFullYear()} Red Broom Software S.A.S. de C.V.</p>
			<div class="flex items-center gap-6">
				<a href="/privacidad" class="text-slate-500 hover:text-slate-300 text-sm">Privacidad</a>
				<a href="/terminos" class="text-slate-500 hover:text-slate-300 text-sm">Términos</a>
				<a href="mailto:dia@redbroomsoftware.com" class="text-slate-400 hover:text-white text-sm transition-colors">
					dia@redbroomsoftware.com
				</a>
			</div>
		</div>
	</footer>
{/if}
