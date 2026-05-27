# 国内部署指南（推荐）

`*.vercel.app` 等国外域名在国内常出现**打不开、很慢**。问卷应部署在**国内云静态托管**或**公司内网服务器**。

## 一、先构建

```bash
cd consultant-beta-survey
npm install
npm run build
```

产物目录：`dist/`（上传此目录内**所有文件**，保持 `assets/` 结构）

打包 zip：`npm run pack` → 生成 `consultant-beta-survey-dist.zip`

---

## 二、阿里云 OSS 静态网站（推荐）

### 1. 创建 Bucket

- 地域：选离门店近的（如华东、华南）
- 读写权限：**公共读**（仅内测静态页；正式环境建议 CDN + 鉴权）
- 版本控制：可关

### 2. 开启静态网站托管

控制台 → Bucket → **数据管理** → **静态页面**：

| 配置项 | 值 |
|--------|-----|
| 默认首页 | `index.html` |
| 默认 404（子目录） | `index.html` |

> 必须让 `/admin` 等路径也返回 `index.html`，否则刷新管理页会 404。  
> 若控制台无「404 指向 index」，请改用下方 **CDN 回源** 或 **Nginx** 方案。

### 3. 上传文件

**控制台**：文件管理 → 上传 `dist` 内全部文件（含 `assets` 文件夹）。

**命令行（ossutil）**：

```bash
# 安装 ossutil 并配置 ak/sk、endpoint 后：
ossutil cp -r dist/ oss://你的Bucket名称/ --update
```

### 4. 访问地址

- 默认：`https://Bucket名.oss-地域.aliyuncs.com/`  
- 绑定自有域名：需 **ICP 备案**，在 OSS/CDN 绑定域名并开启 HTTPS

### 5. 发给同事的链接

| 用途 | 路径 |
|------|------|
| 填写 | `https://你的域名/` |
| 管理 | `https://你的域名/admin?key=内测管理` |

---

## 三、腾讯云 COS 静态网站

1. 创建存储桶 → **公有读私有写**（或私有 + CDN 回源，按公司规范）
2. **基础配置** → **静态网站** → 开启  
   - 索引文档：`index.html`  
   - 错误文档：`index.html`（SPA 路由）
3. **文件列表** → 上传 `dist/` 全部内容
4. 访问：**静态网站域名** 或绑定的自定义域名（备案域名需 ICP）

---

## 四、公司内网 Nginx（已有机房/虚拟机）

将 `dist` 上传到服务器，例如 `/var/www/beta-survey/`。

使用项目内示例配置：[`deploy/nginx.conf`](deploy/nginx.conf)

```bash
# 测试配置后 reload
sudo nginx -t && sudo nginx -s reload
```

内网访问：`http://服务器IP/` 或 `http://survey.intra.company.com/`

---

## 五、对象存储 + CDN（访问量大时）

1. OSS/COS 作源站，仅放 `dist` 静态文件  
2. 国内 CDN 加速域名（需备案）  
3. CDN 配置：**404 / 403 回源** 或 **错误页重定向** 到 `/index.html`（各云控制台名称略有不同）

---

## 六、管理密钥（可选）

默认管理参数：`key=内测管理`。若微信分享乱码，可改为英文：

`.env`：

```env
VITE_ADMIN_KEY=beta-admin-2025
```

然后重新 `npm run build` 再上传 `dist`。

---

## 七、数据收集提醒（与部署地无关）

- 答卷存在**填写者浏览器** localStorage  
- 你在自己电脑打开管理页，**看不到**别人手机上的记录  
- 需：各端导出 Excel/JSON 汇总，或后续 `VITE_USE_API=true` 接国内后端  

---

## 八、不建议

| 方式 | 原因 |
|------|------|
| Vercel / Netlify 默认域名 | 国内访问不稳定 |
| 只发 localhost / 局域网 IP | 外网、其他门店无法访问 |
| 直接双击 `index.html`（file://） | React 路由与资源路径会异常 |

---

## 九、验收清单

- [ ] 手机 **4G** 能打开填写页  
- [ ] `https://域名/admin?key=内测管理` 能进管理页（不是 404）  
- [ ] 提交后出现「感谢参与内测」  
- [ ] 同浏览器管理页能看到刚提交的记录  
