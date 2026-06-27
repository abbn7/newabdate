// Single source of truth — all data is REAL from the CV and project docs.
// No fabricated metrics. If a value isn't in the CV, it isn't here.

import giitHero from "@/assets/giit-hero.jpeg";
import giitFeatures from "@/assets/giit-features.webp";
import giitCommands from "@/assets/giit-commands.webp";

export type Project = {
  slug: string;
  title: string;
  titleAr: string;
  tagline: string;
  taglineAr: string;
  year: string;
  role: string;
  roleAr: string;
  live: string;
  repos: { label: string; url: string }[];
  cover: string;
  gallery: { src: string; caption: string }[];
  stack: Record<string, string[]>;
  overview: string;
  overviewAr: string;
  features: { t: string; d: string }[];
  architecture: { t: string; d: string }[];
  security: string[];
  commands: { c: string; k: string; d: string }[];
};


export const profile = {
  name: "Abdelhamed Nada",
  nameAr: "عبدالحميد ندا",
  monogram: "AN",
  roles: [
    "Full-Stack Developer",
    "Frontend Specialist",
    "AI Tools Expert",
  ],
  rolesAr: [
    "مطور Full-Stack",
    "متخصص واجهات أمامية",
    "خبير أدوات الذكاء الاصطناعي",
  ],
  email: "dior53634@gmail.com",
  phone: "+201096144345",
  whatsapp: "201096144345",
  location: "Egypt — Open to Remote",
  locationAr: "مصر — متاح للعمل عن بُعد",
  github: "https://github.com/abbn7",
  summary:
    "Versatile Full-Stack Developer with a strong specialization in modern Frontend development. Experienced in building production-grade web applications using React, Next.js, TypeScript, and Supabase. Proficient in GitHub workflows, CI/CD practices, and the strategic integration of AI tools to accelerate development cycles and deliver higher-quality software. Currently pursuing dual academic tracks in Computer Science and Artificial Intelligence, bridging theoretical depth with practical, client-facing project delivery.",
  summaryAr:
    "مطور Full-Stack متعدد الاهتمامات بتخصص قوي في تطوير الواجهات الأمامية الحديثة. خبرة في بناء تطبيقات ويب جاهزة للإنتاج باستخدام React و Next.js و TypeScript و Supabase. متمكن من سير عمل GitHub و CI/CD، والدمج الاستراتيجي لأدوات الذكاء الاصطناعي لتسريع دورات التطوير وتقديم برمجيات أعلى جودة. أدرس حالياً مسارين أكاديميين في علوم الحاسب والذكاء الاصطناعي، ما يربط العمق النظري بالتسليم العملي للمشاريع.",
};

export const highlights = [
  {
    title: "Frontend-First Mindset",
    desc: "Pixel-perfect UI, smooth UX, performance optimization.",
    titleAr: "عقلية الواجهة أولاً",
    descAr: "واجهات بدقة بكسلية، تجربة استخدام انسيابية، وأداء محسّن.",
  },
  {
    title: "AI-Augmented Developer",
    desc: "Leverages AI tools to deliver faster without sacrificing quality.",
    titleAr: "مطور معزز بالذكاء الاصطناعي",
    descAr: "يستخدم أدوات الذكاء الاصطناعي للتسليم بسرعة دون التضحية بالجودة.",
  },
  {
    title: "GitHub Power User",
    desc: "Clean commits, PRs, CI/CD, and collaborative workflows.",
    titleAr: "محترف GitHub",
    descAr: "كوميتات نظيفة، PRs، CI/CD، وسير عمل تعاوني.",
  },
  {
    title: "Remote-Ready",
    desc: "Available for international remote roles and freelance projects.",
    titleAr: "جاهز للعمل عن بُعد",
    descAr: "متاح للأدوار الدولية عن بُعد والمشاريع المستقلة.",
  },
];

export const skills = [
  {
    group: "Frontend",
    items: [
      "React.js",
      "Next.js 15",
      "TypeScript",
      "JavaScript (ES2024)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Shadcn/UI",
      "Framer Motion",
    ],
  },
  {
    group: "Backend",
    items: ["Node.js", "Supabase", "REST APIs", "PostgreSQL", "Python"],
  },
  {
    group: "AI & Tools",
    items: [
      "Claude AI",
      "ChatGPT",
      "GitHub Copilot",
      "Cursor AI",
      "Prompt Engineering",
      "AI-Augmented Dev",
    ],
  },
  {
    group: "DevOps",
    items: ["Git", "GitHub", "GitHub Actions", "Vercel", "Netlify"],
  },
  {
    group: "Other",
    items: [
      "Telegram Bot API",
      "SaaS Architecture",
      "E-Commerce Systems",
      "Performance Optimization",
    ],
  },
  {
    group: "Languages",
    items: ["Arabic (Native)", "English (Professional)"],
  },
];

export const education = [
  {
    school: "Tanta University (TNU)",
    degree: "B.Sc. Computer Science & Artificial Intelligence",
    period: "2024 – Present",
    note: "Studying Computer Science with a specialization track in Artificial Intelligence.",
  },
  {
    school: "Pharos University in Alexandria (PUA)",
    degree: "B.Sc. Computer Science",
    period: "2022 – 2024",
    note: "Foundational studies including Social Issues in CS, Algorithms, and Software Engineering.",
  },
];

export const projects: Project[] = [
  {
    slug: "github-bot",
    title: "GitHub Management Telegram Bot",
    titleAr: "بوت تلجرام لإدارة GitHub",
    tagline: "Manage GitHub repositories directly from Telegram — built as a multi-user SaaS.",
    taglineAr: "إدارة مستودعات GitHub مباشرة من تلجرام — مبنيّ كخدمة متعددة المستخدمين.",
    year: "2024",
    role: "Designer + Full-Stack Developer",
    roleAr: "مصمم + مطور Full-Stack",
    live: "https://giit-website.vercel.app/",
    repos: [
      { label: "Bot — GIT5", url: "https://github.com/abbn7/GIT5" },
      { label: "Website", url: "https://github.com/abbn7/github-bot-website" },
    ],
    cover: giitHero,
    gallery: [
      { src: giitHero, caption: "Hero — Manage Your GitHub Repos from Telegram" },
      { src: giitFeatures, caption: "Features — Everything You Need to Manage GitHub" },
      { src: giitCommands, caption: "All Commands — Full Reference" },
    ],
    stack: {
      Bot: ["Python 3.11", "python-telegram-bot", "PyGithub", "cryptography", "SQLite"],
      Website: ["React", "Vite", "TypeScript", "Tailwind CSS", "shadcn/ui", "framer-motion"],
      DevOps: ["Docker", "Railway", "Vercel"],
    },
    overview:
      "An end-to-end solution to manage GitHub repositories directly from Telegram, paired with a polished marketing site. The bot is built as a multi-user SaaS with per-user encrypted Personal Access Tokens, while the website explains the product and onboards new users.",
    overviewAr:
      "حل متكامل لإدارة مستودعات GitHub مباشرة من تلجرام، مرفقاً بموقع تسويقي متكامل. البوت مبنيّ كخدمة SaaS متعددة المستخدمين مع تشفير فردي لتوكنات الوصول الشخصية، بينما يشرح الموقع المنتج ويرحّب بالمستخدمين الجدد.",
    features: [
      { t: "Secure GitHub Linking", d: "Connect a GitHub account via an encrypted Personal Access Token (PAT) stored securely." },
      { t: "Repository Management", d: "List, download (.zip), and delete repositories from within Telegram." },
      { t: "ZIP Upload as Repo", d: "Upload a ZIP and have the bot create a new repo and push its contents automatically." },
      { t: "Privacy Toggle", d: "Switch any repository between public and private with a single command." },
      { t: "Fetch Public Repos", d: "Download any public GitHub repository by URL — great for research and learning." },
      { t: "Safe Deletion", d: "Confirmation prompts prevent accidental destructive actions." },
      { t: "Multi-User SaaS", d: "Per-user sessions and encrypted credentials, ready for many concurrent users." },
      { t: "Deploy-Ready", d: "Fully containerised and ready to ship to Railway with Docker volumes for persistence." },
    ],
    architecture: [
      { t: "Telegram Interface", d: "Receives commands and dispatches replies via python-telegram-bot." },
      { t: "Bot Logic Handler", d: "Interprets commands, coordinates modules, and manages conversation state." },
      { t: "GitHub Service", d: "An abstraction layer on top of GitHub's API for repo/file operations." },
      { t: "User Management", d: "Stores user records and encrypted PATs in SQLite." },
      { t: "File Processing", d: "Handles ZIP extraction, validation, and staged uploads to GitHub." },
    ],
    security: [
      "Personal Access Tokens are encrypted via the cryptography library before being persisted.",
      "Temporary files from uploads/downloads are cleaned up automatically after processing.",
      "Tokens are revalidated on each use to keep the service safe and reliable.",
    ],
    commands: [
      { c: "/start", k: "Basic", d: "Start the bot and connect your GitHub account." },
      { c: "/repos", k: "Repository", d: "List all your GitHub repositories." },
      { c: "/uploadzip", k: "Repository", d: "Upload a ZIP file as a new repository." },
      { c: "/downloadrepo", k: "Repository", d: "Download a repository as a ZIP file." },
      { c: "/deleterepo", k: "Repository", d: "Delete a repository (with confirmation)." },
      { c: "/setprivacy", k: "Settings", d: "Toggle a repository between public and private." },
      { c: "/fetchrepo", k: "Utility", d: "Download any public repository by URL." },
      { c: "/help", k: "Basic", d: "Show the help message with all commands." },
      { c: "/cancel", k: "Basic", d: "Cancel the current operation." },
    ],
  },
];

export const process = [
  { t: "Discover", d: "Understand the user, the constraints, and the success metric before a single pixel." },
  { t: "Architect", d: "Pick a stack that survives growth — file routing, type safety, and predictable data flow." },
  { t: "Build", d: "Ship in small, reviewable increments. AI-augmented, never AI-replaced." },
  { t: "Polish & Ship", d: "Cinematic motion, accessibility, performance budgets, and a launch that actually goes live." },
];

export const processAr = [
  { t: "اكتشاف", d: "فهم المستخدم والقيود ومعيار النجاح قبل أي بكسل." },
  { t: "هيكلة", d: "اختيار حزمة تقنية تصمد للنمو — توجيه قائم على الملفات، أمان أنواع، تدفق بيانات يمكن التنبؤ به." },
  { t: "بناء", d: "تسليم على دفعات صغيرة قابلة للمراجعة. مدعوم بالذكاء الاصطناعي وليس بديلاً عنه." },
  { t: "صقل وإطلاق", d: "حركة سينمائية، إتاحة، ميزانيات أداء، وإطلاق فعلي على الإنتاج." },
];

export function whatsappLink(message?: string) {
  const text =
    message ??
    "Hi Abdelhamed, I came from your portfolio and would like to discuss a project. — مرحباً عبدالحميد، جئتك من موقع البورتفوليو وأود مناقشة مشروع.";
  return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`;
}
