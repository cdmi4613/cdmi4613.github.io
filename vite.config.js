import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 사용자 사이트(https://USERNAME.github.io/)는 base '/' 사용.
// GitHub Actions 없이 main 브랜치의 /docs 폴더를 게시합니다.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: { outDir: 'docs', emptyOutDir: true },
})
