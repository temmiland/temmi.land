import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
	// Force a single React instance. @temmiland/react-expandable-grid ships
	// react/react-dom as regular dependencies, so without deduping Vite can
	// bundle a second copy, breaking hooks ("dispatcher.useRef" is null).
	resolve: {
		dedupe: ['react', 'react-dom'],
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	plugins: [react(), eslint()],
	test: {
		environment: 'node',
		include: ['src/**/*.test.ts']
	}
});
