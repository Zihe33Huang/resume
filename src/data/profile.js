export const localeText = {
  en: {
    nav: { hero: 'Home', about: 'About', resume: 'Resume', projects: 'Projects', contact: 'Contact' },
    language: '中文',
    heroBadge: 'Available for Impact Projects',
    viewProjects: 'View Projects',
    downloadResume: 'Download Resume PDF',
    aboutEyebrow: 'About Me',
    aboutTitle: 'Engineering with product intuition and visual polish.',
    aboutBody:
      'I focus on turning complex business flows into clear, fast, and delightful experiences. I work from architecture to final interaction, ensuring performance, maintainability, and consistency across the stack.',
    resumeEyebrow: 'Resume',
    resumeTitle: 'Experience, education, and capability matrix.',
    educationCert: 'Education & Certifications',
    skillSystem: 'Skill System',
    projectsEyebrow: 'Projects',
    projectsTitle: 'Production-ready work with measurable outcomes.',
    projectCategories: { all: 'All', react: 'React', fullstack: 'Full Stack', design: 'Design Engineering' },
    liveDemo: 'Live Demo',
    contactEyebrow: 'Contact',
    contactTitle: "Let's build something exceptional.",
    contactBody: 'Open to high-impact product, platform, and AI-enabled engineering collaborations.',
  },
  zh: {
    nav: { hero: '首页', about: '关于', resume: '履历', projects: '项目', contact: '联系' },
    language: 'EN',
    heroBadge: '可参与高价值项目合作',
    viewProjects: '查看项目',
    downloadResume: '下载简历 PDF',
    aboutEyebrow: '关于我',
    aboutTitle: '用工程严谨性与产品审美打造高质量体验。',
    aboutBody:
      '我擅长将复杂业务流程抽象为清晰、流畅、可扩展的产品体验，从架构设计到交互细节全链路把控，兼顾性能、可维护性与一致性。',
    resumeEyebrow: '履历',
    resumeTitle: '工作经历、教育背景与能力体系。',
    educationCert: '教育经历与认证',
    skillSystem: '技能矩阵',
    projectsEyebrow: '项目',
    projectsTitle: '可上线、可度量、可持续迭代的项目实践。',
    projectCategories: { all: '全部', react: 'React', fullstack: '全栈', design: '设计工程' },
    liveDemo: '在线演示',
    contactEyebrow: '联系',
    contactTitle: '一起打造真正有影响力的产品。',
    contactBody: '欢迎交流高价值产品研发、平台建设与 AI 工程化合作。',
  },
}

export const profile = {
  name: 'Zihe Huang',
  title: {
    en: 'Senior Full-Stack Engineer',
    zh: '高级全栈工程师',
  },
  location: {
    en: 'Shanghai / Remote',
    zh: '上海 / 远程',
  },
  intro: {
    en: 'I build high-performance products with polished interaction, robust architecture, and production-grade engineering quality.',
    zh: '专注打造高性能产品：兼顾高级交互、稳健架构与生产级工程质量。',
  },
  email: 'zihe@example.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/' },
    { label: 'X', href: 'https://x.com/' },
  ],
}

export const quickStats = [
  { label: { en: 'Years Experience', zh: '从业年限' }, value: '7+' },
  { label: { en: 'Projects Delivered', zh: '交付项目' }, value: '32' },
  { label: { en: 'Production Uptime', zh: '生产可用性' }, value: '99.95%' },
]

export const experiences = [
  {
    period: '2022 - Present',
    role: { en: 'Senior Frontend Engineer', zh: '高级前端工程师' },
    company: { en: 'Nova Cloud Lab', zh: 'Nova Cloud Lab' },
    details: {
      en: 'Led platform-level architecture upgrades, built design systems, and improved Core Web Vitals by 38% across key product pages.',
      zh: '主导平台级架构升级与设计系统建设，关键页面 Core Web Vitals 指标整体提升 38%。',
    },
  },
  {
    period: '2019 - 2022',
    role: { en: 'Full-Stack Engineer', zh: '全栈工程师' },
    company: { en: 'Byte Horizon', zh: 'Byte Horizon' },
    details: {
      en: 'Delivered full lifecycle product modules, designed APIs, and integrated observability to reduce critical incident response time by 42%.',
      zh: '负责端到端产品模块交付与 API 设计，并接入可观测性体系，将关键故障响应时间降低 42%。',
    },
  },
]

export const education = [
  {
    period: '2015 - 2019',
    major: { en: 'B.Eng. in Software Engineering', zh: '软件工程 工学学士' },
    school: { en: 'Tongji University', zh: '同济大学' },
  },
]

export const certificates = [
  { en: 'AWS Certified Developer', zh: 'AWS 开发者认证' },
  { en: 'Google Professional Cloud Architect', zh: 'Google 云架构师认证' },
  { en: 'Scrum Master Certified', zh: 'Scrum Master 认证' },
]

export const skills = [
  { name: { en: 'React / Frontend Architecture', zh: 'React / 前端架构' }, level: 94 },
  { name: { en: 'Node.js / API Engineering', zh: 'Node.js / API 工程' }, level: 88 },
  { name: { en: 'System Design', zh: '系统设计' }, level: 85 },
  { name: { en: 'Cloud & DevOps', zh: '云原生与 DevOps' }, level: 82 },
  { name: { en: 'UI Motion & Interaction', zh: 'UI 动效与交互' }, level: 90 },
]

export const projects = [
  {
    title: { en: 'Atlas Analytics', zh: 'Atlas 数据分析平台' },
    category: 'react',
    stack: ['React', 'TypeScript', 'D3', 'Tailwind'],
    summary: {
      en: 'A real-time analytics workspace with modular dashboard builder, alert routing, and observability insights.',
      zh: '实时分析工作台，提供模块化看板搭建、告警路由与可观测性洞察。',
    },
    demo: 'https://example.com/demo-atlas',
    github: 'https://github.com/',
  },
  {
    title: { en: 'Pulse Commerce', zh: 'Pulse 电商中台' },
    category: 'fullstack',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    summary: {
      en: 'Headless commerce platform with real-time inventory sync, segmentation, and automated conversion experiments.',
      zh: '无头电商平台，支持库存实时同步、用户分群与自动化转化实验。',
    },
    demo: 'https://example.com/demo-pulse',
    github: 'https://github.com/',
  },
  {
    title: { en: 'Skyline Studio', zh: 'Skyline 品牌体验站' },
    category: 'design',
    stack: ['Next.js', 'Framer Motion', 'GSAP', 'WebGL'],
    summary: {
      en: 'Marketing experience site with cinematic transitions, immersive 3D accents, and adaptive storytelling sections.',
      zh: '品牌营销体验站，包含电影级转场、沉浸式 3D 细节与自适应叙事模块。',
    },
    demo: 'https://example.com/demo-skyline',
    github: 'https://github.com/',
  },
  {
    title: { en: 'Ops Radar', zh: 'Ops Radar 运维指挥台' },
    category: 'react',
    stack: ['React', 'Vite', 'Recharts', 'Zustand'],
    summary: {
      en: 'Incident command center with event correlation, dependency graph views, and operational timeline playback.',
      zh: '运维事件指挥中心，支持事件关联、依赖图谱与时间线回放。',
    },
    demo: 'https://example.com/demo-radar',
    github: 'https://github.com/',
  },
]
