/**
 * SvelteKit Client Hooks for RBS Website
 *
 * Handles client-side error tracking with Sentry.
 * Note: This is a static site (adapter-static), so only client hooks are needed.
 */

import * as Sentry from '@sentry/sveltekit';
import { browser } from '$app/environment';

// Initialize Sentry for client-side error tracking
if (browser && import.meta.env.VITE_SENTRY_DSN) {
	Sentry.init({
		dsn: import.meta.env.VITE_SENTRY_DSN,
		environment: import.meta.env.MODE || 'development',
		integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
		// Performance monitoring
		tracesSampleRate: 0.1,
		// Session replay for debugging
		replaysSessionSampleRate: 0.1,
		replaysOnErrorSampleRate: 1.0
	});
}

export const handleError = Sentry.handleErrorWithSentry();
