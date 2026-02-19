<script>
	import { page } from '$app/stores';

	let mobileMenuOpen = false;

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	$: currentPath = $page.url.pathname;

	function isActive(path) {
		if (path === '/') return currentPath === '/';
		return currentPath === path || currentPath.startsWith(path + '/');
	}

	function navClass(path) {
		return isActive(path) ? 'text-white font-medium' : 'text-slate-300 hover:text-white transition-colors';
	}
</script>

<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white focus:rounded-lg">
	Saltar al contenido
</a>

<header class="bg-slate-950/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
		<div class="flex items-center justify-between">
			<a href="/" class="flex items-center space-x-3">
				<img src="/logo.svg" alt="Red Broom Software" class="w-10 h-10" />
				<div>
					<span class="text-xl font-bold text-white block">Red Broom Software</span>
					<span class="text-xs text-slate-400 block">Enterprise Solutions</span>
				</div>
			</a>

			<!-- Desktop Nav -->
			<nav class="hidden md:flex items-center space-x-8">
				<a href="/servicios" class={navClass('/servicios')} aria-current={isActive('/servicios') ? 'page' : undefined}>Servicios</a>
				<a href="/portafolio" class={navClass('/portafolio')} aria-current={isActive('/portafolio') ? 'page' : undefined}>Portafolio</a>
				<a href="/tecnologia" class={navClass('/tecnologia')} aria-current={isActive('/tecnologia') ? 'page' : undefined}>Tecnología</a>
				<a href="/contacto" class="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium">
					Contactar
				</a>
			</nav>

			<!-- Mobile Menu Button -->
			<button class="md:hidden p-2 text-slate-300 hover:text-white" on:click={toggleMobileMenu} aria-label="Menú" aria-expanded={mobileMenuOpen}>
				{#if mobileMenuOpen}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				{:else}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
					</svg>
				{/if}
			</button>
		</div>

		<!-- Mobile Nav -->
		{#if mobileMenuOpen}
			<nav class="md:hidden mt-4 pb-4 border-t border-slate-800 pt-4">
				<div class="flex flex-col space-y-4">
					<a href="/servicios" on:click={closeMobileMenu} class="text-slate-300 hover:text-white py-2">Servicios</a>
					<a href="/portafolio" on:click={closeMobileMenu} class="text-slate-300 hover:text-white py-2">Portafolio</a>
					<a href="/tecnologia" on:click={closeMobileMenu} class="text-slate-300 hover:text-white py-2">Tecnología</a>
					<a href="/contacto" on:click={closeMobileMenu} class="px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-center font-medium">
						Contactar
					</a>
				</div>
			</nav>
		{/if}
	</div>
</header>
