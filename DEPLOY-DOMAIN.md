# 自有域名部署指南（根域名整站 = 问卷）

适用：例如 `https://survey.yourcompany.com` 或 `https://yourcompany.com` 整站只有问卷。

> **大陆服务器 + 大陆域名**：通常需要 **ICP 备案** 后才能正常用 80/443。未备案可先用在香港节点或临时用 IP 测试（以云厂商规则为准）。

---

## 你需要准备的两样东西

| 已有 | 还缺 |
|------|------|
| 域名 | **托管**：存静态文件的地方（二选一见下） |

### 推荐方案（二选一）

| 方案 | 适合 | 月成本大致 |
|------|------|------------|
| **A. 对象存储静态网站**（阿里云 OSS / 腾讯云 COS） | 只要问卷，不跑后端 | 很低，按量 |
| **B. 轻量服务器 + Nginx**（阿里云/腾讯云 Lighthouse） | 以后可能加 API | 约几十元/月 |

下面以 **根域名**、`npm run build` 的 `dist/` 为准（不要用 `build:gitee`）。

---

## 方案 A：阿里云 OSS + 域名（推荐静态站）

### 1. 创建 Bucket

- 地域：大陆（需备案）或香港（备案要求以控制台为准）
- 名称：全局唯一，如 `my-beta-survey`
- 读写权限：**公共读**

### 2. 开启静态网站

- 默认首页：`index.html`
- 默认 404：**index.html**（SPA 必须，否则 `/admin` 404）

### 3. 上传 dist

本地：

```powershell
cd d:\MyPro\consultant-beta-survey
npm run build
```

控制台 → Bucket → 文件管理 → 上传 `dist` 内**全部文件**（含 `assets`）。

### 4. 绑定域名

- Bucket → 传输管理 → **绑定域名**
- 输入你的域名（根域名或 www）
- 按提示在 **域名 DNS** 添加 CNAME 记录

### 5. HTTPS

- 使用 OSS 自带或 CDN 申请免费 SSL 证书
- 开启 **强制 HTTPS**

### 6. 访问

- 填写：`https://你的域名/`
- 管理：`https://你的域名/admin?key=内测管理`

---

## 方案 B：轻量服务器 + Nginx

### 1. 购买轻量应用服务器

- 阿里云 / 腾讯云 Lighthouse，系统选 **Ubuntu 22.04** 或 **CentOS**
- 记下 **公网 IP**

### 2. DNS 解析

在域名服务商添加：

| 类型 | 主机记录 | 记录值 |
|------|----------|--------|
| A | `@` | 服务器公网 IP |
| A | `www` | 同上（可选） |

### 3. 上传 dist 到服务器

本机打包：

```powershell
cd d:\MyPro\consultant-beta-survey
npm run pack
```

用 **WinSCP / FileZilla** 将 zip 解压到服务器 `/var/www/beta-survey/`（index.html 在该目录下）。

### 4. 安装 Nginx 并配置

将项目 [`deploy/nginx-domain.conf`](deploy/nginx-domain.conf) 复制到服务器，**把 `your-domain.com` 改成你的域名**，然后：

```bash
sudo mkdir -p /var/www/beta-survey
# 上传 dist 内容到 /var/www/beta-survey/
sudo cp nginx-domain.conf /etc/nginx/conf.d/beta-survey.conf
sudo nginx -t && sudo systemctl reload nginx
```

### 5. HTTPS（推荐）

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d 你的域名.com -d www.你的域名.com
```

### 6. 访问

同方案 A。

---

## 本地构建命令对照

| 部署目标 | 命令 |
|----------|------|
| 自有域名根路径 `/` | `npm run build` |
| Gitee Pages 子路径 | `npm run build:gitee` |

---

## 我无法代你完成的部分

需要你或运维在控制台操作：

- 购买 OSS / 服务器
- 域名 DNS 解析
- ICP 备案（若用大陆节点）
- SSL 证书签发

我可以在你提供 **域名** 和 **选的方案（A 或 B）** 后，生成填好域名的 Nginx 配置片段。

---

## 数据说明

即使用自己的域名，当前版本数据仍在**各填写者浏览器** localStorage；管理页仅本机可见。要集中汇总需接 API 或导出 JSON/Excel。
