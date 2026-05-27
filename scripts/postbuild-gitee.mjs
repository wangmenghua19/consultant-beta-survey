/**
 * Gitee Pages 无服务端 rewrite，用 404.html 承载 SPA（与 index.html 相同）
 */
import { copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const index = join('dist', 'index.html')
const notFound = join('dist', '404.html')

if (!existsSync(index)) {
  console.error('dist/index.html 不存在，请先执行 build:gitee')
  process.exit(1)
}

copyFileSync(index, notFound)
console.log('已生成 dist/404.html（Gitee Pages SPA 回退）')
