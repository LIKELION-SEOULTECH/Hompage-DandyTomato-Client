import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { configDefaults } from 'vitest/config'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: [{ find: '@', replacement: '/src' }]
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/unit_tests/setup.ts',
        exclude: [...configDefaults.exclude, 'e2e/**'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html']
        },
        browser: {
            enabled: true
        }
    }
})
