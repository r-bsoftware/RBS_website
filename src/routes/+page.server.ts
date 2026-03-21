import type { PageServerLoad } from './$types';

const CAMINO_API = 'https://camino.redbroomsoftware.com/api/public/page';

export const prerender = false;

export const load: PageServerLoad = async ({ url, cookies, request }) => {
	let visitorId = cookies.get('camino_visitor');
	if (!visitorId) {
		visitorId = crypto.randomUUID();
		cookies.set('camino_visitor', visitorId, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: 365 * 24 * 60 * 60
		});
	}

	const params = new URLSearchParams({ visitor_id: visitorId });
	const utmSource = url.searchParams.get('utm_source');
	const utmMedium = url.searchParams.get('utm_medium');
	const utmCampaign = url.searchParams.get('utm_campaign');
	if (utmSource) params.set('utm_source', utmSource);
	if (utmMedium) params.set('utm_medium', utmMedium);
	if (utmCampaign) params.set('utm_campaign', utmCampaign);

	try {
		const res = await fetch(`${CAMINO_API}/rbs?${params}`, {
			headers: { 'User-Agent': request.headers.get('user-agent') || '' }
		});

		if (res.ok) {
			const content = await res.json();
			return { content, visitorId };
		}
	} catch (e) {
		console.error('[RBS Home] Camino API error:', e);
	}

	return { content: null, visitorId };
};
