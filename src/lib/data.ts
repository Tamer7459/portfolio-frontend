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
}

export const profile: Profile = {
    name: 'Bali Abdelkouddous',
    role: 'Full-Stack Developer & Finance Graduate',
    bio: 'Abdelkouddous Baali is a self-taught full-stack web developer and Finance graduate from Université Prince Abdelkader, Constantine, Algeria. He builds production-grade web applications using React, Laravel 10, PostgreSQL, Docker, and most major web technologies, with hands-on deployment experience on Vercel and Render.com. His most notable project is GFR — a full-stack academic networking platform with 28+ REST API endpoints and multi-role access control, which won 1st place at a competitive hackathon. He also conceptualized ProDZ, a startup targeting Algeria\'s service provider market. Beyond development, he combines serious interest in cybersecurity (Kali Linux, Metasploit, web security) with academic research, and aims long-term to specialize in scientific research and pursue postgraduate studies in Italy.',
    photo_url: 'https://res.cloudinary.com/dme6jhgkm/image/upload/v1780237622/my_photo_gfggko.jpg',
    cv_url: 'https://drive.google.com/file/d/11-0TC8jBbgAN-OUrh4K11C_1lydzVj5d/view?usp=sharing',
    github: 'https://github.com/Tamer7459',
    linkedin: 'https://linkedin.com/in/abdelkouddous-bali-28032436a',
    email: 'tamerinale@gmail.com',
    whatsapp: '+213549964508',
    years_experience: 2,
    projects_count: 10,
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
        title: 'Modern Healthcare Management System',
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
        id: 2,
        title: 'Le Bon Cion Nouri Mila',
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
        id: 3,
        title: 'GFR Project',
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
        id: 4,
        title: 'LibraSys',
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
        id: 5,
        title: 'XO Game',
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
        id: 6,
        title: 'CURDS',
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
        id: 7,
        title: 'Drag-and-Drop',
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
        id: 8,
        title: 'Make-a-creative-landing-page',
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
        id: 9,
        title: 'Calculator',
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
        id: 10,
        title: 'Make-a-Scrolling-Website',
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
        id: 11,
        title: 'Make-a-Image-Edito',
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
        id: 12,
        title: 'Todo List App',
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
        id: 13,
        title: 'Prayer Times App',
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
