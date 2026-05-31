'use client'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import Typewriter from './Typewriter'
import type { Profile } from '@/lib/api'

function rise(delay: number, inView: boolean) {
    return {
        initial: { opacity: 0, y: 22 },
        animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
        transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const }
    }
}

function ParticleBurst({ trigger }: { trigger: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!trigger) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const W = canvas.width = 400
        const H = canvas.height = 400
        const cx = W / 2
        const cy = H / 2

        const particles: {
            x: number; y: number; vx: number; vy: number;
            r: number; life: number; decay: number; color: string
        }[] = []
        const colors = ['#8f0c0c', '#d31b1b', '#ff5a4a', '#fff']

        for (let i = 0; i < 40; i++) {
            const angle = (Math.PI * 2 * i) / 40 + (Math.random() - 0.5) * 0.5
            const speed = 2 + Math.random() * 4
            particles.push({
                x: cx, y: cy,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                r: 1.5 + Math.random() * 2.5,
                life: 1,
                decay: 0.008 + Math.random() * 0.012,
                color: colors[Math.floor(Math.random() * colors.length)]
            })
        }

        let frame = 0
        const maxFrames = 100
        const safeCtx = ctx

        function tick() {
            safeCtx.clearRect(0, 0, W, H)
            for (const p of particles) {
                p.x += p.vx
                p.y += p.vy
                p.vx *= 0.97
                p.vy *= 0.97
                p.life -= p.decay
                if (p.life > 0) {
                    safeCtx.globalAlpha = p.life
                    safeCtx.beginPath()
                    safeCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                    safeCtx.fillStyle = p.color
                    safeCtx.fill()
                    safeCtx.globalAlpha = 1
                }
            }
            frame++
            if (frame < maxFrames) requestAnimationFrame(tick)
        }
        tick()
    }, [trigger])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute', top: '30%', left: '25%',
                width: 400, height: 400, pointerEvents: 'none', zIndex: 6,
                transform: 'translate(-50%, -50%)'
            }}
        />
    )
}

function GlitchText({ children }: { children: React.ReactNode }) {
    const [glitching, setGlitching] = useState(false)

    useEffect(() => {
        const trigger = () => {
            setGlitching(true)
            setTimeout(() => setGlitching(false), 350)
        }
        trigger()
        const interval = setInterval(trigger, 5000 + Math.random() * 4000)
        return () => clearInterval(interval)
    }, [])

    return (
        <span className="glitch-wrap">
            <span className="glitch-base">{children}</span>
            {glitching && (
                <>
                    <span className="glitch-overlay" aria-hidden>{children}</span>
                    <span className="glitch-overlay-2" aria-hidden>{children}</span>
                </>
            )}
        </span>
    )
}

export default function Hero({ profile }: { profile: Profile }) {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: false, margin: '-120px' })
    const [burstTrigger, setBurstTrigger] = useState(false)
    const heroContentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (inView && !burstTrigger) {
            setBurstTrigger(true)
        }
    }, [inView, burstTrigger])

    const parts = profile.name.split(' ')
    const firstName = parts[0]
    const lastName = parts.slice(1).join(' ')
    const photoUrl = profile.photo_url ?? 'https://res.cloudinary.com/dme6jhgkm/image/upload/v1780237622/my_photo_gfggko.jpg'

    return (
        <section
            id="hero"
            className="hero-section"
            ref={ref}
            style={{
                position: 'relative',
                minHeight: '100vh',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                alignItems: 'center',
                padding: '120px 68px 80px',
                gap: 40
            }}
        >
            {/* Particle Burst */}
            <ParticleBurst trigger={burstTrigger} />

            {/* LEFT — text */}
            <div ref={heroContentRef} style={{ position: 'relative', zIndex: 5 }}>
                <motion.div
                    {...rise(0.5, inView)}
                    style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 10,
                        letterSpacing: 5,
                        color: 'var(--red)',
                        textTransform: 'uppercase',
                        marginBottom: 22,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14
                    }}
                >
                    <span
                        style={{
                            width: 24,
                            height: 1,
                            background: 'var(--red)',
                            display: 'inline-block'
                        }}
                    />
                    {'// Full-Stack Developer - Available Now'}
                </motion.div>

                <motion.h1
                    {...rise(0.65, inView)}
                    style={{
                        fontSize: 'clamp(40px, 5.5vw, 80px)',
                        fontWeight: 900,
                        lineHeight: 0.92,
                        letterSpacing: -2.2,
                        textTransform: 'uppercase'
                    }}
                >
                    <span style={{ display: 'block', color: 'var(--white)' }}>
                        <GlitchText>{firstName}</GlitchText>
                    </span>
                    <span
                        style={{
                            display: 'block',
                            background:
                                'linear-gradient(135deg, var(--red2) 0%, var(--red3) 40%, #fff 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        {lastName}
                    </span>
                </motion.h1>

                <motion.div
                    {...rise(0.8, inView)}
                    style={{
                        width: 60,
                        height: 2,
                        margin: '22px 0',
                        background:
                            'linear-gradient(to right, var(--red), transparent)'
                    }}
                />

                <Typewriter
                    texts={[
                        'Crafting digital experiences with precision and creativity',
                        'Full-Stack Developer & Problem Solver',
                        'Building the future, one commit at a time',
                        'Nothing is true · Everything is permitted'
                    ]}
                    delay={0.85}
                />

                <motion.p
                    {...rise(0.95, inView)}
                    style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 13,
                        letterSpacing: 1.5,
                        wordSpacing: 2,
                        color: 'var(--grey)',
                        lineHeight: 1.7
                    }}
                >
                    {profile.role}
                </motion.p>

                <motion.div
                    {...rise(1.1, inView)}
                    style={{
                        marginTop: 40,
                        display: 'flex',
                        gap: 14,
                        alignItems: 'center'
                    }}
                >
                    <a href="#work" className="btn-red">
                        View Work
                    </a>
                    <a
                        href={profile.cv_url ?? '#contact'}
                        target={profile.cv_url ? '_blank' : undefined}
                        rel={profile.cv_url ? 'noopener noreferrer' : undefined}
                        className="btn-cv"
                    >
                        {profile.cv_url ? 'View CV' : 'Add CV'}
                    </a>
                    <a href="#contact" className="btn-ghost">
                        Get in touch
                    </a>
                </motion.div>

                <motion.div
                    {...rise(1.22, inView)}
                    style={{ marginTop: 44, display: 'flex', gap: 42 }}
                >
                    {[
                        {
                            n: profile.years_experience,
                            suffix: '+',
                            label: 'Years Exp.'
                        },
                        {
                            n: profile.projects_count,
                            suffix: '+',
                            label: 'Projects'
                        },
                        {
                            n: '∞',
                            suffix: '',
                            label: 'Dedication'
                        }
                    ].map(s => (
                        <div
                            key={s.label}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 5
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "'Cinzel', serif",
                                    fontSize: 30,
                                    fontWeight: 900,
                                    color: 'var(--white)',
                                    letterSpacing: -1,
                                    lineHeight: 1
                                }}
                            >
                                {s.n}
                                <em
                                    style={{
                                        color: 'var(--red)',
                                        fontStyle: 'normal',
                                        fontSize: 20
                                    }}
                                >
                                    {s.suffix}
                                </em>
                            </span>
                            <span
                                style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: 9,
                                    letterSpacing: 2,
                                    color: 'var(--dim)',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {s.label}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* RIGHT — photo */}
            <motion.div
                className="hero-right-wrap"
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 1, delay: 0.7 }}
                style={{
                    position: 'relative',
                    zIndex: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                }}
            >
                {photoUrl ? (
                    <div style={{ position: 'relative', width: 320 }}>
                        <div
                            style={{
                                position: 'absolute',
                                top: -24,
                                left: 0,
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 9,
                                letterSpacing: 3,
                                color: 'rgba(204,17,17,.45)'
                            }}
                        >
                            [ ANIMUS v4.2 ]
                        </div>

                        <Image
                            src={photoUrl}
                            alt={profile.name}
                            width={320}
                            height={490}
                            priority
                            style={{
                                width: '100%',
                                height: 490,
                                objectFit: 'cover',
                                objectPosition: 'center top',
                                filter: 'grayscale(18%) contrast(1.1) brightness(.88)',
                                WebkitMaskImage:
                                    'linear-gradient(to bottom, black 50%, transparent 100%)',
                                maskImage:
                                    'linear-gradient(to bottom, black 50%, transparent 100%)'
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '90%',
                                height: 180,
                                background:
                                    'radial-gradient(ellipse at bottom, rgba(204,17,17,.45) 0%, rgba(140,0,0,.15) 50%, transparent 70%)',
                                pointerEvents: 'none',
                                animation: 'fGlow 2.5s ease-in-out infinite'
                            }}
                        />

                        <div
                            style={{
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                width: 34,
                                height: 34,
                                borderTop: '1px solid var(--red)',
                                borderLeft: '1px solid var(--red)'
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 58,
                                right: -20,
                                background: '#000',
                                border: '1px solid rgba(204,17,17,.4)',
                                padding: '10px 15px',
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 9,
                                letterSpacing: 2,
                                color: 'var(--red)',
                                textTransform: 'uppercase',
                                whiteSpace: 'nowrap',
                                animation: 'bdg 3s ease-in-out infinite'
                            }}
                        >
                            ◈ Web Developer
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 55,
                                right: -26,
                                width: 34,
                                height: 34,
                                borderBottom: '1px solid var(--red)',
                                borderRight: '1px solid var(--red)'
                            }}
                        />
                    </div>
                ) : (
                    <div
                        style={{
                            width: 320,
                            height: 490,
                            border: '1px solid rgba(204,17,17,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 10,
                            color: 'var(--dim)'
                        }}
                    >
                        NO PHOTO
                    </div>
                )}
            </motion.div>
        </section>
    )
}
