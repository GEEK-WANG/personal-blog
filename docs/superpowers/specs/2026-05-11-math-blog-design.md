# 数学笔记博客 · 设计方案

> **日期：** 2026-05-11
> **状态：** 已确认

---

## 目标

将 Obsidian Vault 中的数学笔记（LaTeX 公式 + Wiki 双链 + callout 标注）部署为一个公开博客，支持按文件夹分类浏览、知识图谱查看，发布状态由 frontmatter `publish` 字段控制。

## 技术选型

- **站点生成器：** Quartz（支持 Obsidian Wiki 链接、callout、LaTeX、反向链接、知识图谱）
- **托管：** GitHub Pages（免费）
- **构建：** GitHub Actions（推送代码后自动构建部署）
- **本地同步命令：** `npm run deploy`

## 前置条件

- 注册 GitHub 账号并创建一个公开仓库（repository）
- 本地安装 Node.js 和 Git
- 启用仓库的 GitHub Pages 和 GitHub Actions 权限

## 架构

```
[Obsidian Vault（本地）]
    │ git push
    ▼
[GitHub 代码仓库]
    │ GitHub Actions 触发
    ▼
[Quartz 构建]
    ├── 解析 .md → HTML
    ├── KaTeX 渲染 LaTeX
    ├── Wiki 链接 → 网页链接
    ├── 生成知识图谱 JSON
    └── 输出静态文件
    │ 部署
    ▼
[GitHub Pages]  ──── 用户浏览器访问
```

## 页面结构

### 首页
1. **顶部导航栏** — 首页 / 分类 / 知识图谱 / 搜索
2. **贪吃蛇像素动画** — 50×8 网格，复用现有模板代码
3. **分类筛选按钮** — 全部 / 零基础 / 极限 / 积分
4. **笔记卡片网格** — 每篇已发布笔记一张卡片（标题 + 分类路径 + 日期 + 摘要；摘要来自 frontmatter 的 `description` 字段，未填写时自动取正文前 200 字）
5. **底栏** — 版权信息

### 笔记详情页
- 完整渲染的笔记内容（LaTeX 公式、callout 框、Wiki 链接均可点击跳转）
- 页面底部显示反向链接列表
- 可跳转至知识图谱页面

### 知识图谱页
- 独立的交互式关系图谱（Quartz 内置）
- 展示笔记之间的链接关系

### 分类浏览
- 首页分类按钮筛选
- 或按文件夹层级逐级浏览

## 视觉风格

- **底色：** 暗色（深灰/黑底）+ 毛玻璃卡片（backdrop-filter: blur）
- **主色调：** 学术蓝灰 `#64b5f6` / `#90caf9` / `#42a5f5`
- **强调色：** 蓝色系，用于链接、按钮、选中状态
- **字体：** 系统无衬线字体，中文优先苹方 / 微软雅黑
- **LaTeX 公式：** 背景略亮于正文，便于阅读

## 内容发布控制

### Frontmatter 规则
```yaml
---
title: 数学归纳法
date: 2025-01-20
tags: [数学, 证明]
publish: true   # true = 发布；false 或不写 = 不发布
---
```

### 同步流程
1. 在 Obsidian 里编辑笔记，设置 `publish: true`
2. 本地终端执行 `npm run deploy`
3. GitHub Actions 自动构建并部署到 GitHub Pages
4. 1-2 分钟后网站内容更新

## 复用现有资源

| 来源 | 内容 |
|------|------|
| `web/js/index.js` | 贪吃蛇像素动画逻辑（50×8 网格、随机游走） |
| `web/css/index.css` | 像素网格样式、毛玻璃卡片样式 |
| `web/font/` | 字体文件（可选复用） |

## 不做的事情

- 评论系统（暂不引入）
- 函数图像实时渲染（后续迭代）
- RSS 订阅（暂不需要）
- 多语言支持
