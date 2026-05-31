import { getProfile, getProjects } from '@/lib/api'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import TechStack from '@/components/TechStack'
import Work from '@/components/Work'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

import AnimusCanvas from '@/components/AnimusCanvas'
import FireCanvas from '@/components/FireCanvas'
import type { Profile, Project } from '@/lib/api'

// Revalidate every 1 second (ISR) - for dynamic content like profiles
export const revalidate = 1

const fallbackProfile: Profile = {
    name: 'Bali Abdelkouddous',
    role: 'Crafting digital experiences with the precision of a hidden blade and the power of the gods.',
    bio: [
        "I'm a full-stack developer with a passion for building clean, fast, and scalable web applications. Every line of code is written with purpose and precision.",
        'Based in Algeria - working globally. I transform complex ideas into elegant digital solutions that leave a lasting impact.'
    ].join('\n'),
    photo_url: 'https://res.cloudinary.com/dme6jhgkm/image/upload/v1780237622/my_photo_gfggko.jpg',
    cv_url: 'https://drive.google.com/file/d/1_GnzA6R0in0QnPMqCs-z52sjUkbeS-8o/view?usp=drive_link',
    github: 'https://github.com/Tamer7459',
    linkedin: 'https://linkedin.com/in/abdelkouddous-bali-28032436a',
    email: 'tamerinale@gmail.com',
    whatsapp: '+213549964508',
    years_experience: 3,
    projects_count: 20,

    skills: [
        
    ]
}

const fallbackProjects: Project[] = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        subtitle: 'Full-Stack Web App',
        tags: [
            { id: 1, name: 'Next.js' },
            { id: 2, name: 'Stripe' },
            { id: 3, name: 'PostgreSQL' }
        ],
        github_url: '',
        live_url: '',
        image_url: null,
        status: 'live',
        featured: true
    },
    {
        id: 2,
        title: 'SaaS Dashboard',
        subtitle: 'Web Application',
        tags: [
            { id: 4, name: 'React' },
            { id: 5, name: 'Node.js' },
            { id: 6, name: 'MongoDB' }
        ],
        github_url: '',
        live_url: '',
        image_url: null,
        status: 'wip',
        featured: true
    },
    {
        id: 3,
        title: 'Real-Time Chat App',
        subtitle: 'Real-Time Application',
        tags: [
            { id: 7, name: 'Socket.io' },
            { id: 8, name: 'Express' },
            { id: 9, name: 'Redis' }
        ],
        github_url: '',
        live_url: '',
        image_url: null,
        status: 'live',
        featured: false
    },
    {
        id: 4,
        title: 'Portfolio CMS',
        subtitle: 'Content Management',
        tags: [
            { id: 10, name: 'TypeScript' },
            { id: 11, name: 'Prisma' },
            { id: 12, name: 'Tailwind' }
        ],
        github_url: '',
        live_url: '',
        image_url: null,
        status: 'archived',
        featured: false
    },
    {
        id: 5,
        title: 'REST API Gateway',
        subtitle: 'Backend Infrastructure',
        tags: [
            { id: 13, name: 'Node.js' },
            { id: 14, name: 'Docker' },
            { id: 15, name: 'AWS' }
        ],
        github_url: '',
        live_url: '',
        image_url: null,
        status: 'wip',
        featured: false
    },
    {
        id: 6,
        title: 'AI-Powered Web Tool',
        subtitle: 'AI Integration',
        tags: [
            { id: 16, name: 'Python' },
            { id: 17, name: 'FastAPI' },
            { id: 18, name: 'OpenAI' }
        ],
        github_url: '',
        live_url: '',
        image_url: null,
        status: 'live',
        featured: false
    }
]


export default async function HomePage() {
    // Fetch all data from Django in parallel
    const [profile, projects] = await Promise.all([
        getProfile().catch(() => null),
        getProjects().catch(() => [])
    ])

    const resolvedProfile = profile ?? fallbackProfile
    const resolvedProjects = projects.length ? projects : fallbackProjects

    return (
        <>
            <div className="scroll-progress" id="scrollProgress" />
            <FireCanvas />
            <AnimusCanvas />
            <Nav name={resolvedProfile.name} />

            <main>
                <Hero profile={resolvedProfile} />
                <TechStack />
                <About profile={resolvedProfile} />
                <Work projects={resolvedProjects} />
                <Services />

                <Contact profile={resolvedProfile} />
            </main>

            <Footer name={resolvedProfile.name} />

            <a href="#hero" className="home-fab" aria-label="Go to home">
                ↑
            </a>
        </>
    )
}
