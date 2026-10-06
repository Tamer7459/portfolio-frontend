export interface Profile {
    name: string
    role: string
    bio: string
    photo_url: string | null
    cv_url: string | null
    github: string
    linkedin: string
    email: string
    whatsapp: string
    years_experience: number
    projects_count: number
    skills: { id: number; name: string; percentage: number }[]
}

export interface ProjectMedia {
    type: 'image' | 'video'
    url: string
}

export interface Project {
    id: number
    title: string
    subtitle: string
    description?: string
    tags: { id: number; name: string }[]
    github_url: string
    live_url: string
    image_url: string | null
    media: ProjectMedia[]
    status: string
    featured: boolean
    category: 'team' | 'best' | 'simple'
}

export const profile: Profile = {
    name: 'Bali Abdelkouddous',
    role: 'Software Engineer & Mentor · Web, Mobile & Desktop',
    bio: 'Abdelkouddous Baali is a self-taught software engineer and programming mentor based in Algeria. He builds production-grade web, mobile, and desktop applications using React, Laravel 10, PostgreSQL, Docker, and most major web technologies, with hands-on deployment experience on Vercel and Render.com.\n\nHis most notable project is GFR — a full-stack academic networking platform with 28+ REST API endpoints and multi-role access control, which won 1st place at a competitive hackathon. He also conceptualized ProDZ, a startup targeting Algeria\'s service provider market.\n\nBeyond building software, he teaches programming across all fields — web, mobile, and desktop — helping beginners grow into confident developers through practical, project-based learning. He also combines a serious interest in cybersecurity (Kali Linux, Metasploit, web security) with academic research, and aims long-term to specialize in scientific research and pursue postgraduate studies in Italy.',
    photo_url: 'https://res.cloudinary.com/dme6jhgkm/image/upload/v1791320988/myphoto_fbiubg.jpg',
    cv_url: 'https://drive.google.com/file/d/11-0TC8jBbgAN-OUrh4K11C_1lydzVj5d/view?usp=sharing',
    github: 'https://github.com/Tamer7459',
    linkedin: 'https://linkedin.com/in/abdelkouddous-bali-28032436a',
    email: 'tamerinale@gmail.com',
    whatsapp: '+213549964508',
    years_experience: 3,
    projects_count: 18,
    skills: []
}

export interface BlogPost {
    id: number
    title: string
    slug: string
    excerpt: string
    read_time: number
    created_at: string
    tags: { id: number; name: string }[]
}

export const blogPosts: BlogPost[] = []

export const projects: Project[] = [
    {
        id: 1,
        title: 'Sport avec Boubker',
        category: 'best',
        subtitle: 'Gym Management Platform (Next.js, Zustand, Recharts)',
        description: 'Sport avec Boubker is a gym management platform built with Next.js 14 for a sports hall, delivered in French with full internationalization. It centralizes member management, subscriptions, and daily gym operations in a modern responsive interface with dark/light theme support.\n\nThe front-end is built with React 18, TypeScript, and Tailwind CSS, using next-intl for translations, next-themes for theming, Zustand for client-side state management, and Lucide icons throughout. Recharts powers analytics dashboards giving gym owners insight into memberships and activity, while a dedicated TypeScript back-end exposes the API consumed by the app.\n\nDeployed on Vercel with a clean modular architecture (app router, components, store, types), the project demonstrates production SaaS development for local businesses — multilingual UX, real-time dashboards, and scalable state management in a real client-facing product.',
        tags: [
            { id: 57, name: 'Next.js' },
            { id: 58, name: 'TypeScript' },
            { id: 59, name: 'Tailwind CSS' },
            { id: 60, name: 'Zustand' }
        ],
        github_url: 'https://github.com/Tamer7459/Sport-avec-Boubker-frontend',
        live_url: 'https://sport-avec-boubker-frontend.vercel.app',
        image_url: null,
        media: [],
        status: 'live',
        featured: true
    },
    {
        id: 2,
        title: 'Tamer Academy',
        category: 'best',
        subtitle: 'Programming Learning App (Flutter, Dart, Firebase)',
        description: 'Tamer Academy is a Flutter educational application (v1.0.0+) that teaches programming, available on both Android and web via Firebase Hosting. Built entirely with Dart and Flutter, it delivers coding lessons with syntax-highlighted code display, custom Google Fonts typography, and offline-friendly preferences — directly extending the mentor mission into a product.\n\nThe app integrates Firebase Authentication with Google Sign-In, Cloud Firestore and Firebase Storage for lesson content, plus Supabase as an additional backend. State is managed with Provider, content can be embedded through WebView, and flutter_localizations with intl provide a localized experience.\n\nWith its own brand identity, versioned releases up to build 57, APK build automation, and Firestore security rules, Tamer Academy demonstrates complete mobile product ownership — from curriculum-style content delivery to authentication, cloud backends, and multi-platform deployment on Android and the web.',
        tags: [
            { id: 61, name: 'Flutter' },
            { id: 62, name: 'Dart' },
            { id: 63, name: 'Firebase' },
            { id: 64, name: 'Supabase' }
        ],
        github_url: 'https://github.com/Tamer7459/tamer-academy',
        live_url: 'https://tamer-academy.web.app',
        image_url: null,
        media: [],
        status: 'live',
        featured: true
    },
    {
        id: 3,
        title: 'GFR Platform',
        category: 'team',
        subtitle: 'Global Academic Network for Researchers (Team Project · Django)',
        description: 'GFR Platform (Global Forum for Researchers) is a team-built academic social network and research management platform developed with Django. It gives every researcher a single academic identity combining profile, publications, projects, and peer reviews — with live community stats such as 12,480 researchers, 312 institutions, and 24 journals.\n\nThe platform covers the full publishing workflow: manuscript submission to peer-reviewed open-access journals with double-blind review tracking in real time, research project collaboration with team task management, and year-round conferences and workshops. The marketing site presents the journey in three steps — create your profile, submit your work, collaborate and publish.\n\nBuilt collaboratively as a team using Django\'s MVT architecture with authentication, registration, and role-based flows, and deployed on Render. The project demonstrates large-scale product development, code collaboration through forks and pull requests, and shipping a production academic platform as a team.',
        tags: [
            { id: 51, name: 'Django' },
            { id: 52, name: 'Python' },
            { id: 53, name: 'JavaScript' }
        ],
        github_url: 'https://github.com/dakirBLM/gfr-platform',
        live_url: 'https://gfr-platform.onrender.com',
        image_url: '/projects/gfr-platform.png',
        media: [
            { type: 'image', url: '/projects/gfr-platform.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 4,
        title: 'NERO',
        category: 'team',
        subtitle: 'Rehabilitation Care Marketplace (Team Project · Django)',
        description: 'NERO is a team-built bilingual (Arabic/English) rehabilitation-care platform developed with Django. It connects patients with the right rehabilitation clinics — patients describe their case and get matched to a suitable clinic, then share medical records, chat, and book appointments, all in one friendly place.\n\nThe platform serves two sides: a patient journey with smart clinic recommendations, request tracking, and ongoing contact, and a clinic portal where clinics register, build their page with treatments, photos, and videos, collect reviews, and receive bookings. A friendly AI assistant called King George guides visitors to the right place, whether they are patients looking for care or clinics getting set up.\n\nDeveloped collaboratively as a team with Django templates, authentication flows, and static asset management, and deployed on Render. The project showcases product thinking for healthcare marketplaces, bilingual UX, AI-assisted onboarding, and real team-based development workflows.',
        tags: [
            { id: 54, name: 'Django' },
            { id: 55, name: 'Python' },
            { id: 56, name: 'JavaScript' }
        ],
        github_url: 'https://github.com/dakirBLM/Nero',
        live_url: 'https://nero-69la.onrender.com',
        image_url: '/projects/nero.png',
        media: [
            { type: 'image', url: '/projects/nero.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 5,
        title: 'INVOICEPRO',
        category: 'best',
        subtitle: 'Smart Invoicing SaaS (Next.js, TypeScript, Tailwind CSS)',
        description: 'Invoice Pro is a professional SaaS invoicing application built with Next.js that allows users to create, customize, and send professional invoices instantly. The platform features smart invoicing with auto-calculations, client management, real-time analytics for revenue tracking, multi-currency support (USD, EUR, DZD), PDF export, and secure cloud storage. It offers a responsive interface with multiple pricing tiers (Free, Professional, Business) and supports WhatsApp sharing of invoices.\n\nThe front-end is built with Next.js, TypeScript, and Tailwind CSS, delivering a modern, accessible, and responsive user experience with features such as form validation, dark/light mode, and internationalization. The application follows a clean component architecture with reusable UI components, client-side state management, and a well-structured routing system.\n\nOverall, this project demonstrates full-stack SaaS application development, covering authentication, payment integration, PDF generation, multi-currency support, and responsive UI design. It serves as a practical solution for businesses of all sizes looking to streamline their billing process.',
        tags: [
            { id: 46, name: 'Next.js' },
            { id: 47, name: 'TypeScript' },
            { id: 48, name: 'Tailwind CSS' },
            { id: 49, name: 'Prisma' },
            { id: 50, name: 'PostgreSQL' }
        ],
        github_url: 'https://github.com/Tamer7459/INVOICEPRO-frontend',
        live_url: 'https://invoicepro-frontend-rho.vercel.app/',
        image_url: '/projects/INVOICEPRO.png',
        media: [
            { type: 'image', url: '/projects/INVOICEPRO.png' },
            { type: 'image', url: '/projects/invoicepro-create.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 6,
        title: 'Modern Healthcare Management System',
        category: 'best',
        subtitle: 'CareFlow - Hospital Management System (Next.js, Radix UI, Zustand)',
        description: 'A comprehensive hospital management platform built with Next.js called CareFlow, designed to streamline healthcare operations through a modern, accessible, and responsive interface.\n\nThe system features a complete patient management workflow including appointment booking and scheduling with real-time availability tracking, secure medical records storage with patient history and vital signs management, and dedicated portals for patients, doctors, and administrators with role-based access control.\n\nThe front-end is built with React 19, Next.js, TypeScript, and Tailwind CSS, utilizing Radix UI primitives for accessible components, React Hook Form with resolvers for form validation, Zustand for state management, and Axios for API communication. The platform includes interactive health data analytics with Recharts, toast notifications via Sonner, theme switching with next-themes, and a comprehensive icon system using Lucide React.\n\nOverall, this project demonstrates full-stack healthcare application development, covering complex state management, form validation, role-based authentication, responsive UI design, and data visualization - making it a strong portfolio piece for modern web application engineering.',
        tags: [
            { id: 1, name: 'Next.js' },
            { id: 2, name: 'TypeScript' },
            { id: 3, name: 'Tailwind CSS' },
            { id: 4, name: 'Radix UI' },
            { id: 5, name: 'Zustand' }
        ],
        github_url: 'https://github.com/Tamer7459/Modern-Healthcare-Management-System-frontend',
        live_url: 'https://modern-healthcare-management-system.vercel.app/',
        image_url: '/projects/modern-healthcare-management-system.png',
        media: [
            { type: 'image', url: '/projects/modern-healthcare-management-system.png' },
            { type: 'image', url: '/projects/healthcare-login.png' },
            { type: 'image', url: '/projects/healthcare-register.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 7,
        title: 'Le Bon Cion Nouri Mila',
        category: 'best',
        subtitle: 'E-Commerce Storefront with Admin Dashboard (Upstash Redis)',
        description: 'A modern e-commerce platform built with Next.js for Le Bon Cion Nouri Mila, a retail store in Mila, Algeria. The application features a full product catalog with search and category filtering, detailed product pages with images and pricing, an admin dashboard for inventory and order management, and a location-aware contact section. The front-end delivers a responsive shopping experience with smooth animations using Framer Motion, while the back-end leverages Upstash Redis for fast data storage and retrieval. The platform includes sales analytics via Recharts, multi-language support (French), Facebook integration, and a secure admin panel for managing products and orders.',
        tags: [
            { id: 6, name: 'Next.js' },
            { id: 7, name: 'TypeScript' },
            { id: 8, name: 'Tailwind CSS' },
            { id: 9, name: 'Redis' }
        ],
        github_url: 'https://github.com/Tamer7459/le-bon-cion-nouri-frontend',
        live_url: 'https://le-bon-cion-nouri-frontend.vercel.app',
        image_url: '/projects/Le-Bon-Cion.png',
        media: [
            { type: 'image', url: '/projects/Le-Bon-Cion.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 8,
        title: 'GFR Project',
        category: 'best',
        subtitle: 'Full-Stack Web Application (1st Place Hackathon Winner)',
        description: 'The GFR Project is a full-stack web application composed of a modern React front-end and a Laravel back-end API, designed to simulate a real production-level system with clear separation between presentation layer and business logic.\n\nThe front-end is responsible for rendering a responsive and interactive user interface, managing client-side state, and consuming RESTful APIs. It focuses on performance, modular components, and a clean user experience.\n\nThe back-end is built using Laravel and provides a structured API layer that handles authentication, authorization, role-based access control (RBAC), and database operations. It implements secure data handling, migrations, seeders, and follows RESTful design principles.\n\nThe system is configured for scalable deployment using Docker and supports production environments through tools such as Nginx, Vercel (front-end), and Render (back-end). Environment variables are used to separate development and production configurations, ensuring flexibility and security.\n\nOverall, the project demonstrates full-stack development skills, including API design, front-end integration, database management, and deployment workflows, making it suitable as a portfolio-level application for demonstrating real-world engineering practices.',
        tags: [
            { id: 10, name: 'React' },
            { id: 11, name: 'Laravel' },
            { id: 12, name: 'RESTful APIs' }
        ],
        github_url: 'https://github.com/Tamer7459/gfr-front-end',
        live_url: 'https://gfr-front-end.vercel.app',
        image_url: '/projects/GFR.png',
        media: [
            { type: 'image', url: '/projects/GFR.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 9,
        title: 'LibraSys',
        category: 'best',
        subtitle: 'Library Management System Built with Django',
        description: 'LibraSys is a web-based Library Management System developed using Django. It enables efficient management of books, categories, and users through a structured backend and clean interface. The project focuses on backend development, database management, search functionality, and Django\'s MVT architecture while providing an admin dashboard for easy library operations.',
        tags: [
            { id: 13, name: 'JS' },
            { id: 14, name: 'HTML' },
            { id: 15, name: 'CSS' },
            { id: 16, name: 'Bootstrap 5' },
            { id: 17, name: 'Django' }
        ],
        github_url: 'https://github.com/Tamer7459/LibraSys',
        live_url: 'https://librasys-0vvb.onrender.com',
        image_url: '/projects/librasys.png',
        media: [
            { type: 'image', url: '/projects/librasys.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 10,
        title: 'XO Game',
        category: 'simple',
        subtitle: 'Tic Tac Toe - DOM Manipulation & Game State Logic',
        description: 'A lightweight front-end project that implements the Tic Tac Toe game using vanilla JavaScript. The application focuses on state management, event handling, and dynamic UI updates, making it a solid example for beginners learning core web development concepts.',
        tags: [
            { id: 18, name: 'JS' },
            { id: 19, name: 'HTML' },
            { id: 20, name: 'CSS' },
            { id: 21, name: 'Bootstrap 5' }
        ],
        github_url: 'https://github.com/Tamer7459/XOGame',
        live_url: 'https://xo-game-smoky-theta.vercel.app',
        image_url: '/projects/xo_game.png',
        media: [
            { type: 'image', url: '/projects/xo_game.png' }
        ],
        status: 'live',
        featured: false
    },
    {
        id: 11,
        title: 'CURDS',
        category: 'simple',
        subtitle: 'CRUD Web Application (Create, Read, Update, Delete)',
        description: 'The CURDS project is a simple and lightweight web application built using HTML, CSS, and JavaScript, designed to demonstrate the fundamental operations of data management in web development.\n\nThe system allows users to create, display, update, and delete records dynamically in the browser without requiring a backend server. All data is handled on the client side using JavaScript, making it a perfect example for understanding DOM manipulation and state handling in vanilla JavaScript.\n\nThe interface is designed to be clean and user-friendly, ensuring smooth interaction and fast performance. This project is mainly focused on strengthening core front-end development skills and understanding how CRUD logic works in real-world applications.\n\n⚙️ Key Concepts Demonstrated:\nDOM manipulation\nEvent handling in JavaScript\nDynamic UI updates\nLocal state management (client-side)\nCRUD logic implementation',
        tags: [
            { id: 22, name: 'JS' },
            { id: 23, name: 'HTML' },
            { id: 24, name: 'CSS' }
        ],
        github_url: 'https://github.com/Tamer7459/CURDS',
        live_url: 'https://curds-phi.vercel.app/',
        image_url: '/projects/CRUDS.png',
        media: [
            { type: 'image', url: '/projects/CRUDS.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 12,
        title: 'Drag-and-Drop',
        category: 'simple',
        subtitle: 'Interactive Drag and Drop Interface using JavaScript',
        description: 'A lightweight front-end project that demonstrates drag-and-drop functionality using vanilla JavaScript. The application allows users to move elements dynamically between containers through mouse interactions, showcasing core concepts such as event handling, DOM manipulation, and the HTML5 Drag and Drop API. It is designed as a practical example for understanding interactive UI behavior without relying on external libraries or frameworks.',
        tags: [
            { id: 25, name: 'JS' },
            { id: 26, name: 'HTML' },
            { id: 27, name: 'CSS' }
        ],
        github_url: 'https://github.com/Tamer7459/Drag-and-Drop',
        live_url: 'https://drag-and-drop-tau-three.vercel.app',
        image_url: '/projects/Drag-and-Drop.png',
        media: [
            { type: 'image', url: '/projects/Drag-and-Drop.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 13,
        title: 'Make-a-creative-landing-page',
        category: 'simple',
        subtitle: 'Modern UI Landing Page for Web Projects',
        description: 'A clean, responsive, and interactive landing page built with HTML, CSS, and JavaScript, designed to deliver an engaging user experience and professional visual presentation.',
        tags: [
            { id: 28, name: 'JS' },
            { id: 29, name: 'HTML' },
            { id: 30, name: 'CSS' }
        ],
        github_url: 'https://github.com/Tamer7459/Make-a-creative-landing-page',
        live_url: 'https://drag-and-drop-rmk3.vercel.app',
        image_url: '/projects/Make-a-creative-landing-page_.png',
        media: [
            { type: 'image', url: '/projects/Make-a-creative-landing-page_.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 14,
        title: 'Calculator',
        category: 'simple',
        subtitle: 'Simple, Responsive & Interactive Web Calculator',
        description: 'A basic yet functional calculator built using HTML, CSS, and JavaScript, allowing users to perform standard arithmetic operations with a clean and user-friendly interface.',
        tags: [
            { id: 31, name: 'JS' },
            { id: 32, name: 'HTML' },
            { id: 33, name: 'CSS' }
        ],
        github_url: 'https://github.com/Tamer7459/calculator',
        live_url: 'https://calculator-omega-woad-27.vercel.app',
        image_url: '/projects/calculator.png',
        media: [
            { type: 'image', url: '/projects/calculator.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 15,
        title: 'Make-a-Scrolling-Website',
        category: 'simple',
        subtitle: 'Smooth Scrolling, Modern UI & Interactive Web Experience',
        description: 'A modern scrolling website built with HTML, CSS, and JavaScript, featuring smooth navigation between sections and an engaging user experience.',
        tags: [
            { id: 34, name: 'JS' },
            { id: 35, name: 'HTML' },
            { id: 36, name: 'CSS' }
        ],
        github_url: 'https://github.com/Tamer7459/Make-a-Scrolling-Website',
        live_url: 'https://make-a-scrolling-website.vercel.app',
        image_url: '/projects/make-a-scrolling-website.png',
        media: [
            { type: 'image', url: '/projects/make-a-scrolling-website.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 16,
        title: 'Make-a-Image-Edito',
        category: 'simple',
        subtitle: 'Simple, Fast & Interactive Image Editing Tool',
        description: 'A lightweight web-based image editor built with HTML, CSS, and JavaScript that allows users to apply basic filters and adjustments to images directly in the browser.',
        tags: [
            { id: 37, name: 'JS' },
            { id: 38, name: 'HTML' },
            { id: 39, name: 'CSS' }
        ],
        github_url: 'https://github.com/Tamer7459/make-a-image-edito',
        live_url: 'https://make-a-image-edito.vercel.app',
        image_url: '/projects/make-a-image-edito.png',
        media: [
            { type: 'image', url: '/projects/make-a-image-edito.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 17,
        title: 'Todo List App',
        category: 'simple',
        subtitle: 'Simple, Efficient & Interactive Task Management Application',
        description: 'A modern Todo List web application built with React that allows users to create, manage, and track daily tasks with a clean and responsive user interface.',
        tags: [
            { id: 40, name: 'React' },
            { id: 41, name: 'Node JS' }
        ],
        github_url: 'https://github.com/Tamer7459/Todo-List',
        live_url: 'https://tamer7459.github.io/Todo-List/',
        image_url: '/projects/My_Todo_list__YPxlP3A.png',
        media: [
            { type: 'image', url: '/projects/My_Todo_list__YPxlP3A.png' }
        ],
        status: 'live',
        featured: true
    },
    {
        id: 18,
        title: 'Prayer Times App',
        category: 'simple',
        subtitle: 'Accurate, Simple & Real-Time Prayer Time Tracker',
        description: 'A web application that displays daily Islamic prayer times based on the user\'s location using API integration, built with a clean and responsive interface.',
        tags: [
            { id: 42, name: 'JS' },
            { id: 43, name: 'HTML' },
            { id: 44, name: 'CSS' },
            { id: 45, name: 'Node JS' }
        ],
        github_url: 'https://github.com/Tamer7459/Prayer-Times',
        live_url: 'https://todo-list-k9d3.vercel.app',
        image_url: '/projects/Prayer-Times.png',
        media: [
            { type: 'image', url: '/projects/Prayer-Times.png' }
        ],
        status: 'live',
        featured: true
    }
]
