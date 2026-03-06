<script lang="ts">
	let { value, suffix = '' }: { value: number; suffix?: string } = $props();

	let displayed = $state(0);
	let hasAnimated = $state(false);
	let el: HTMLElement | undefined = $state();

	$effect(() => {
		if (!el) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !hasAnimated) {
					hasAnimated = true;
					animateCount();
					observer.disconnect();
				}
			},
			{ threshold: 0.3 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	});

	function animateCount() {
		const duration = 1200;
		const start = performance.now();
		function step(now: number) {
			const progress = Math.min((now - start) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			displayed = Math.round(eased * value);
			if (progress < 1) requestAnimationFrame(step);
		}
		requestAnimationFrame(step);
	}
</script>

<span bind:this={el} class="tabular-nums">{displayed}{suffix}</span>
