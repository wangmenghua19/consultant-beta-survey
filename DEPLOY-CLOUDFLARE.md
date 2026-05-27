# Cloudflare Pages 部署指南

适合：代码在 GitHub，希望 **自动构建 + 免费 HTTPS + 可绑自己的域名**。

> 国内门店访问：Cloudflare 通常比 Vercel/Render 好一些，但仍不如阿里云 OSS / Gitee Pages 稳定。建议先手机 4G 试开。

---

## 方式一：连接 GitHub（推荐，自动部署）

### 1. 登录 Cloudflare

打开 https://dash.cloudflare.com 注册/登录。

### 2. 创建 Pages 项目

1. 左侧 **Workers & Pages** → **Create**
2. 选 **Pages** → **Connect to Git**
3. 授权 **GitHub**，选择仓库：`wangmenghua19/consultant-beta-survey`
4. 点击 **Begin setup**

### 3. 构建配置

| 配置项 | 填写 |
|--------|------|
| Project name | `consultant-beta-survey`（自定，影响默认域名） |
| Production branch | `main` |
| Framework preset | **Vite** 或 **None** |
| Build command | `npm run build` |
| Build output directory | `dist` |

**Environment variables（可选）**：

| Name | Value |
|------|--------|
| `NODE_VERSION` | `20` |

### 4. 保存并部署

点 **Save and Deploy**，等待首次构建成功（约 2～5 分钟）。

### 5. 访问地址

默认域名形如：

```text
https://consultant-beta-survey.pages.dev/
```

| 用途 | 路径 |
|------|------|
| 填写 | `/` |
| 管理 | `/admin?key=内测管理` |

SPA 路由已靠 `public/_redirects`（构建后进 `dist/_redirects`）处理，**无需再配 Rewrite**。

### 6. 绑定自己的域名（你有域名时）

1. Pages 项目 → **Custom domains** → **Set up a custom domain**
2. 输入域名，如 `survey.example.com` 或根域名
3. 若域名已在 Cloudflare：**自动**添加 DNS
4. 若域名在其它注册商：按提示添加 **CNAME** 到 `xxx.pages.dev`
5. 等待 SSL 签发（通常几分钟）

根域名用 **`npm run build`**（默认 `base: /`），不要用 `build:gitee`。

---

## 方式二：命令行直接上传 dist（不连 Git）

```powershell
cd d:\MyPro\consultant-beta-survey
npm install
npm run build
npx wrangler login
npx wrangler pages project create consultant-beta-survey --production-branch main
npx wrangler pages deploy dist --project-name=consultant-beta-survey
```

或使用 package 脚本：

```powershell
npm run deploy:cf
```

---

## 以后更新

- **Git 方式**：`git push origin main` 后 Cloudflare 自动重新构建
- **CLI 方式**：改代码 → `npm run deploy:cf`

---

## 常见问题

### 构建失败

- 本地先执行 `npm run build` 确认能通过
- Cloudflare 构建日志里看 Node 版本，建议 20

### `/admin` 404

- 确认 `dist/_redirects` 存在且内容为 `/* /index.html 200`
- 重新部署一次

### 国内打不开

- 换 Gitee Pages 或国内 OSS（见 DEPLOY-CN.md）
- 或域名接入 Cloudflare 后开 CDN（视账号而定）

### 管理页没有别人数据

- 数据在填写者浏览器 localStorage，与托管平台无关

---

## 与 Render 对比

| | Cloudflare Pages | Render |
|--|------------------|--------|
| 绑国外卡 | 一般不需要 | 常需要 |
| 国内访问 | 中等 | 较差 |
| 自动部署 Git | 支持 | 支持 |
