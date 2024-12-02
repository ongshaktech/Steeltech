import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: { transformMixedEsModules: true } // Change
  }
})

// optimizeDeps: {
//   include: ['@canvasjs/react-charts'],
// },
// build: {
//   rollupOptions: {
//     external: ['@canvasjs/react-charts'],
//   },
// },