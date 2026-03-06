export function scrollReveal(node: HTMLElement, options?: { threshold?: number; delay?: number }) {
	const threshold = options?.threshold ?? 0.15;
	const delay = options?.delay ?? 0;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					if (delay) {
						setTimeout(() => node.classList.add('visible'), delay);
					} else {
						node.classList.add('visible');
					}
					observer.unobserve(node);
				}
			}
		},
		{ threshold }
	);

	node.classList.add('scroll-reveal');
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
