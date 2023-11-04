/* ~~/vite.config.ts */

// imports
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import tsconfigPaths from 'vite-tsconfig-paths'

/**
 * Checks if being built for production
 */
const PROD = process.env.NODE_ENV !== 'development'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      fileName: 'othello',
      name: '@krutt/othello',
    },
    minify: PROD,
  },
  plugins: [dts({ insertTypesEntry: true }), nodePolyfills(), tsconfigPaths()],
})
