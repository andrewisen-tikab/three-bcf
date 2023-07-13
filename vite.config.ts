import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    publicDir: false,
    build: {
        sourcemap: true,
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'three-bcf',
            // the proper extensions will be added
            fileName: 'three-bcf',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['three'],
        },
    },
    plugins: [
        dts({
            insertTypesEntry: true,
        }),
    ],
});
