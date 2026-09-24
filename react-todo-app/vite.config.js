import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // すべての設定をこの1つのオブジェクト内にまとめます
  base: './',
  plugins: [
    react(),
    tailwindcss() // 👈 これでTailwind CSS v4のコンパイルが有効になります
  ],
})
