<script lang="ts">
	const apps = [
		{ name: 'Camino', role: 'CRM + SSO', color: 'from-blue-500 to-cyan-500' },
		{ name: 'Colectiva', role: 'Pagos + IA', color: 'from-purple-500 to-pink-500' },
		{ name: 'Constanza', role: 'Contabilidad', color: 'from-emerald-500 to-teal-500' },
		{ name: 'Caracol', role: 'Inventario', color: 'from-orange-500 to-red-500' },
		{ name: 'La Hoja', role: 'ERP', color: 'from-green-500 to-lime-500' },
		{ name: 'Plenura', role: 'Bienestar', color: 'from-violet-500 to-purple-500' },
		{ name: 'Rito', role: 'Real Estate', color: 'from-amber-500 to-orange-500' },
		{ name: 'Agora', role: 'Legal', color: 'from-sky-500 to-blue-500' },
		{ name: 'Comal', role: 'E-commerce', color: 'from-red-500 to-rose-500' },
		{ name: 'Mancha', role: 'Reservas', color: 'from-teal-500 to-cyan-500' }
	];
</script>

<div class="relative py-8">
	<!-- Center hub -->
	<div class="flex justify-center mb-8">
		<div class="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 animate-float">
			<div class="text-center">
				<span class="text-white font-bold text-sm block">RBS</span>
				<span class="text-white/70 text-[10px]">Ecosistema</span>
			</div>
		</div>
	</div>

	<!-- Apps orbiting -->
	<div class="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-3xl mx-auto">
		{#each apps as app, i}
			<div
				class="glass rounded-xl p-3 text-center hover:scale-105 transition-transform cursor-default"
				style="animation-delay: {i * 100}ms"
			>
				<div class="w-8 h-8 rounded-lg bg-gradient-to-r {app.color} mx-auto mb-1.5 opacity-80"></div>
				<p class="text-white text-xs font-semibold">{app.name}</p>
				<p class="text-slate-400 text-[10px]">{app.role}</p>
			</div>
		{/each}
	</div>

	<!-- Connection lines (decorative) -->
	<div class="absolute inset-0 pointer-events-none overflow-hidden">
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-slate-800/50 rounded-full"></div>
	</div>
</div>
