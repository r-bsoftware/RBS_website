<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<div class="min-h-screen bg-slate-950">
	<Header />
	<slot />
</div>
