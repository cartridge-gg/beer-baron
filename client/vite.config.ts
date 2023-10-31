import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';
import { VitePWA } from 'vite-plugin-pwa';
import icons from './icons.json';

export default defineConfig({
    plugins: [
        svgr(),
        react(),
        wasm(),
        topLevelAwait(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            manifest: {
                name: 'Beer Baron',
                short_name: 'BeerBaron',
                description: 'Brew Beer & Buy Indulgences',
                theme_color: '#F1C34D',
                icons: [...icons.icons],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
