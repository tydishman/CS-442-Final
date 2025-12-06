import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import polyfillNode from 'rollup-plugin-polyfill-node';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), polyfillNode()],
  define: {
    "process.env": {},
    "process.browser": true,
  },
  resolve: {
      alias: [
      {
        find: './runtimeConfig',
        replacement: './runtimeConfig.browser', // ensures browser compatible version of AWS JS SDK is used
      },
    ]
  }
})
