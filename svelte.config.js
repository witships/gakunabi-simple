import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.argv.includes('dev');
const base = dev ? '' : '/gakunabi-simple';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// pages: 'build', // デフォルトは 'build'
			// assets: 'build', // デフォルトは 'build'
			fallback: '404.html' // または 'index.html' をSPAのように動作させたい場合
			// precompress: false, // 必要に応じて
		}),
		paths: {
			base: base
		}
	},
	prerender: {
		entries: ['*']
	}
};

export default config;
