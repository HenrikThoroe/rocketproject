import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
    lib: {
      entry: './src/index.ts',
      name: 'rocketproject-ui',
      fileName: (format) => `index.${format}.js`,
      formats: ['cjs', 'es'],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [dts(), libInjectCss(), react()],
})
