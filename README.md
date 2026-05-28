# 在线简历生成

一个基于 React + TypeScript 的在线简历编辑与导出工具，支持实时预览、数据导入导出、PDF 打印等功能。

## 功能特性

- **实时预览**：编辑内容即时同步到简历预览
- **多模块支持**：教育经历、工作经历、项目经验、个人作品、技能、证书、语言能力、自我评价、自定义模块
- **数据持久化**：数据存储在浏览器 localStorage，刷新不丢失
- **导入导出**：支持 JSON 格式数据导入导出，方便跨设备迁移
- **PDF 导出**：一键打印导出为 PDF 文件
- **响应式设计**：支持桌面端和移动端
- **照片上传**：支持证件照上传与压缩
- **链接支持**：支持个人博客、邮箱、项目链接等超链接
- **个人作品模块**：支持两种显示模式（默认/链接包裹）

## 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite 5
- **状态管理**：Zustand 4
- **样式方案**：TailwindCSS 3 + CSS 变量
- **表单处理**：react-hook-form + zod

## 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 http://localhost:5173 即可使用。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 部署到 Cloudflare Workers

本项目支持通过 GitHub 直接关联部署，无需本地安装 wrangler。

### 部署步骤

1. **Fork** 本仓库到你的 GitHub 账号
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 进入 **Workers & Pages** → **Create Application** → **Connect to Git**
4. 选择你 Fork 后的仓库，Cloudflare 会自动检测 `wrangler.toml` 配置
5. 点击 **Deploy** 完成部署

> 注意：默认配置 `workers_dev = false`，如需使用 `*.workers.dev` 免费域名，请修改 `wrangler.toml` 中的 `workers_dev = true`

## 数据导入导出

- **导出**：点击编辑器顶部"导出"按钮，下载 JSON 格式数据文件
- **导入**：点击"导入"按钮，选择之前导出的 JSON 文件即可恢复数据

## 项目结构

```
online-resume/
├── public/              # 静态资源
│   └── favicon.svg      # 网站图标
├── src/
│   ├── components/      # 通用组件
│   │   ├── EditorPanel.tsx      # 编辑器面板
│   │   ├── ItemEditor.tsx       # 条目编辑组件
│   │   ├── MobileToggle.tsx     # 移动端切换
│   │   ├── PhotoUpload.tsx      # 照片上传
│   │   ├── PreviewPanel.tsx     # 预览面板
│   │   └── SectionEditor.tsx    # 模块编辑器
│   ├── sections/        # 各模块编辑器
│   │   ├── BasicsEditor.tsx     # 个人信息编辑
│   │   └── index.tsx            # 各模块编辑器集合
│   ├── store/           # 状态管理
│   │   └── resumeStore.ts       # Zustand store
│   ├── styles/          # 样式文件
│   │   ├── index.css            # 全局样式
│   │   ├── print.css            # 打印样式
│   │   └── resume.css           # 简历样式
│   ├── templates/       # 简历模板
│   │   └── ResumeTemplate.tsx   # 简历渲染模板
│   ├── types/           # 类型定义
│   │   └── resume.ts            # 简历数据结构
│   ├── utils/           # 工具函数
│   │   ├── helpers.ts           # 通用工具
│   │   ├── image.ts             # 图片处理
│   │   └── importExport.ts      # 导入导出
│   ├── App.tsx          # 根组件
│   └── main.tsx         # 入口文件
├── index.html           # HTML 模板
├── wrangler.toml        # Cloudflare Workers 配置
├── vite.config.ts       # Vite 配置
├── tailwind.config.js   # TailwindCSS 配置
├── tsconfig.json        # TypeScript 配置
└── package.json         # 项目配置
```

## 许可证

MIT
