<script>
	export let full = false;
</script>

{#if full}
	<footer class="border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
				<div>
					<div class="flex items-center space-x-3 mb-4">
						<img src="/logo.svg" alt="Red Broom Software" class="w-8 h-8" />
						<span class="text-white font-bold">Red Broom Software</span>
					</div>
					<p class="text-slate-400 text-sm">Desarrollo de software empresarial de alto rendimiento.</p>
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
