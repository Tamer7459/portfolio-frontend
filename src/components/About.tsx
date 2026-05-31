'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Profile } from '@/lib/api'

const workExperience = [
    {
        period: '2024 - Present',
        role: 'Full Stack Developer',
        company: 'Freelance & Startup',
        achievement: 'Built 10+ production projects',
        highlight: 'ProDZ concept (Service marketplace)'
    },
    {
        period: '2023 - 2024',
        role: 'Junior Developer',
        company: 'Self-Taught & Academic',
        achievement: '1st Place Hackathon (GFR Project)',
        highlight: '28+ REST API endpoints, Multi-role system'
    },
    {
        period: '2022 - 2023',
        role: 'Learner & Builder',
        company: 'Personal Projects',
        achievement: 'Mastered core technologies',
        highlight: 'React, Laravel, Node.js foundations'
    }
]

const achievementsData = [
    {
        icon: 'trophy',
        title: 'Hackathon Winner',
        description: 'Won 1st place for GFR - Full-stack academic networking platform with 28+ API endpoints',
        year: '2024'
    },
    {
        icon: 'graduation',
        title: 'Finance Graduate',
        description: 'Université Prince Abdelkader, Constantine - Bridging business & technology',
        year: '2023'
    },
    {
        icon: 'rocket',
        title: 'Startup Founder',
        description: 'Conceptualized ProDZ - Service provider marketplace targeting Algerian market',
        year: '2024'
    },
    {
        icon: 'shield',
        title: 'Cybersecurity Interest',
        description: 'Kali Linux, Metasploit, Web Security - Combining development with security expertise',
        year: 'Ongoing'
    }
]

const coreValuesData = [
    {
        icon: 'bulb',
        title: 'Innovation',
        description: 'Building next-generation solutions with cutting-edge technologies'
    },
    {
        icon: 'zap',
        title: 'Performance',
        description: 'Code that is fast, scalable, and production-ready from day one'
    },
    {
        icon: 'handshake',
        title: 'Collaboration',
        description: 'Working effectively in teams and contributing to community growth'
    },
    {
        icon: 'target',
        title: 'Quality',
        description: 'Delivering clean, maintainable code with comprehensive testing'
    }
]

const statsData = [
    { label: 'Years Experience', value: 2, icon: 'chart' },
    { label: 'Projects Completed', value: 10, icon: 'briefcase' },
    { label: 'Happy Clients', value: 5, icon: 'users' },
    { label: 'Tech Stack', value: 15, icon: 'gear' }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.05 }
    }
}

const fadeSlide3D = {
    hidden: { opacity: 0, y: 30, rotateX: 8, perspective: 800 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
    }
}

function useParallax(speed: number) {
    const [y, setY] = useState(0)

    useEffect(() => {
        const onScroll = () => {
            setY(window.scrollY * speed)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [speed])

    return y
}

function FloatingOmega() {
    return (
        <div
            style={{
                position: 'absolute',
                right: '5%',
                top: '15%',
                width: 160,
                height: 160,
                perspective: 600,
                pointerEvents: 'none',
                zIndex: 0,
                opacity: 0.12
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    animation: 'omegaFloat 8s ease-in-out infinite'
                }}
            >
                <div
                    style={{
                        width: 160,
                        height: 160,
                        border: '1px solid rgba(204,17,17,0.2)',
                        borderRadius: '50%',
                        position: 'absolute',
                        animation: 'omegaSpin 12s linear infinite',
                        boxShadow: '0 0 30px rgba(204,17,17,0.1)'
                    }}
                />
                <div
                    style={{
                        width: 110,
                        height: 110,
                        border: '1px dashed rgba(204,17,17,0.15)',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        animation: 'omegaSpinReverse 8s linear infinite'
                    }}
                />
                <span
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) translateZ(20px)',
                        fontFamily: "'Cinzel Decorative', serif",
                        fontSize: 56,
                        color: 'rgba(204,17,17,0.3)',
                        textShadow: '0 0 20px rgba(204,17,17,0.2)'
                    }}
                >
                    Ω
                </span>
            </div>
        </div>
    )
}

/* ── Full SVG Icon Library ── */
const iconSvgs: Record<string, (color: string, size?: number) => React.ReactNode> = {
    about: (c, s = 22) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    ),
    values: (c, s = 22) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    experience: (c, s = 22) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    ),
    achievements: (c, s = 22) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
    ),
    chart: (c, s = 24) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
    ),
    briefcase: (c, s = 24) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    ),
    users: (c, s = 24) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    gear: (c, s = 24) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    ),
    bulb: (c, s = 22) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6" />
            <path d="M10 22h4" />
            <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
        </svg>
    ),
    zap: (c, s = 22) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    ),
    handshake: (c, s = 22) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
        </svg>
    ),
    target: (c, s = 22) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    ),
    trophy: (c, s = 26) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
    ),
    graduation: (c, s = 26) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
    ),
    rocket: (c, s = 26) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
    ),
    shield: (c, s = 26) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    cta: (c, s = 22) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}

function AnimatedSectionIcon({ name, delay = 0, size = 22 }: { name: string; delay?: number; size?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const [hovered, setHovered] = useState(false)
    const iconInView = useInView(ref, { once: true })

    const svg = iconSvgs[name]
    if (!svg) return null

    const color = hovered ? '#ff5a4a' : '#cc1111'

    return (
        <motion.div
            ref={ref}
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={iconInView ? { scale: 1, rotate: 0, opacity: 1 } : {}}
            transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                width: size + 24,
                height: size + 24,
                borderRadius: 12,
                border: `1px solid ${hovered ? 'rgba(204,17,17,0.6)' : 'rgba(204,17,17,0.25)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: hovered ? 'rgba(204,17,17,0.1)' : 'rgba(204,17,17,0.04)',
                transition: 'all 0.3s ease',
                boxShadow: hovered ? '0 0 20px rgba(204,17,17,0.2), inset 0 0 12px rgba(204,17,17,0.06)' : 'none',
                flexShrink: 0
            }}
        >
            <motion.div
                animate={hovered ? { rotate: [0, -10, 10, -5, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                {svg(color, size)}
            </motion.div>
        </motion.div>
    )
}

function AnimatedCardIcon({ name, size = 22, delay = 0 }: { name: string; size?: number; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const [hovered, setHovered] = useState(false)
    const iconInView = useInView(ref, { once: true })
    const svg = iconSvgs[name]
    if (!svg) return null

    const color = hovered ? '#ff5a4a' : '#cc1111'

    return (
        <motion.div
            ref={ref}
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={iconInView ? { scale: 1, rotate: 0, opacity: 1 } : {}}
            transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                width: size + 16,
                height: size + 16,
                borderRadius: 10,
                border: `1px solid ${hovered ? 'rgba(204,17,17,0.5)' : 'rgba(204,17,17,0.15)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: hovered ? 'rgba(204,17,17,0.08)' : 'rgba(204,17,17,0.02)',
                transition: 'all 0.3s ease',
                flexShrink: 0
            }}
        >
            <motion.div
                animate={hovered ? { rotate: [0, -8, 8, -4, 0], scale: 1.08 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.35 }}
            >
                {svg(color, size)}
            </motion.div>
        </motion.div>
    )
}

function GlowOrb({ color = 'rgba(204,17,17,0.08)' }) {
    return (
        <div
            style={{
                position: 'absolute',
                top: '20%',
                left: '30%',
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${color}, transparent 70%)`,
                pointerEvents: 'none',
                opacity: 0.4,
                animation: 'omegaFloat 6s ease-in-out infinite alternate'
            }}
        />
    )
}

function TiltCard({
    children,
    style,
    className,
    ...props
}: {
    children: React.ReactNode
    style?: React.CSSProperties
    className?: string
    [key: string]: any
}) {
    const ref = useRef<HTMLDivElement>(null)

    const onMove = useCallback((e: React.MouseEvent) => {
        const card = ref.current
        if (!card) return
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${y * -6}deg) translateZ(6px)`
        card.style.transition = 'transform 0.08s ease'
    }, [])

    const onLeave = useCallback(() => {
        const card = ref.current
        if (!card) return
        card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
        card.style.transition = 'transform 0.5s ease'
    }, [])

    return (
        <div
            ref={ref}
            className={className}
            style={{ transformStyle: 'preserve-3d', ...style }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            {...props}
        >
            {children}
        </div>
    )
}

/* ── Floating Particles for CTA ── */
function FloatingParticles() {
    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {[0, 1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: [0, 0.3, 0],
                        y: [20, -60 + i * 30],
                        x: [-20 + i * 15, 20 - i * 10]
                    }}
                    transition={{
                        duration: 3 + i * 1.2,
                        repeat: Infinity,
                        delay: i * 0.6,
                        ease: 'easeInOut'
                    }}
                    style={{
                        position: 'absolute',
                        left: `${15 + i * 22}%`,
                        top: `${50 + (i % 2) * 30}%`,
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: 'rgba(204,17,17,0.3)',
                        boxShadow: '0 0 6px rgba(204,17,17,0.2)'
                    }}
                />
            ))}
        </div>
    )
}

function AnimatedBorder({ children }: { children: React.ReactNode }) {
    const [start, setStart] = useState({ x: 0, y: 0 })
    const ref = useRef<HTMLDivElement>(null)

    const onMove = useCallback((e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        setStart({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100
        })
    }, [])

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 12
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(400px circle at ${start.x}% ${start.y}%, rgba(204,17,17,0.08), transparent 50%)`,
                    pointerEvents: 'none',
                    transition: 'background 0.15s ease'
                }}
            />
            {children}
        </div>
    )
}

export default function About({ profile }: { profile: Profile }) {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: false, margin: '-80px' })
    const parallaxY = useParallax(-0.04)

    return (
        <section
            id="about"
            className="about-section"
            ref={ref}
            style={{
                padding: 'clamp(80px, 10vw, 120px) clamp(24px, 5vw, 68px)',
                background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(204,17,17,0.05) 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <FloatingOmega />

            {/* Parallax depth layers */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 0,
                    transform: `translateY(${parallaxY}px)`
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '20%',
                        left: '8%',
                        width: 120,
                        height: 120,
                        border: '1px solid rgba(204,17,17,0.06)',
                        borderRadius: '50%',
                        opacity: 0.4
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '30%',
                        right: '12%',
                        width: 80,
                        height: 80,
                        border: '1px solid rgba(204,17,17,0.04)',
                        transform: 'rotate(45deg)',
                        opacity: 0.3
                    }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20, rotateX: 5, perspective: 800 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginBottom: 60, position: 'relative', zIndex: 1 }}
            >
                <div className="sec-tag">001 - About Me</div>
                <h2
                    style={{
                        fontSize: 'clamp(28px, 4vw, 56px)',
                        fontWeight: 900,
                        lineHeight: 1.1,
                        letterSpacing: -1.5,
                        color: 'var(--white)',
                        marginBottom: 16,
                        background: 'linear-gradient(135deg, #fff 0%, #ccc 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}
                >
                    Full-Stack Developer & Digital Creator
                </h2>
                <p
                    style={{
                        fontSize: 'clamp(13px, 1.5vw, 16px)',
                        color: '#888',
                        maxWidth: '600px',
                        lineHeight: 1.6
                    }}
                >
                    Transforming ideas into elegant, scalable web solutions with modern technologies and creative problem-solving.
                </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: 20,
                    marginBottom: 80,
                    position: 'relative',
                    zIndex: 1,
                    perspective: 900
                }}
            >
                {statsData.map((stat, i) => (
                    <motion.div
                        key={i}
                        variants={fadeSlide3D}
                        className="stat-card"
                        style={{
                            transformStyle: 'preserve-3d',
                            position: 'relative',
                            overflow: 'hidden'
                        } as React.CSSProperties}
                    >
                        <GlowOrb />
                        <TiltCard>
                            <div style={{ marginBottom: 10, transform: 'translateZ(16px)', display: 'flex', justifyContent: 'center' }}>
                                <AnimatedCardIcon name={stat.icon} size={26} delay={0.1 + i * 0.05} />
                            </div>
                            <div
                                style={{
                                    fontSize: '34px',
                                    fontWeight: 900,
                                    color: 'var(--red)',
                                    marginBottom: 4,
                                    lineHeight: 1,
                                    transform: 'translateZ(8px)'
                                }}
                            >
                                <CountUp value={stat.value} inView={inView} />{stat.label.includes('Years') ? '+' : ''}
                            </div>
                            <div style={{ fontSize: '10px', color: '#666', letterSpacing: 1.5, textTransform: 'uppercase', transform: 'translateZ(4px)' }}>
                                {stat.label}
                            </div>
                        </TiltCard>
                    </motion.div>
                ))}
            </motion.div>

            {/* Main Content Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 60,
                    marginBottom: 80,
                    position: 'relative',
                    zIndex: 1
                }}
            >
                {/* Bio Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20, rotateY: 3, perspective: 800 }}
                    animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                    transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h3
                        style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            color: 'var(--white)',
                            marginBottom: 20,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12
                        }}
                    >
                        <AnimatedSectionIcon name="about" delay={0.15} />
                        About Me
                    </h3>
                    {profile.bio.split('\n').map((para, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                            style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: '13px',
                                lineHeight: 1.9,
                                color: '#666',
                                marginBottom: 14,
                                textAlign: 'justify'
                            }}
                        >
                            {para}
                        </motion.p>
                    ))}
                </motion.div>

                {/* Core Values Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20, rotateY: -3, perspective: 800 }}
                    animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                    transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h3
                        style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            color: 'var(--white)',
                            marginBottom: 20,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12
                        }}
                    >
                        <AnimatedSectionIcon name="values" delay={0.25} />
                        Core Values
                    </h3>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                    >
                        {coreValuesData.map((value, i) => (
                            <motion.div
                                key={i}
                                variants={fadeSlide3D}
                                style={{
                                    transformStyle: 'preserve-3d',
                                    cursor: 'default'
                                }}
                            >
                                <TiltCard
                                    className="value-card"
                                    style={{
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            bottom: 0,
                                            width: 3,
                                            background: 'linear-gradient(to bottom, var(--red), transparent)',
                                            borderRadius: '3px 0 0 3px',
                                            opacity: 0.6
                                        }}
                                    />
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                                        <AnimatedCardIcon name={value.icon} size={18} delay={0.25 + i * 0.06} />
                                        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--white)', margin: 0, transform: 'translateZ(12px)' }}>
                                            {value.title}
                                        </h4>
                                    </div>
                                    <p style={{ fontSize: '12px', color: '#777', margin: 0, lineHeight: 1.5, paddingLeft: '34px' }}>
                                        {value.description}
                                    </p>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Work Experience Timeline */}
            <motion.div
                initial={{ opacity: 0, y: 30, perspective: 800 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginBottom: 80, position: 'relative', zIndex: 1 }}
            >
                <h3
                    style={{
                        fontSize: '22px',
                        fontWeight: 700,
                        color: 'var(--white)',
                        marginBottom: 40,
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12
                    }}
                >
                    <AnimatedSectionIcon name="experience" delay={0.35} />
                    Experience Journey
                </h3>
                <div style={{ position: 'relative', paddingLeft: '40px' }}>
                    <motion.div
                        initial={{ height: 0 }}
                        animate={inView ? { height: '100%' } : {}}
                        transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: 'absolute',
                            left: '12px',
                            top: 0,
                            bottom: 0,
                            width: '1px',
                            background: 'linear-gradient(to bottom, var(--red), rgba(204,17,17,0.1))'
                        }}
                    />

                    {workExperience.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20, rotateY: 4, perspective: 800 }}
                            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                            transition={{ delay: 0.4 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            style={{ marginBottom: 32, position: 'relative' }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={inView ? { scale: 1 } : {}}
                                transition={{ delay: 0.5 + i * 0.12, duration: 0.4, type: 'spring', stiffness: 200 }}
                                style={{
                                    position: 'absolute',
                                    left: '-40px',
                                    top: '6px',
                                    width: '22px',
                                    height: '22px',
                                    borderRadius: '50%',
                                    background: '#0a0a0a',
                                    border: '2px solid var(--red)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 0 12px rgba(204,17,17,0.3)'
                                }}
                            >
                                <div
                                    style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: 'var(--red)',
                                        animation: 'omegaPulse 2s ease-in-out infinite'
                                    }}
                                />
                            </motion.div>

                            <TiltCard
                                className="timeline-card"
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                                    <div>
                                        <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--white)', margin: '0 0 4px 0', transform: 'translateZ(12px)' }}>
                                            {exp.role}
                                        </h4>
                                        <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>
                                            {exp.company}
                                        </p>
                                    </div>
                                    <motion.span
                                        whileHover={{ scale: 1.05, background: 'rgba(204,17,17,0.18)' }}
                                        style={{
                                            fontSize: '10px',
                                            color: 'var(--red)',
                                            fontWeight: 600,
                                            letterSpacing: 1,
                                            padding: '4px 10px',
                                            background: 'rgba(204,17,17,0.1)',
                                            borderRadius: 6,
                                            whiteSpace: 'nowrap',
                                            transform: 'translateZ(8px)'
                                        }}
                                    >
                                        {exp.period}
                                    </motion.span>
                                </div>
                                <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(204,17,17,0.08)' }}>
                                    <p style={{ fontSize: '12px', color: '#bbb', margin: '0 0 4px 0' }}>
                                        <strong style={{ color: 'var(--red2)' }}>Achievement:</strong> {exp.achievement}
                                    </p>
                                    <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>
                                        <strong style={{ color: 'var(--red2)' }}>Highlight:</strong> {exp.highlight}
                                    </p>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Key Achievements */}
            <motion.div
                initial={{ opacity: 0, y: 30, perspective: 800 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginBottom: 80, position: 'relative', zIndex: 1 }}
            >
                <h3
                    style={{
                        fontSize: '22px',
                        fontWeight: 700,
                        color: 'var(--white)',
                        marginBottom: 40,
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12
                    }}
                >
                    <AnimatedSectionIcon name="achievements" delay={0.45} />
                    Key Achievements
                </h3>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: 20,
                        perspective: 900
                    }}
                >
                    {achievementsData.map((achievement, i) => (
                        <motion.div
                            key={i}
                            variants={fadeSlide3D}
                            className="achievement-card"
                            style={{
                                transformStyle: 'preserve-3d',
                                position: 'relative',
                                overflow: 'hidden'
                            } as React.CSSProperties}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-30%',
                                    right: '-20%',
                                    width: 100,
                                    height: 100,
                                    borderRadius: '50%',
                                    background: 'radial-gradient(circle, rgba(204,17,17,0.06), transparent 70%)',
                                    pointerEvents: 'none'
                                }}
                            />
                            <TiltCard>
                                <div style={{ marginBottom: 14, transform: 'translateZ(20px)', display: 'flex', justifyContent: 'center' }}>
                                    <AnimatedCardIcon name={achievement.icon} size={28} delay={0.45 + i * 0.08} />
                                </div>
                                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--white)', margin: '0 0 8px 0', transform: 'translateZ(14px)' }}>
                                    {achievement.title}
                                </h4>
                                <p style={{ fontSize: '12px', color: '#888', lineHeight: 1.7, margin: '0 0 14px 0' }}>
                                    {achievement.description}
                                </p>
                                <motion.span
                                    whileHover={{ scale: 1.05, background: 'rgba(204,17,17,0.18)' }}
                                    style={{
                                        fontSize: '10px',
                                        color: 'var(--red)',
                                        fontWeight: 600,
                                        letterSpacing: 1,
                                        padding: '3px 10px',
                                        background: 'rgba(204,17,17,0.1)',
                                        borderRadius: 6,
                                        display: 'inline-block',
                                        transform: 'translateZ(8px)'
                                    }}
                                >
                                    {achievement.year}
                                </motion.span>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 4, perspective: 800 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    textAlign: 'center',
                    padding: '48px 40px',
                    background: 'rgba(204,17,17,0.04)',
                    border: '1px solid rgba(204,17,17,0.12)',
                    borderRadius: 12,
                    position: 'relative',
                    overflow: 'hidden',
                    transformStyle: 'preserve-3d',
                    zIndex: 1
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(600px circle at 50% 50%, rgba(204,17,17,0.06), transparent 60%)',
                        pointerEvents: 'none'
                    }}
                />
                <FloatingParticles />
                <AnimatedBorder>
                    <div style={{ position: 'relative', zIndex: 1, padding: '0 10px' }}>
                        <h3
                            style={{
                                fontSize: '20px',
                                fontWeight: 700,
                                color: 'var(--white)',
                                marginBottom: 12,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 10
                            }}
                        >
                            Ready to Work Together?
                            <motion.span
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 1.2, repeat: Infinity }}
                                style={{ display: 'inline-flex' }}
                            >
                                <AnimatedSectionIcon name="cta" size={18} />
                            </motion.span>
                        </h3>
                        <p style={{ fontSize: '14px', color: '#888', marginBottom: 24, fontFamily: "'DM Mono', monospace" }}>
                            Let&apos;s build something amazing. Reach out and let&apos;s discuss your next project.
                        </p>
                        <motion.a
                            href="#contact"
                            className="btn-red"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(204,17,17,0.3)' }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                transition: 'opacity 0.3s, transform 0.3s',
                                display: 'inline-block'
                            }}
                        >
                            Start a Conversation
                        </motion.a>
                    </div>
                </AnimatedBorder>
            </motion.div>
        </section>
    )
}

function CountUp({ value, inView }: { value: number; inView: boolean }) {
    const ref = useRef<HTMLSpanElement>(null)
    const displayed = useRef(0)

    useEffect(() => {
        if (!inView || !ref.current) return
        displayed.current = 0
        const duration = 1000
        const steps = 25
        const increment = value / steps
        const stepTime = duration / steps

        const timer = setInterval(() => {
            displayed.current += increment
            if (ref.current) {
                ref.current.textContent = String(Math.floor(displayed.current))
            }
            if (displayed.current >= value) {
                if (ref.current) ref.current.textContent = String(value)
                clearInterval(timer)
            }
        }, stepTime)

        return () => clearInterval(timer)
    }, [inView, value])

    return <span ref={ref}>0</span>
}
