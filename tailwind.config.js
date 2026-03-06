/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter Variable', 'Inter', 'system-ui', '-apple-system', 'sans-serif']
			},
			keyframes: {
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(24px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-8px)' }
				},
				glow: {
					'0%, 100%': { opacity: '0.4' },
					'50%': { opacity: '1' }
				},
				marquee: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' }
				},
				countUp: {
					'0%': { opacity: '0', transform: 'translateY(12px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
				'float': 'float 4s ease-in-out infinite',
				'glow': 'glow 3s ease-in-out infinite',
				'marquee': 'marquee 30s linear infinite',
				'count-up': 'countUp 0.4s ease-out forwards'
			}
		}
	},
	plugins: []
};
