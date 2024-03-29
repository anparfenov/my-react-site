import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			// Could also be a dictionary or array of multiple entry points
			entry: resolve(__dirname, 'lib/main.js'),
			name: 'MyLib',
			// the proper extensions will be added
			fileName: 'my-lib',
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: ['react'],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					react: 'React',
				},
			},
		},
	},
});
