import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    const res = {
        plugins: [
            vue(),
            VitePWA({
                registerType: 'autoUpdate',
                manifest: {
                    name: 'Search PoS',
                    short_name: 'PoS',
                    description: 'Search Probability of Success',
                    theme_color: '#000000',
                },
                devOptions: {
                    enabled: true
                },
                workbox: {
                    clientsClaim: true,
                    skipWaiting: true
                }
            })
        ],
        optimizeDeps: {
            include: ["showdown", "@tak-ps/vue-tabler"],
        },
        build: {},
        server: {
            port: 8080,
        },
    }

    return res;
})

