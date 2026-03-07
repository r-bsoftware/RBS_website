<script lang="ts">
	import { page } from '$app/stores';
	import LanguageSwitcher from './LanguageSwitcher.svelte';

	let mobileMenuOpen = $state(false);
	let scrolled = $state(false);

	$effect(() => {
		function onScroll() {
			scrolled = window.scrollY > 20;
		}
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	const currentPath = $derived($page.url.pathname);

	function isActive(path: string) {
		if (path === '/') return currentPath === '/';
		return currentPath === path || currentPath.startsWith(path + '/');
	}

	function navClass(path: string) {
		return isActive(path)
			? 'text-white font-medium'
			: 'text-slate-300 hover:text-white transition-colors';
	}
</script>

<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white focus:rounded-lg">
	Saltar al contenido
</a>

<header
	class="sticky top-0 z-50 transition-all duration-300
		{scrolled ? 'bg-slate-950/95 backdrop-blur-xl shadow-lg shadow-slate-950/50 border-b border-slate-800/80' : 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/40'}"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
		<div class="flex items-center justify-between">
			<a href="/" class="flex items-center space-x-3 group">
				<img src="/logo.svg" alt="Red Broom Software" class="w-10 h-10 group-hover:scale-105 transition-transform" />
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
				<a href="/contacto" class="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium hover:shadow-lg hover:shadow-blue-500/25">
					Contactar
				</a>
				<LanguageSwitcher />
			</nav>

			<!-- Mobile Menu Button -->
			<button class="md:hidden p-2 text-slate-300 hover:text-white" onclick={toggleMobileMenu} aria-label="Menú" aria-expanded={mobileMenuOpen}>
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
			<nav class="md:hidden mt-4 pb-4 border-t border-slate-800 pt-4 animate-fade-in-up">
				<div class="flex flex-col space-y-4">
					<a href="/servicios" onclick={closeMobileMenu} class="text-slate-300 hover:text-white py-2 transition-colors">Servicios</a>
					<a href="/portafolio" onclick={closeMobileMenu} class="text-slate-300 hover:text-white py-2 transition-colors">Portafolio</a>
					<a href="/tecnologia" onclick={closeMobileMenu} class="text-slate-300 hover:text-white py-2 transition-colors">Tecnología</a>
					<a href="/contacto" onclick={closeMobileMenu} class="px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-center font-medium">
						Contactar
					</a>
				</div>
			</nav>
		{/if}
	</div>
</header>
