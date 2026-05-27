# GitHub + Render 部署

> Render 服务器在**国外**，国内同事访问可能仍慢或被拦。正式给门店请用 [DEPLOY-CN.md](./DEPLOY-CN.md)。

## 1. 推送到 GitHub

在项目目录：

```bash
cd d:\MyPro\consultant-beta-survey
git init
git add .
git commit -m "feat: consultant beta survey SPA"
```

在 GitHub 新建空仓库（如 `consultant-beta-survey`），然后：

```bash
git remote add origin https://github.com/你的用户名/consultant-beta-survey.git
git branch -M main
git push -u origin main
```

## 2. 在 Render 创建 Static Site

1. 登录 https://render.com （可用 GitHub 登录）
2. **New +** → **Static Site**
3. 连接刚推送的 GitHub 仓库
4. 配置（也可自动读 `render.yaml`）：
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. **Advanced** → Redirects/Rewrites（若未读 yaml）：
   - `/*` → `/index.html`（Rewrite）
6. **Create Static Site**，等待首次构建完成

## 3. 访问链接

- 填写：`https://你的服务名.onrender.com/`
- 管理：`https://你的服务名.onrender.com/admin?key=内测管理`

免费实例冷启动可能需等待几十秒。

## 4. 更新

推送到 `main` 分支后 Render 会自动重新构建。
