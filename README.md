# 顾问跟进系统 · 内测问卷

独立轻量级内测问卷 SPA，用于收集门店人员内测意愿、AI 接受度与反馈习惯，并自动计算开放度评分、推荐等级与用户标签。

**离线优先**：无需后端与门店接口，基础信息为门店（手动输入）、姓名、岗位。

## 技术栈

- React 18 + TypeScript + Vite
- Ant Design 5
- localStorage 持久化（可切换 HTTP API）

## 快速开始

```bash
cd consultant-beta-survey
npm install
npm run dev
```

- 填写页：http://localhost:5173/
- 管理页：http://localhost:5173/admin?key=内测管理

## 部署（国内）

**请勿使用 Vercel 等国外域名给国内门店访问**（易打不开）。

1. `npm run build`
2. 将 `dist/` 上传到 **阿里云 OSS / 腾讯云 COS 静态网站**，或公司 **Nginx**

详细步骤见 **[DEPLOY-CN.md](./DEPLOY-CN.md)**（含 OSS/COS/Nginx、SPA 404 配置、链接格式）。

海外临时测试见 [DEPLOY.md](./DEPLOY.md)。GitHub + Render 见 [DEPLOY-RENDER.md](./DEPLOY-RENDER.md)。

### 数据存放说明

- 问卷答案保存在**当前浏览器**的 `localStorage` 中
- **不跨设备、不跨浏览器同步**
- 多人多机收集时：请在各台设备的浏览器打开管理页，使用「导出 JSON / Excel」后由产品人工汇总；或后续接入 `VITE_USE_API=true` 统一上报

## 环境变量

复制 `.env.example` 为 `.env`：

| 变量 | 说明 |
|------|------|
| `VITE_USE_API` | `true` 时使用 `HttpSurveyRepository` |
| `VITE_API_BASE` | API 前缀，默认 `/api/beta-survey` |
| `VITE_ADMIN_KEY` | 管理页 URL 参数 `key` 校验值 |

## 后续接入真实接口

1. 后端实现与 `SurveySubmission` 一致的 DTO（含 `respondentName`）
2. 提供 `POST /submissions`、`GET /submissions`、`DELETE /submissions/:id`
3. 设置 `VITE_USE_API=true`
4. 管理页可从 localStorage 导出 JSON 后一次性导入（或增加导入按钮）

详见 `src/services/http.repository.ts`。

## 业务说明

- **基础信息**：门店、姓名、岗位
- **A 级 / 种子用户**：高内测意愿 + 愿反馈 + 开放度 ≥ 70
- **标签**：用于管理页筛选与 Excel 导出
- **开放度评分**：新系统习惯、AI 接受、反馈习惯、共建意愿加权（0–100）
- **重复提交**：同日同门店 + 姓名 + 岗位会提示确认
