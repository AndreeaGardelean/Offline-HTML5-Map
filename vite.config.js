import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import inject from '@rollup/plugin-inject';

export default defineConfig({
	plugins: [
		inject({
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			$: 'jquery',
		}),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				short_name: 'OMap',
				name: 'OMap',
				start_url: '/',
				display: 'fullscreen',
				icons: [
					{
						src: './icons/icon.png',
						type: 'image/png',
						sizes: '512x512',
					},
				],
				theme_color: '#242424',
				background_color: '#242424',
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,png,svg,json}'],
				skipWaiting: true,
				clientsClaim: true,
			},
		}),
	],
});
