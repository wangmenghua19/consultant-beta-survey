# 海外/临时部署指南

> **国内门店访问请用 [DEPLOY-CN.md](./DEPLOY-CN.md)**（阿里云 OSS、腾讯云 COS、内网 Nginx）。  
> 下文 Netlify/Vercel 等国外托管在国内常无法访问。

问卷是纯静态页面，**不需要数据库和后端**。要让外网/其他网络的同事访问，只需把 `dist/` 放到**公网可访问的静态托管**上。

## 重要：数据存在哪里？

| 场景 | 说明 |
|------|------|
| 填写页 | 数据保存在**填写者手机/电脑浏览器**的 localStorage |
| 管理页 | 只能看到**本浏览器**里提交的记录 |
| 跨网络多人填写 | 产品侧**无法**在你电脑上自动看到各门店数据，除非：每人导出 JSON 发你、或后续接 API |

内测建议：部署公网填写链接；收集数据时让同事在管理页导出，或后续开启 `VITE_USE_API`。

---

## 方式一：Netlify Drop（推荐，约 2 分钟）

无需写代码、无需同一局域网。

1. 在本项目执行：`npm run build`
2. 打开：https://app.netlify.com/drop
3. 把文件夹 **`dist`** 整个拖进页面（不是 zip）
4. 获得类似 `https://随机名.netlify.app` 的地址
5. 发给门店：
   - 填写：`https://你的域名/`
   - 管理：`https://你的域名/admin?key=内测管理`（仅产品/HR 使用，勿公开 key）

刷新部署：再次拖入新的 `dist` 即可覆盖。

---

## 方式二：Cloudflare Pages

1. 登录 https://dash.cloudflare.com → Workers & Pages → Create → Pages → Upload assets
2. 上传 `dist` 内所有文件（或连 dist 文件夹上传）
3. Build 设置可留空（已是构建产物）
4. 绑定自定义域名（可选）

---

## 方式三：国内对象存储静态网站（企业常用）

适用于已有阿里云 OSS / 腾讯云 COS：

1. `npm run build`
2. 将 `dist/` 内全部文件上传到 Bucket
3. 开启「静态网站托管」，默认首页 `index.html`
4. 配置 CDN 域名 + HTTPS
5. **错误文档/404 回退**也指向 `index.html`（React 路由需要）

---

## 方式四：打包 zip 交给运维

```bash
npm run pack
```

生成：`consultant-beta-survey-dist.zip`（在项目根目录）

交给运维解压到任意 Nginx/Apache 静态目录，并配置 SPA 回退到 `index.html`。

本地预览（仅你自己局域网测试）：

```bash
npm run build
npm run preview
# 或 npx serve dist -l 4173
```

---

## 方式五：Vercel（需登录一次）

```bash
cd consultant-beta-survey
npm i -g vercel
npm run build
vercel deploy dist --prod
```

按提示浏览器登录 Vercel 即可。

项目已包含 `vercel.json`（SPA 路由）和 `public/_redirects`（Netlify）。

---

## 链接清单（部署后替换为你的域名）

| 用途 | 路径 |
|------|------|
| 门店填写 | `/` |
| 管理导出 | `/admin?key=内测管理` |

管理密钥可在 `.env` 中改 `VITE_ADMIN_KEY` 后重新 `npm run build`。

---

## 当前本机产物

- 构建目录：`dist/`
- 压缩包：`consultant-beta-survey-dist.zip`（`npm run pack`）
