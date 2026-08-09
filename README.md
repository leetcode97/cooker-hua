# 🍳 Cookoo 食光记 · 租房一人食自炊指南

> 专为**租房党、电磁炉/电饭煲用户、快节奏上班族**量身打造的极简烹饪与灵感抽卡 Web 应用。无明火、少油烟、一锅端，轻松点亮每一顿一人食生活！

---

## ✨ 核心特性

- 🍽️ **四大餐型精准选菜**：
  - 🌅 **早餐专区**（8道 · 3~7分钟速做 · 唤醒暖胃）
  - ☀️ **能量午餐**（7道 · 15~20分钟 · 饱腹主食一锅出）
  - 🌙 **治愈晚餐**（6道 · 15~25分钟 · 暖心焖煲轻负担）
  - 🌌 **深夜食堂**（4道 · 5~8分钟 · 抚慰解馋小面锅）
- 🎴 **独立二级抽灵感卡**：进入各餐专区，抽卡只在当前分类的菜谱中抽取，解决“今天吃什么”选择困难症。
- 🧺 **家里有什么 · 双轨匹配**：
  - 📖 **本地菜单匹配**：勾选冰箱存货，智能计算菜谱契合度与缺料提醒；
  - 🌐 **AI 实时联网灵感**：支持接入 **DeepSeek / Kimi / 通义千问 / OpenAI** 等大模型，根据你的特殊存货实时构思电磁炉快手做法并一键保存！
- 📝 **帮我整理菜谱**：粘贴笔记或口述流水账，AI 自动提炼食材用量、火力步骤并指定归类到相应餐型。
- ⚡ **无明火烹饪标签**：每道菜品精准标注 **`⚡ 电磁炉`**（含建议功率如 1200W/1600W）与 **`🍚 电饭煲`** 一键焖焗指南。
- 🎖️ **自炊生活里程碑**：真实记录自炊顿数，点亮“🌱 自炊萌新”到“👑 满级掌勺大师”成长勋章。
- 💾 **本地文件持久化存储**：告别浏览器 Cookie 丢失烦恼，基于本地 JSON 数据库与一键备份导出。

---

## 🛠️ 技术栈

- **前端 UI**：React 19 + Vite 8 + Lucide Icons + Canvas Confetti
- **后端服务**：Node.js + Express
- **数据持久化**：本地 JSON 数据库 (`data/database.json`)
- **AI 引擎**：支持接入任意 OpenAI 兼容大模型（DeepSeek / Moonshot / DashScope 等）

---

## 📂 项目结构

```text
cooker/
├── data/
│   ├── database.json          # 本地菜谱与用户做饭数据持久化文件
│   └── config.json            # AI 接口配置（自动生成，已加入 gitignore）
├── public/                    # 静态资源与 PWA 图标
├── src/
│   ├── components/            # 模态弹窗与通用组件
│   │   ├── AiConfigModal.jsx  # AI 密钥设置
│   │   ├── AiRecipeOrganizerModal.jsx  # 帮我整理菜谱
│   │   ├── FridgeHeroModal.jsx         # 家里有什么智能匹配
│   │   ├── RecipeDetailModal.jsx       # 菜谱详情与火力参数
│   │   ├── CookingModeModal.jsx        # 专注做菜步骤模式
│   │   └── AddRecipeModal.jsx          # 发布自定义菜谱
│   ├── views/                 # 核心页面视图
│   │   ├── HomeView.jsx       # 首页餐型选择与成就卡
│   │   ├── MealCategoryView.jsx # 早餐/午餐/晚餐/夜宵二级独立抽卡页
│   │   ├── DiscoverView.jsx   # 发现与全部菜谱库
│   │   ├── JournalView.jsx    # 美食日记与做饭打卡
│   │   └── ProfileView.jsx    # 个人成就与数据管理
│   ├── data/
│   │   └── defaultDatabase.js # 初始 25 道精选租房菜谱预设
│   ├── App.jsx                # 主应用路由与状态调度
│   └── main.jsx               # 应用入口
├── server.js                  # 后端 API 与 AI 转发服务
├── 启动Cookoo食光记.bat       # Windows 桌面一键双击启动脚本
└── package.json
```

---

## 🚀 本地运行与开发

### 1. 安装依赖
```bash
npm install
```

### 2. 启动本地服务
同时启动后端与前端开发服务器：
```bash
# 启动后端 API（端口 3001）
node server.js

# 启动前端开发服务器（端口 5173）
npm run dev
```

浏览器访问：[`http://localhost:5173`](http://localhost:5173)

---

## ☁️ 免费云端部署（24小时在线访问）

本项目支持无缝部署至 **Render / Railway / Vercel** 等免费托管平台：

1. 将代码 Push 至你的 GitHub 仓库；
2. 在 **Render.com** 新建 **Web Service** 并绑定该仓库；
3. 构建命令：`npm install && npm run build`
4. 启动命令：`node server.js`
5. 即可生成专属 HTTPS 访问网址，手机、平板随时打开！

---

## 📄 开源许可证

本项目基于 [MIT License](LICENSE) 开源。
