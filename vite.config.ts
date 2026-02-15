import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Importação nova
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Adicione o plugin aqui
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@application': path.resolve(__dirname, './src/application'),
      '@features': path.resolve(__dirname, './src/features'),
      '@screens': path.resolve(__dirname, './src/screens'),
      '@components': path.resolve(__dirname, './src/components'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
})