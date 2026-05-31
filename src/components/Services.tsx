'use client'
import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Code, Smartphone, Database, Rocket, Shield } from 'lucide-react'

interface Service {
    icon: React.ReactNode
    number: string
    title: string
    description: string
    tags: string[]
}

const services: Service[] = [
    {
        icon: <Zap size={20} />,
        number: '01',
        title: 'Frontend Development',
        description:
            'Pixel-perfect interfaces with React and Next.js. Fast, accessible, and responsive designs that engage users.',
        tags: ['React', 'Next.js', 'TypeScript', 'Tailwind']
    },
    {
        icon: <Code size={20} />,
        number: '02',
        title: 'Backend Development',
        description:
            'Scalable APIs with Django, Node.js, and robust database architecture for production-ready applications.',
        tags: ['Node.js', 'Django', 'PostgreSQL', 'MongoDB']
    },
    {
        icon: <Smartphone size={20} />,
        number: '03',
        title: 'Mobile Development',
        description:
            'Cross-platform mobile solutions that work seamlessly across all devices with native performance.',
        tags: ['React Native', 'Flutter', 'iOS', 'Android']
    },
    {
        icon: <Database size={20} />,
        number: '04',
        title: 'Database Design',
        description:
            'Optimized database architectures for performance, scalability, and reliability at any scale.',
        tags: ['SQL', 'NoSQL', 'Redis', 'Caching']
    },
    {
        icon: <Rocket size={20} />,
        number: '05',
        title: 'DevOps & Deployment',
        description:
            'CI/CD pipelines, containerization, and cloud deployment for seamless production workflows.',
        tags: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions']
    },
    {
        icon: <Shield size={20} />,
        number: '06',
        title: 'Security & Testing',
        description:
            'Comprehensive testing strategies and security best practices to ensure application reliability.',
        tags: ['Jest', 'Cypress', 'Security', 'QA']
    }
]

interface Sparkle {
    id: number
    x: number
    y: number
}

export default function Services() {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: false, margin: '-80px' })

    return (
        <section
            id="services"
            className="services-section"
            ref={ref}
            style={{
                padding: '120px 68px',
                background: 'var(--dark2)'
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7 }}
                style={{ marginBottom: 66 }}
            >
                <div className="sec-tag">003 - Services</div>
                <h2
                    style={{
                        fontSize: 'clamp(34px, 5vw, 62px)',
                        fontWeight: 900,
                        lineHeight: 1.05,
                        letterSpacing: -2,
                        color: 'var(--white)'
                    }}
                >
                    What I{' '}
                    <em style={{ color: '#cc1111', fontStyle: 'normal' }}>
                        Do
                    </em>
                </h2>
            </motion.div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1px',
                    background: 'rgba(255,255,255,0.06)',
                    marginBottom: 66
                }}
            >
                {services.map((service, i) => (
                    <ServiceCard key={i} service={service} index={i} inView={inView} />
                ))}
            </div>
        </section>
    )
}

function ServiceCard({ service, index, inView }: { service: Service; index: number; inView: boolean }) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [sparkles, setSparkles] = useState<Sparkle[]>([])
    const sparkleId = useRef(0)

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const card = cardRef.current
        if (!card) return
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        card.style.setProperty('--rx', `${y * -6}deg`)
        card.style.setProperty('--ry', `${x * 8}deg`)

        // Sparkle spawn
        const id = ++sparkleId.current
        setSparkles(prev => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
        setTimeout(() => {
            setSparkles(prev => prev.filter(s => s.id !== id))
        }, 600)
    }, [])

    const handleMouseLeave = useCallback(() => {
        const card = cardRef.current
        if (!card) return
        card.style.setProperty('--rx', '0deg')
        card.style.setProperty('--ry', '0deg')
        card.style.transition = 'transform 0.5s ease'
        setTimeout(() => { if (card) card.style.transition = '' }, 500)
    }, [])

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 + index * 0.05, duration: 0.6 }}
            className={`group service-card-ux ${index % 2 === 1 ? 'is-right' : ''} ${index < 4 ? 'is-top' : ''}`}
            style={{
                transform: 'perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
                transformStyle: 'preserve-3d',
                position: 'relative'
            } as React.CSSProperties}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="service-card-overlay" />

            {/* Sparkles */}
            {sparkles.map(s => (
                <div
                    key={s.id}
                    className="service-sparkle"
                    style={{ left: s.x, top: s.y }}
                />
            ))}

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '20px',
                        marginBottom: '20px'
                    }}
                >
                    <div className="service-icon-wrap">
                        <div style={{ color: '#cc1111' }}>
                            {service.icon}
                        </div>
                    </div>
                    <span
                        style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: '11px',
                            color: 'rgba(255,255,255,0.1)',
                            letterSpacing: '2px',
                            lineHeight: 1
                        }}
                    >
                        {service.number}
                    </span>
                </div>

                <h3
                    style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#fff',
                        marginBottom: '12px',
                        lineHeight: 1.2
                    }}
                >
                    {service.title}
                </h3>

                <p
                    style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '12px',
                        lineHeight: 1.6,
                        color: '#555',
                        marginBottom: '16px'
                    }}
                >
                    {service.description}
                </p>

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px'
                    }}
                >
                    {service.tags.map((tag, ti) => (
                        <span
                            key={ti}
                            style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: '10px',
                                color: 'rgba(204,17,17,0.6)',
                                letterSpacing: '1px'
                            }}
                        >
                            {ti > 0 && (
                                <span
                                    style={{
                                        color: '#333',
                                        marginRight: '4px'
                                    }}
                                >
                                    —
                                </span>
                            )}
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="service-corner" />
        </motion.div>
    )
}
