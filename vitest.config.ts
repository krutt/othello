// ~~/vitest.config.ts

// imports
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitest.dev/guide/#configuring-vitest
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    // environment: 'jsdom',
    include: ['tests/**/*.spec.ts'],
    setupFiles: 'dotenv/config',
    threads: false,
  },
})
