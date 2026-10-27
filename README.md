# Fridolph · 个人收藏架

[个人主页](https://fridolph.github.io/) · Blog / Resume / Hobby / GitHub / Writing / Learning

基于 Vite、TypeScript 和 Three.js 的 3D 单页导航。保留原主页背景，点击封面展开介绍，再跳转到对应网站。手机支持滑动浏览，提供列表视图与减少动画适配。

## 本地开发

需要 Node.js >= 22.12。

```sh
git switch dev
npm ci
npm run dev
```

- `npm run check`：类型检查。
- `npm run build`：检查、构建，并复制历史静态资源。
- `npm run preview`：预览构建结果。

## 维护与发布

日常在 `dev` 开发，检查通过后提交 PR 合并到 `main`，由 Actions 发布 GitHub Pages。`dev` 不触发线上部署。

六册内容统一维护在 `src/content.ts`，包括顺序、图标、背景、内页和跳转地址。GitHub 收录六个项目共 12 页，Blog 收录五篇文章共 10 页，Hobby 收录七项爱好共 14 页；支持章节目录与本章链接。详见 [维护说明](docs/maintenance.md)。
