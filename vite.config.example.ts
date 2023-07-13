import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';

export default defineConfig({
    plugins: [react(), splitVendorChunkPlugin()],
    base: './',
    build: {
        outDir: './dist/examples',
        rollupOptions: {
            input: {
                example: resolve(__dirname, 'example/index.html'),
            },
        },
    },
});
