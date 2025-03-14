import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [vue(), dts({ outDir: 'dist/types' })],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'gcomp-clone',
            fileName: (format) => `gcomp-clone.${format}.js`,
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
})
