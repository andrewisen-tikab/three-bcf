import * as esbuild from 'esbuild';

await esbuild.build({
    entryPoints: ['src/worker/worker.ts'],
    bundle: true,
    minify: false,
    outfile: './dist/worker.js',
    loader: {
        '.png': 'file',
    },
});
