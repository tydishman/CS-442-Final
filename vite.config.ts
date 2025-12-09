// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import polyfillNode from 'rollup-plugin-polyfill-node';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), polyfillNode()],
//   define: {
//     "process.browser": true
//   },
//   resolve: {
//       alias: [
//       {
//         find: './runtimeConfig',
//         replacement: './runtimeConfig.browser', // ensures browser compatible version of AWS JS SDK is used
//       },
//     ]
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'] // ensures only one React instance
  }
})
