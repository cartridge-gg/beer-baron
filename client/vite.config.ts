import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
    //@ts-ignore
    plugins: [svgr(), react(), wasm(), topLevelAwait()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
