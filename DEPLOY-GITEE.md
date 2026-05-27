# Gitee Pages 部署指南（国内访问，无需 VPN）

适合：**不想绑国外信用卡**、**门店不用 VPN** 也能打开问卷。

访问地址示例（部署成功后）：

```text
https://wangmenghua19.gitee.io/consultant-beta-survey/
```

管理页：

```text
https://wangmenghua19.gitee.io/consultant-beta-survey/admin?key=内测管理
```

> 将 `wangmenghua19`、`consultant-beta-survey` 换成你的 Gitee 用户名和仓库名。

---

## 前置条件

1. 注册 [Gitee](https://gitee.com/) 并完成 **实名认证**（开通 Pages 一般要求）
2. 本机已安装 Node.js、Git
3. 仓库名建议与 GitHub 一致：`consultant-beta-survey`（与 `vite` 的 `base` 路径一致）

---

## 第一步：把代码放到 Gitee

### 方式 A：从 GitHub 导入（最简单）

1. 登录 Gitee → 右上角 **+** → **从 GitHub / GitLab 导入仓库**
2. 填写 GitHub 地址：`https://github.com/wangmenghua19/consultant-beta-survey`
3. 导入完成后得到 Gitee 仓库，例如：  
   `https://gitee.com/wangmenghua19/consultant-beta-survey`

### 方式 B：本地推送

```powershell
cd d:\MyPro\consultant-beta-survey
git remote add gitee https://gitee.com/你的用户名/consultant-beta-survey.git
git push gitee main
```

---

## 第二步：本地构建（Gitee 专用）

在项目目录执行：

```powershell
cd d:\MyPro\consultant-beta-survey
npm install
npm run build:gitee
```

会生成 `dist/`，其中包含 `index.html`、`404.html`（SPA 路由）、`assets/`。

若 Gitee 仓库名**不是** `consultant-beta-survey`，先设置再构建：

```powershell
$env:GITEE_REPO="你的仓库名"
npm run build:gitee
```

---

## 第三步：把 dist 推到 `gitee-pages` 分支

### 方式 A：网页上传（不用命令行）

1. 打开 Gitee 仓库 → **管理** → **分支管理** → 新建分支 `gitee-pages`（空分支也可）
2. 进入 `gitee-pages` 分支 → **上传文件**
3. 将 `dist` 文件夹里**所有内容**拖进去（`index.html`、`404.html`、`assets` 等，不要只传 dist 文件夹外壳）
4. 提交

### 方式 B：脚本推送（已配置 gitee 远程时）

```powershell
npm run build:gitee
powershell -ExecutionPolicy Bypass -File scripts\push-gitee-pages.ps1
```

---

## 第四步：开启 Gitee Pages

1. 打开仓库 → 左侧 **服务** → **Gitee Pages**（或 **Pages**）
2. 选择：
   - **部署分支**：`gitee-pages`
   - **部署目录**：`/`（根目录，即 index.html 所在层）
3. 点击 **启动** / **更新**
4. 等待 1～3 分钟，页面会显示访问地址

---

## 第五步：验证

| 检查项 | 地址 |
|--------|------|
| 填写页 | `https://用户名.gitee.io/仓库名/` |
| 管理页 | `https://用户名.gitee.io/仓库名/admin?key=内测管理` |
| 手机 4G | 不连 VPN 应能打开 |

提交一条后，在**同一手机浏览器**打开管理页，应能看到 1 条记录（数据在本地，不跨设备）。

---

## 以后更新问卷

1. 改代码 → `npm run build:gitee`
2. 重新上传 / 推送 `gitee-pages` 分支的 `dist` 内容
3. Gitee Pages 控制台点 **更新**

若代码在 `main` 分支，也可只更新业务代码后重复第二步、第三步，不必改 Pages 分支设置。

---

## 常见问题

### 1. 页面空白

- 确认 Pages 地址是否带仓库名路径（项目页不是根域名）
- 是否用了 `npm run build:gitee`（不要用普通 `npm run build` 上传 Gitee）
- 浏览器 F12 看是否 404 加载 `assets/xxx.js`

### 2. `/admin` 404

- 确认 `dist` 里是否有 **404.html**（与 index.html 同级）
- 重新 `npm run build:gitee` 再上传

### 3. 提示需要实名认证

- Gitee Pages 免费版通常需 **实名认证** 后才能启动

### 4. 管理页 0 条、别人填了我看不到

- 正常：数据在各自浏览器 localStorage
- 需导出 Excel/JSON 汇总，或后续接国内 API

### 5. 仓库名改了

构建前：`$env:GITEE_REPO="新仓库名"` 再 `npm run build:gitee`

---

## 与 Render / Vercel 对比

| | Gitee Pages | Render |
|--|-------------|--------|
| 国内访问 | 较好 | 常打不开 |
| 绑国外卡 | 不需要 | 常需要 |
| 自动部署 | 需手动更新 pages 分支 | 可连 GitHub 自动 |

正式内测推荐：**Gitee Pages（对外）+ 国内 OSS（企业正式）**。
