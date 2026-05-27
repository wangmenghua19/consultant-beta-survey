import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Gitee Pages 项目页：https://用户名.gitee.io/仓库名/
export default defineConfig(({ mode }) => {
  const forGiteePages = mode === 'gitee'
  const giteeRepo = process.env.GITEE_REPO || 'consultant-beta-survey'
  const base = forGiteePages ? `/${giteeRepo}/` : '/'

  return {
    base,
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }
})
