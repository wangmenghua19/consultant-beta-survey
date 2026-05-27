# Cloudflare Pages 部署指南

适合：代码在 GitHub，希望 **自动构建 + 免费 HTTPS + 可绑自己的域名**。

> 国内门店访问：Cloudflare 通常比 Vercel/Render 好一些，但仍不如阿里云 OSS / Gitee Pages 稳定。建议先手机 4G 试开。

---

## 方式一：连接 GitHub（Workers & Pages 统一入口）

> 新版控制台里 **Workers 和 Pages 在一起**，没有单独的「只选 Pages」。  
> 本项目用 **静态资源 + wrangler.toml**（见仓库根目录 `[assets]`）。

### 1. 登录 Cloudflare

打开 https://dash.cloudflare.com 注册/登录。

### 2. 创建应用

1. **Workers & Pages** → **创建应用程序** → **连接到 Git**
2. 仓库：`wangmenghua19/consultant-beta-survey`
3. 项目名：`consultant-beta-survey`

### 3. 构建配置（照此填写）

| 配置项 | 填写 |
|--------|------|
| 构建命令 | `npm run build` |
| **部署命令** | `npx wrangler deploy` |
| 非生产分支部署命令 | **留空**（删掉 `wrangler versions upload`） |
| 路径 / 根目录 | `/` |

**不要**再单独找「输出目录 dist」——由 `wrangler.toml` 里 `[assets] directory = "./dist"` 指定。

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

SPA 路由由 `wrangler.toml` 的 `not_found_handling = "single-page-application"` 处理（`/admin` 不 404）。

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

### 构建失败 `npm error E401` / Incorrect or missing password

原因：`package-lock.json` 里若出现 `packages.aliyun.com` 等**国内私有源**，Cloudflare 无法认证。

解决：仓库已加 `.npmrc` 固定 `registry.npmjs.org`，本地删除 lock 后重装：

```powershell
Remove-Item package-lock.json
npm install
git add package-lock.json .npmrc
git push
```

Cloudflare 里**不要**配置错误的 `NPM_TOKEN` 环境变量（没有私有包可删掉）。

### deploy 失败 `Missing entry-point to Worker script`

说明 `wrangler.toml` 缺少 `[assets]`。请拉取最新 `main`（已包含 `directory = "./dist"`），并确认：

- 构建命令：`npm run build`
- 部署命令：`npx wrangler deploy`

### 其它构建失败

- 本地先执行 `npm run build` 确认能通过
- Cloudflare 构建日志里看 Node 版本，建议 20

### deploy 失败 `Invalid _redirects` / Infinite loop

原因：`public/_redirects`（`/* /index.html 200`）与 `wrangler.toml` 的 `not_found_handling = "single-page-application"` **不能同时使用**。

解决：仓库已删除 `_redirects`，仅依赖 `wrangler.toml` 做 SPA。拉取最新 `main` 后重新部署。

### `/admin` 404

- 确认 `wrangler.toml` 含 `not_found_handling = "single-page-application"`
- **不要**在 `dist` 里再放 `_redirects`
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
