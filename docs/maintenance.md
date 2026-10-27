# 个人主页维护与发布

主页地址：https://fridolph.github.io/ 。源码和发布都留在本仓库，与 `fridolph-platform` 和 `fridolph-blog` 独立。

## 分支职责

- `dev`：仓库默认分支，也是日常开发分支。推送后仅运行类型检查和静态构建，不发布线上站点。
- `main`：发布分支。通过 `dev → main` Pull Request 合并后，构建 `dist/` 并用 GitHub Pages 官方 Actions 发布。
- 历史 `master` 分支保留，不参与新流程。

`dev` 不直接发布；在 `dev` 手动运行发布工作流也会被分支条件跳过。开发完成后提交并推送 `dev`，创建目标为 `main` 的 PR，确认检查通过后再合并。

```sh
git switch dev
npm ci
npm run dev
npm run build
npm run preview
```

仓库已将 Settings → Pages → Build and deployment → Source 设置为 **GitHub Actions**，域名保持为空。当前已发布的旧首页继续提供服务，新版在合并到 `main` 后才发布。若以后重新设置仓库，务必先切到 GitHub Actions，再合并新版源码，避免把 Vite 源文件直接作为静态页面发布。

## 六张卡片

所有介绍、链接、配色和封面选项集中在 `src/content.ts`，数组顺序就是书架顺序：**Blog → Resume → Hobby → GitHub → Writing → Learning**，默认选中 Blog。项目合集已并入 GitHub 内页，不再单独显示 Program。

| 书册 | 内页 | 内容 |
| --- | --- | --- |
| Blog | 10 页 / 5 章 | Codex、GraphRAG、Pino 日志、主键迁移、前端缓存 |
| Resume | 8 页 / 4 章 | 三端 Monorepo、公开端、管理端、服务端 |
| Hobby | 14 页 / 7 章 | 羽毛球、棒球、摄影、旅行、音乐、阅读、传统文化 |
| GitHub | 12 页 / 6 章 | my-resume、AI-Journey-Fighting、FE-prepare-interview、my-program、my-element-plus、QiGua |
| Writing | 8 页 / 4 章 | 读史学易、传统智慧体系、随笔、AI Agent |
| Learning | 6 页 / 3 章 | 概念地图、实验与文档链路、持续学习 |

`Blog` 保留 GitHub Pages 主入口与独立域名。`Learning` 同时提供在线阅读和源码入口。`Hobby` 的 `links: []` 表示没有整册外部入口，仍然可以翻阅各章；本轮文字是基于爱好方向的可替换初稿，没有编造地点、成绩、书目与摄影经历。照片与九宫格留待后续补充。

封面由 `src/covers.ts` 绘制，`src/icons.ts` 统一定义本地图标：文章、简历、相机、GitHub 标识、笔与学位帽。封面、详情标题区和列表复用图标，不依赖图标 CDN 或新增 npm 包。修改对应书册的 `icon` 可切换内置图标，自定义图形在 `src/icons.ts` 维护。

需要自定义图片时，将文件放入 `public/covers/` 或 `public/images/`，并在对应卡片设置：

```ts
cover: "/covers/writing.webp",
image: { src: "/images/writing.webp", alt: "写作专栏截图" },
links: [{ label: "阅读知乎专栏", href: "https://www.zhihu.com/people/fridolph/columns" }],
```

`cover` 用作 3D 封面和列表封面，建议图片比例 2:3；`image` 是详情中的补充图。未指定封面或 3D 封面加载失败时，继续使用绘制封面。

## 每册详情背景

`src/content.ts` 中的每册 `background` 独立配置详情背景。`public/backgrounds/` 提供原创 SVG 示例；当前六册分别使用拱门、建筑阶梯、球场山野、城市、湖畔和山林，历史 `program.svg` 保留供替换。示例图随站点发布，无需外部图片服务；后续可直接替换文件，或修改对应配置：

```ts
background: {
  src: "/backgrounds/blog.webp",
  position: "40% center",
  mobileSrc: "/backgrounds/blog-mobile.webp",
  mobilePosition: "35% center",
},
```

`src` 是必填图片路径，建议使用至少 1920×1080 的横图；其他字段均可省略。`position` 控制桌面裁切焦点，默认居中。宽度不超过 880px 时，可通过 `mobileSrc` 使用竖图，`mobilePosition` 调整手机裁切位置；未设置时复用桌面图与焦点。窄屏横置时也按 880px 宽度规则选择图片。

进入详情和切换书册会预加载图片并淡入，旧请求不会覆盖当前书册。手机图片加载失败时尝试桌面图；全部失败或删除 `background` 配置时，使用原主页背景。返回书架仍使用 `img/home_index_img.jpg`。背景图上的暗色遮罩由 `src/style.css` 管理，保证更换明亮图片后仍能阅读文字。

## 响应式布局

- 宽度超过 880px：书本与介绍分列，超宽屏限制内容宽度。
- 880px 及以下：书本在上、介绍在下，详情可纵向滚动；书本高度随屏幕高度变化。
- 560px 及以下：首页选中信息、操作按钮和六册导航分行；翻页与切换按钮保留触摸区域。
- 高度不超过 500px 且宽度至少 560px：详情恢复左右布局，缩小阅读区以适应手机横屏；内容仍可纵向滚动。

支持刘海屏安全区。背景始终覆盖视口，不随详情内容滚走；缩放窗口或旋转设备会重新计算 Three.js 画布尺寸。

## 书本内页与翻阅

每册的 `pages` 是可替换的内页内容。按数组顺序，每两页组成一个跨页：左页简介，右页详情。`spread()` 帮助函数会成对生成书页，同时设置页眉；一组就是一章。每页适合一个短标题、一段约 50–100 字的介绍；完整文章通过书本下方的“本章相关入口”继续阅读。

```ts
pages: [
  { title: "作品缘起", body: "介绍为什么开始这个项目，以及希望解决的问题。" },
  { title: "实践一览", body: "介绍这次实践的重点。", link: { label: "查看项目", href: "https://github.com/Fridolph/my-program" } },
  { title: "过程与思考", body: "补充实现过程或学习记录。" },
  { title: "继续探索", body: "引导读者通过右侧链接查看完整内容。" },
],
```

可选的 `eyebrow` 是页眉，`image` 为插图，`link` 为当前页的外部入口。链接会出现在书本下方、普通纸页和“阅读本页文字”中；Canvas 内文字只作提示。每册目录从左页标题生成，选择章节会依次翻动到目标跨页；过渡时禁用重复操作，Esc 可在当前翻页完成后退出。新增内页后，封面页数、目录和首尾页按钮会自动更新。

进入详情时，书架淡出，所选书本以缩放、位移和旋转进入阅读区。点击封面或“翻开书本”展开 3D 书本；鼠标停留在封面时会轻轻掀起封面。点击左右书页、水平拖动或使用左右方向键翻页，也可以使用下方的翻页按钮。书页随拖动弯曲，拖动不足时平滑回落，翻动过程中镜头略微后移，为扬起的书页留出空间。

右侧“上一册／下一册”会先回收已翻过的内页、合上旧书，再让旧书离开、新书从对应方向进入，右侧介绍同步淡出和渐入。若切换前正在阅读，新书进入后自动翻开第一页；若切换前停在封面，新书仍保持封面状态。手机端若已向下阅读介绍，换册或退出时会先平滑返回书本区域，保证合书过程可见。

点击书本外的左侧空白不会关闭详情。右上角关闭按钮和 Esc 都会等待当前翻页完成，再回收内页、合上封面、收起书本，最后恢复书架与原入口焦点。“合上封面”只合书，保留详情。过渡期间禁用重复翻页、换册；入场或换册过程中按 Esc 会在过渡完成后退出。

“阅读本页文字”提供与纹理一致的可选择文本和图片说明，方便手机阅读与辅助技术访问。WebGL 不可用时，自动使用普通纸页，翻页按钮仍然有效；减少动画偏好会跳过翻书动画。封面、内页、翻页网格由 `src/reader-book.ts` 管理，场景与手势由 `src/reader.ts` 管理。

## 静态资源兼容

根目录的 `00other/`、`01htmlcss/` 等历史图片目录，以及 `img/`、`contributors/`、`other/` 和根目录图片，被其他页面引用。`scripts/copy-legacy-assets.mjs` 会按原路径复制到 `dist/`，不要随意删除或搬迁这些资源。

现有背景 `img/home_index_img.jpg` 保留。Vite 同时生成优化后的引用路径，不影响原图 URL。

## 验收与回滚

发布前执行 `npm run build`，并使用 `npm run preview` 检查：

- 六张卡片的点击、键盘左右切换、详情关闭与焦点返回。
- 六册顺序与图标一致；GitHub 12 页、Blog 10 页、Hobby 14 页，目录与当前跨页入口同步。
- 从封面选择章节、向前与向后跨章、末章返回，以及跨章动画中按 Esc。
- 封面开合、前后翻页、首尾页按钮边界，以及封面／阅读两种状态下的换册。
- 取书入场、换册时的合书与滑入、关闭按钮及 Esc 的合书后返回；阅读中换册会展开新书第一页。
- 动画中途关闭、连续操作、拖动不足回落，均不会出现页码错乱或控件无法恢复。
- 书页点击、拖动和左侧空白点击均保持详情打开；方向键在详情内翻页，详情外切换书本。
- 手机左右滑动与详情滚动，无横向页面溢出。
- 六册背景分别显示，换册淡入、关闭恢复首页；删除背景配置或图片失效时回退原图。
- 检查 1920×1080、1440×900、1024×768、820×1180、390×844、320×740 和 844×390 的书页、按钮与详情布局。
- 所有外部链接准确，Hobby 没有空链接，Writing 跳到知乎专栏。
- 列表模式、减少动画模式，以及 WebGL 不可用时仍可访问各入口。
- `dist/` 中历史静态资源路径与原始仓库一致。

发布失败时，现有成功部署仍然提供服务。需要回滚新版时，通过 PR revert 本次发布提交，或在 main 上恢复上一个可用版本并重新运行发布；不要强推覆盖分支历史。

## 内容来源与更新

本轮于 2026-10-27 核对公开资料并编写摘要：

- GitHub：个人简介与所选六个公开仓库的 README；项目内容由本地配置维护，不在访问时请求 GitHub API。
- Blog：来自 `fridolph-platform/apps/blog/src/content/posts/` 的五篇文章，原文链接通过站点 `posts/<目录名>/` 路由访问。缓存文章为 Priyen Mehta 原文的翻译整理，内页保留来源说明。
- Resume：以本机 `my-resume/README.md` 与当前三端 `package.json` 为准。沿用 rs-web / rs-admin / rs-server 的展示称呼，当前主线目录实际为 apps/web / apps/admin / apps/server，未将旧版本技术栈混入介绍。
- Writing：核对知乎公开专栏的名称、描述与链接；不复制文章全文，也不展示会过期的阅读和关注数据。
- Learning：依据 AI-Journey-Fighting 的公开 README 概括，区分现有学习链路与持续补充的方向。

更换项目或文章时，直接替换成对的 `spread()` 内容及链接。Hobby 的个人故事、照片、歌单与书目待 Owner 补充，不以示例文案作为真实履历。

## 设计参考

交互参考 ThreeUI 的 [Complete Shelf](https://threeui.com/hero/complete-shelf-landing-page)。本项目使用自行实现的场景、图案和交互逻辑，没有直接复制参考页面代码或封面素材。Three.js 由 npm 安装并打包到本站，运行时不依赖 CDN。
