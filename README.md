# 🍳 Cookoo - 极客自炊菜谱笔记本

Cookoo 是一款专为“单人/独居/租房党”打造的全栈云端菜谱应用。它抛弃了传统数据库的繁重设置，通过 **Cloudflare KV** 实现了国内免翻墙的极速多端同步，配合 AI 大模型一键解析菜谱，让做饭变得异常简单。

## ✨ 核心特性

- **☁️ 全局单机云盘 (Cloudflare KV)**
  - 彻底告别 Firebase 和传统数据库，无惧 GFW 墙。
  - 数据以单文件 JSON 树形式存储于 Cloudflare 边缘节点，毫秒级读取。
  - **跨端无缝同步**：手机点击收藏或添加菜谱，电脑端自动轮询刷新，进度永远保持一致。
- **🤖 AI 智能菜谱解析**
  - 复制小红书、抖音、下厨房的随意文本，AI 自动为你提炼出：备菜清单、烹饪步骤、电磁炉火力、热量预估。
- **📸 极客级前端图片压缩**
  - 支持手机相册高清照片上传。内置 HTML5 Canvas 有损压缩黑科技，在浏览器端将 20MB 的原图极限压缩至 100KB。
  - 彻底解决高清图撑爆云端 KV 数据库的问题，零成本实现图片云同步。
- **🔥 租房党专属厨具模式**
  - **电磁炉模式**：精准提示功率（如：1600W 爆炒，800W 慢炖），自带倒计时。
  - **电饭煲模式**：一锅出懒人专属，“按煮饭键”即可完成饭菜一锅端。
- **📱 响应式 PWA 设计**
  - 界面精美，完美适配手机竖屏与电脑横屏。

## 🛠 技术栈

- **前端框架**: React 18 + Vite
- **UI 样式**: 原生 CSS + Lucide React (图标)
- **后端 API**: Cloudflare Pages Functions (Serverless)
- **云端数据库**: Cloudflare Workers KV
- **AI 接口**: 兼容兼容 OpenAI 格式的大语言模型 (如 DeepSeek / 智谱 / Gemini 等)

## 🚀 部署指南 (仅需 3 分钟)

本项目无需购买服务器和域名，完全白嫖 Cloudflare 生态：

1. **Fork 本仓库** 到你自己的 Github。
2. 登录 **Cloudflare Dashboard** -> `Workers & Pages` -> `Create application` -> `Pages` -> `Connect to Git`。
3. 选择你 Fork 的仓库，构建命令设为 `npm run build`，输出目录设为 `dist`。
4. **配置数据库 (KV)**:
   - 在 Cloudflare 中创建一个 KV 命名空间（例如命名为 `COOKOO_SYNC_DB`）。
   - 进入部署好的 Pages 项目 -> `Settings` -> `Functions` -> `KV namespace bindings`。
   - 添加一个绑定，变量名必须为 **`COOKOO_KV`**，值为你刚才创建的命名空间。
5. **配置 AI 环境变量**:
   - 在 `Settings` -> `Environment variables` 中，配置你的大模型 API 密钥，以便开启 AI 菜谱解析功能。
6. 重新部署 (Retry deployment)，即可享受你的私人专属菜谱！

## 💡 架构设计笔记

作为一款个人工具类 SPA（单页应用），本项目在架构上做出了极客取舍：
- **抛弃关系型数据库**：不建表、不写 SQL。所有数据（包含上传的压缩图片）打包为一棵精简的 JSON 树 (`cookoo_global_state`) 存储于 KV 中。
- **状态覆盖机制 (State Overwrite)**：更新数据时前端执行全量覆盖，利用 NoSQL 极高的并发写入速度，省去了后端复杂的 CRUD 接口开发。
- **防时间差与回声 Bug**：通过生成随机 `clientId` 解决多设备系统时间不一致导致的覆盖问题。

---
*Made with ❤️ for independent cooks.*
