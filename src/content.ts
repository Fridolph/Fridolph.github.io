export interface ReadingPage {
  title: string;
  body: string;
  eyebrow?: string;
  image?: { src: string; alt: string };
  link?: { label: string; href: string };
}

export interface Volume {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  note: string;
  color: string;
  accent: string;
  icon: "blog" | "resume" | "hobby" | "github" | "writing" | "learning";
  cover?: string;
  background?: { src: string; position?: string; mobileSrc?: string; mobilePosition?: string };
  image?: { src: string; alt: string };
  pages: ReadingPage[];
  links: { label: string; href: string }[];
}

function spread(title: string, overview: string, detailTitle: string, detail: string, link?: ReadingPage["link"]): ReadingPage[] {
  return [
    { title, body: overview, eyebrow: "INTRODUCTION" },
    { title: detailTitle, body: detail, eyebrow: "A CLOSER LOOK", link },
  ];
}

const blogPost = (slug: string): string => `https://fridolph.github.io/fridolph-blog/posts/${slug}/`;
const repository = (name: string): ReadingPage["link"] => ({ label: "查看项目源码", href: `https://github.com/Fridolph/${name}` });

export const volumes: Volume[] = [
  {
    id: "blog", title: "Blog", subtitle: "技术文章、实践记录与随笔",
    description: "把遇到的问题、走过的弯路和逐渐想清楚的事情写下来。这一册选了五篇文章，从 Codex 协作、GraphRAG 调试，到数据库迁移、日志与缓存。每个跨页，都是一次实践的起点与回望。",
    category: "NOTES & PRACTICE", note: "五篇选读，沿着问题走进实践。",
    color: "#8a4339", accent: "#f0d6b2", icon: "blog",
    background: { src: "/backgrounds/blog.svg", position: "center", mobilePosition: "35% center" },
    pages: [
      ...spread("把 Codex 用进日常开发", "读完 OpenAI 的三篇官方指南后，我把提示词、项目规范与验证循环整理成一条协作路径。重点是怎样让 AI 理解任务、保留上下文，并对完成结果负责。", "从一次提问到持续协作", "从写清目标与约束开始，再用 Plan、AGENTS.md 和 Skills 保存工作方式。文章继续讨论 Shell、上下文压缩，以及 AI 参与规划、开发、审查与运维时的分工。", { label: "阅读 Codex 指南整理", href: blogPost("2026-03-21__use-codex") }),
      ...spread("GraphRAG 的一次静默失败", "同一套问答流水线，两个问题成功，第三个却查不到数据。这篇从一个奶茶知识图谱出发，追踪 LLM 生成 Cypher、执行查询到组织回答的完整过程。", "把真实图谱交给模型", "问题藏在生成的查询与真实图谱不一致。沿着查询语句、节点关系和检索结果逐步排查，再动态注入真实图谱信息，减少模型凭空猜测，让失败能被解释。", { label: "阅读 GraphRAG 调试实录", href: blogPost("2026-06-16__neo4j-graphrag") }),
      ...spread("后端如何看见一次请求", "用户报告保存失败，手里只有一个请求 id；查日志却找不到完整轨迹。这篇记录给 NestJS 后端接入结构化日志的过程，让请求发生了什么真正有迹可循。", "从字符串到结构化日志", "分清 pino、pino-http 和 nestjs-pino 的职责，记录请求方法、路径、状态与耗时。借助 reqId 关联异常，用字段查询替代模糊搜索，也讨论日志脱敏与输出边界。", { label: "阅读 Pino 日志实践", href: blogPost("2026-09-13__logging-with-pino") }),
      ...spread("主键选择与真实迁移", "一串难以人工核对的主键，触发了一次关于标识的重新思考。文章区分会对外出现的实体与内部字典，记录从选型判断到实际迁移的取舍。", "迁移前先想清回退", "比较自增、cuid 与 UUID 的特点，再处理外键、历史数据与接口契约。一次迁移不只是改字段类型，还要准备备份、核对步骤与回退路径，理解不可逆操作的成本。", { label: "阅读主键与迁移记录", href: blogPost("2026-08-19__primary-key-and-migration") }),
      ...spread("重新认识前端缓存", "性能优化不只有懒加载和代码分割。缓存能减少重复请求，也能改善再次访问的体验。这篇翻译整理从浏览器缓存出发，梳理前端不同层次的缓存策略。", "让缓存有明确的边界", "围绕 Cache-Control、数据复用与失效策略思考：什么可以缓存，保留多久，如何更新。本文基于 Priyen Mehta 的原文翻译与润色，原文出处保留在完整文章中。", { label: "阅读前端缓存整理", href: blogPost("2025-06-28__fe-cache") }),
    ],
    links: [
      { label: "阅读博客", href: "https://fridolph.github.io/fridolph-blog/" },
      { label: "独立域名入口", href: "https://blog.fridolph.top" },
    ],
  },
  {
    id: "resume", title: "Resume", subtitle: "经历、技能与全栈简历实践",
    description: "一份简历，也是一套持续演进的全栈产品。公开展示、后台编辑与服务端 API 各司其职，以 pnpm workspace 和 Turbo 组织 Monorepo，把内容编辑、发布、导出与 AI 探索连成一个闭环。",
    category: "EXPERIENCE & CRAFT", note: "通过作品，认识一个人。",
    color: "#c4baa0", accent: "#35433e", icon: "resume",
    background: { src: "/backgrounds/resume.svg", position: "center", mobilePosition: "35% center" },
    pages: [
      ...spread("一份简历，三个端", "从个人介绍出发，把简历做成可以维护的产品。公开端负责呈现，后台负责编辑与发布，服务端负责业务和数据；三端共处一个 Monorepo，同时保持清晰边界。", "Monorepo 的连接方式", "pnpm workspace 管理工作区，Turbo 编排任务。共享请求契约、UI、工具与配置放入 packages；前后端通过 API 协作，让展示与管理共用规则，也能独立验证。", repository("my-resume")),
      ...spread("rs-web · 公开展示", "让访问者快速了解经历、技能与作品。当前公开端使用 Next.js 15 与 React 19，配合 HeroUI、Tailwind CSS，提供双语、主题与简历导出入口。", "把阅读体验放在前面", "展示内容由服务端提供，公开端专注页面组织与访问体验。当前主线代码位于 apps/web；保留在线简历入口，方便继续阅读完整的个人经历与代表作品。", { label: "访问在线简历", href: "https://resume.fridolph.top" }),
      ...spread("rs-admin · 内容管理", "简历内容需要持续更新。后台同样采用 Next.js 与 React，承载简历编辑、发布及 AI 工作台，把维护动作集中到一个界面中。", "从修改到发布", "编辑与发布分开，管理端负责组织操作，服务端校验并保存业务数据。当前主线代码位于 apps/admin，共享请求契约与基础样式，减少公开端和后台之间的重复。", repository("my-resume")),
      ...spread("rs-server · 业务后端", "NestJS 11 是统一业务入口，负责鉴权、简历数据、导出与 AI/RAG。Drizzle ORM 与 libsql / SQLite 承载当前主线数据访问，避免前端直接依赖存储细节。", "从功能走向工程实践", "apps/server 连接业务、数据和 AI 能力。项目通过测试、接口契约及部署文档持续演进；AI 工作台与 RAG 仍在迭代，把已经验证的链路与后续探索分别记录。", repository("my-resume")),
    ],
    links: [
      { label: "查看在线简历", href: "https://resume.fridolph.top" },
      { label: "三端项目源码", href: "https://github.com/Fridolph/my-resume" },
    ],
  },
  {
    id: "hobby", title: "Hobby", subtitle: "球场、镜头、远方与日常",
    description: "代码之外，也想收藏生活里的光。羽毛球与棒球、摄影与旅行、音乐、阅读和传统文化，是认识我的另一条线索。先把这些喜爱的方向写进书里，再慢慢用照片、故事和真实的片段填满它。",
    category: "LIFE & LITTLE JOYS", note: "把日子过成值得翻阅的一册。",
    color: "#9a643e", accent: "#f1dfad", icon: "hobby",
    background: { src: "/backgrounds/hobby.svg", position: "center", mobilePosition: "35% center" },
    pages: [
      ...spread("羽毛球 · 动起来", "我喜欢羽毛球。离开屏幕，走上球场，让注意力回到脚步、挥拍与来回之间。这一章留给运动，也留给日常里重新找回节奏的时刻。", "留给球场上的故事", "后续想补充球场照片、练球片段与自己的体会。不急着用成绩介绍一项爱好，先记录为什么喜欢、怎样坚持，以及和球友一起度过的好时光。"),
      ...spread("棒球 · 等待与出发", "棒球也是我的爱好。它有等待，也有突然加速的一瞬；每个人守住自己的位置，又共同完成一次配合。这一章留给球场上的另一种节奏。", "把每一局记下来", "这里以后可以放观赛记录、练习感受和喜欢的比赛片段。先给这项爱好留出位置，再由真实经历慢慢补充具体的人、场地和故事。"),
      ...spread("摄影 · 看见细节", "用镜头给日常按一个暂停键。一束光、一段街景、一个容易错过的表情，都可以成为重新观察生活的起点。这一章先收藏我对摄影的喜爱。", "未来的影像手记", "后续会用自己的作品替换这一页：照片、拍摄地点和当时的感受一起留下。让图像成为叙事的一部分，也给未来的图片墙留下空间。"),
      ...spread("旅行 · 去别处看看", "离开熟悉的路线，换一个地方走路、听声音、观察日常。旅行让我愿意放慢判断，也让我对不同的生活方式保持好奇。", "给远方留几页", "这一章之后可以补充路线、沿途照片与小小见闻。暂时不列目的地清单，等真正的旅行片段加入，再让这些书页拥有自己的地名与时间。"),
      ...spread("音乐 · 日常的背景音", "喜欢音乐，也喜欢它让普通时刻产生变化的能力。专注时、散步时、需要休息时，不同的声音陪伴着不同的心情。", "一份慢慢长出的歌单", "后续可以记录喜欢的歌曲、专辑与听歌故事。这里先留下一个入口：把当时为什么被打动写下来，让歌单也成为可以回看的生活笔记。"),
      ...spread("阅读 · 与另一种目光相遇", "读书时，暂时放下自己的惯性，跟着另一种目光看世界。技术、历史与生活的理解，可以在阅读中慢慢相连，也可以从一句话开始重新思考。", "把读过的留在身边", "后续补充具体书目、摘录与读后感。比起只记读完了多少，更想记录哪一个问题被打开，哪一种理解在生活里发生了变化。", { label: "阅读知乎专栏", href: "https://www.zhihu.com/people/fridolph/columns" }),
      ...spread("传统文化 · 从文本出发", "易经、历史与传统智慧，是我持续学习的方向。回到原典、历史和生活经验，尝试理解古人怎样观察时间、变化与人的处境。", "以史为镜，古为今用", "在读史学易与传统智慧专栏里，继续梳理概念、核对出处，区分史实、解释与个人思考。让传统文化成为理解生活的线索，也保留继续学习和修正的余地。", { label: "走进传统智慧专栏", href: "https://www.zhihu.com/column/c_2072270279200477976" }),
    ],
    links: [],
  },
  {
    id: "github", title: "GitHub", subtitle: "开源代码、作品与小实验",
    description: "我是 Fridolph。GitHub 简介里写着羽毛球、棒球与音乐，也写着 Never give up。这里选了六个公开项目：从全栈简历和 AI 学习，到前端知识、交互实验、组件库与传统文化小工具。欢迎翻阅，也欢迎交流。",
    category: "CODE & OPEN SOURCE", note: "六个项目，把想法写成可以运行的东西。",
    color: "#283f47", accent: "#d9c6a2", icon: "github",
    background: { src: "/backgrounds/github.svg", position: "40% center", mobilePosition: "30% center" },
    pages: [
      ...spread("my-resume", "从旧版简历逐步演进而来的全栈 Monorepo。公开展示、后台管理与统一服务端共同组成简历产品，也是一份边做边讲解的工程实践。", "从个人介绍到完整产品", "Next.js、React 与 NestJS 分工协作，共享契约连接三端。仓库涵盖编辑发布、导出、鉴权与 AI/RAG 探索；详细架构可以继续翻阅本书架的 Resume 一册。", repository("my-resume")),
      ...spread("AI-Journey-Fighting", "一个持续迭代的 AI 学习与实战仓库。从基础概念出发，逐步走向 RAG、工具调用、Memory 与 Agent，把理解、实验和复盘一起保留下来。", "代码、草稿与公开文档", "examples 跑实验，drafts 记录过程，docs 整理为 VitePress 文档。保留修复和对照版本，用概念地图连接知识；目标是能跑通、能讲清楚，也能复盘。", repository("AI-Journey-Fighting")),
      ...spread("FE-prepare-interview", "为前端知识复习与面试准备整理的开放资料库。把碎片问题放回知识体系，兼顾概念讲解、模拟面试与手写练习，方便反复查阅。", "让知识点连成线", "覆盖 JavaScript、TypeScript、Vue、React、Node.js、浏览器与工程化等方向。使用 VitePress 组织内容，配合搜索、代码示例与交互 Demo，持续整理与共建。", repository("FE-prepare-interview")),
      ...spread("my-program", "项目、Demo 与交互实验的合集。把过去分散的静态示例整理为可在线浏览的展示站，保留原始代码，也补上分类与阅读线索。", "把小实验整理成作品集", "VitePress 负责内容展示，脚本扫描示例并生成详情。通过分类、标签、场景与难度查找 Demo，再沿着专题路线探索动画、Canvas、布局与其他效果。", repository("my-program")),
      ...spread("my-element-plus", "一份以 Element Plus 为参照的 Vue 组件库学习实践。通过亲手实现组件，理解 API 设计、交互细节、样式组织与组件之间的配合。", "从使用组件到实现组件", "以 Vue、TypeScript 与 Vite 为基础，结合 Vitest 与 VitePress 学习测试、文档和打包。它承载组件库原理学习，帮助理解复杂组件背后的工程取舍。", repository("my-element-plus")),
      ...spread("QiGua · 起卦", "把易经学习放进浏览器侧边栏的一个小工具。通过时间、硬币与名字三种方式进入卦象，随手查阅，也把传统文化兴趣连接到具体的产品实践。", "传统文化与浏览器实验", "基于 Chrome Manifest V3 的 Side Panel 插件，展示卦名、上下卦、变卦等信息。它是学习与查阅的辅助入口，结合代码探索交互，也继续核对传统概念的来源。", repository("QiGua")),
    ],
    links: [{ label: "访问 GitHub", href: "https://github.com/Fridolph" }],
  },
  {
    id: "writing", title: "Writing", subtitle: "读书、读史与传统智慧",
    description: "在知乎，我以「霪霖笙箫」记录读书与思考。围绕读史学易、传统智慧体系，也写 AI Agent 的学习和日常随笔。用现代语言梳理旧问题，回到文本与经历，再把一点理解写下来。",
    category: "READING & PERSPECTIVES", note: "读书照见生活，写作整理思绪。",
    color: "#79614a", accent: "#f2ddbb", icon: "writing",
    background: { src: "/backgrounds/writing.svg", position: "center", mobilePosition: "35% center" },
    pages: [
      ...spread("读史学易", "用易经六十四卦的结构重新打开中国历史。借助历史人物与时代处境，理解起步、发展、临界与转化，观察人在变化中的选择。", "让解释有史实可循", "专栏强调历史陈述以史实为据，存疑之处如实标注。把六爻的结构与具体人生对照，读历史，也思考如何认识自己的处境。", { label: "阅读《读史学易》", href: "https://www.zhihu.com/column/c_2029126810923804341" }),
      ...spread("传统智慧体系", "从道、阴阳、五行与八卦，到干支、节气、历法与古代天文。用现代语言、清晰结构和原典线索，重新理解中华传统智慧。", "回到文本与生活经验", "沿着《周易》《尚书》《礼记》等典籍，分清早期文本说了什么，后世怎样会通与应用。理解古人如何观察天地、组织时间，也保留不同解释的边界。", { label: "阅读传统智慧体系", href: "https://www.zhihu.com/column/c_2072270279200477976" }),
      ...spread("散文、随笔与感悟", "有些想法适合慢慢写。从读书和日常出发，记录被触动的时刻，把生活中的问题放在纸上，再试着看清一点。", "把思考交给时间", "让文字连接技术实践、传统文化与真实生活。每篇随笔可以是一段观察，也可以是一个仍未想完的问题；留下表达，也留下继续修订的空间。", { label: "阅读随笔专栏", href: "https://www.zhihu.com/column/c_2017567493422605646" }),
      ...spread("AI Agent 学习专栏", "把 AI Agent 的学习过程整理成可以分享的文章。概念、实验和遇到的问题一起记录，让写作成为检验理解的一种方式。", "边实践，边解释", "公开专栏与 AI 学习站相互连接：在代码中验证，在文章里重新组织。希望读者既能看到过程，也能找到继续动手的起点。", { label: "阅读 AI Agent 专栏", href: "https://www.zhihu.com/column/c_2023148353089729759" }),
    ],
    links: [{ label: "阅读知乎专栏", href: "https://www.zhihu.com/people/fridolph/columns" }],
  },
  {
    id: "learning", title: "Learning", subtitle: "AI 概念、实验与学习地图",
    description: "AI-Journey-Fighting 是我公开记录学习过程的地方。概念文档、实验代码、学习草稿与复盘共同生长：从基础与提示词，到 RAG、Memory、工具调用和 LangGraph，一步步把理解变成可以运行的东西。",
    category: "AI & CONTINUOUS LEARNING", note: "能跑通，能讲清楚，也能复盘。",
    color: "#456858", accent: "#e1d4ad", icon: "learning",
    background: { src: "/backgrounds/learning.svg", position: "center", mobilePosition: "40% center" },
    pages: [
      ...spread("从概念出发", "先理解 AI 与大模型的基础，再沿着 Prompt Engineering、RAG 和 Agent 逐步展开。把陌生术语放回问题里，建立可以继续追问的知识框架。", "让学习有一张地图", "VitePress 文档站把基础概念、专题文章与学习记录组织起来。概念地图连接知识点之间的关系，帮助回看自己从哪里出发、下一步还需要理解什么。", { label: "打开 AI 学习站", href: "https://fridolph.github.io/AI-Journey-Fighting/" }),
      ...spread("用实验检验理解", "RAG、向量数据库、Memory、Tool Calling、Agent Loop 与 Structured Output，都需要在代码里试过才更具体。学习仓库保留实验，也保留排查与修复的过程。", "三个目录，一条学习链路", "examples 用来运行示例，drafts 留下疑问与复盘，docs 发布整理后的理解。对原始示例与修复版本做对照，让下一次回看时知道为什么这样改。", repository("AI-Journey-Fighting")),
      ...spread("持续迭代的学习", "LangGraph、多模态、语音与应用层实践仍在继续。学习不只保留成功版本，也保留兼容问题、错误假设与重新理解的时刻。", "把过程变成长期积累", "成熟的实验逐步整理为公开文档与文章。Memory、Evaluation 等主题继续补充，沿着实践、草稿、文档的路径，让零散学习成为能够反复使用的积累。", { label: "继续在线阅读", href: "https://fridolph.github.io/AI-Journey-Fighting/" }),
    ],
    links: [
      { label: "进入 AI 学习之旅", href: "https://fridolph.github.io/AI-Journey-Fighting/" },
      { label: "查看源码仓库", href: "https://github.com/Fridolph/AI-Journey-Fighting" },
    ],
  },
];
