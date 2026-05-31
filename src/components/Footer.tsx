'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <motion.li
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            style={{ marginBottom: 10 }}
        >
            <a
                href={href}
                style={{
                    color: 'var(--dim)',
                    fontSize: 12,
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: 0.5,
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    position: 'relative',
                    paddingLeft: 0
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--red)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--dim)' }}
            >
                <span style={{ color: 'var(--red)', opacity: 0, marginRight: 4, transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.parentElement!.style.paddingLeft = '14px' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0'; e.currentTarget.parentElement!.style.paddingLeft = '0' }}
                >&#62;</span>
                {children}
            </a>
        </motion.li>
    )
}

function ServiceItem({ children }: { children: React.ReactNode }) {
    return (
        <li style={{
            color: 'var(--dim)',
            fontSize: 12,
            fontFamily: "'DM Mono', monospace",
            letterSpacing: 0.5,
            marginBottom: 10,
            position: 'relative',
            paddingLeft: 12
        }}>
            <span style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 3,
                height: 3,
                borderRadius: '50%',
                background: 'var(--red)',
                opacity: 0.4
            }} />
            {children}
        </li>
    )
}

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    })
}

export default function Footer({ name = 'Developer' }: { name?: string }) {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, margin: '-40px' })

    return (
        <motion.footer
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{
                borderTop: '1px solid var(--line)',
                position: 'relative',
                zIndex: 5,
                padding: '60px 68px 0',
                background: 'linear-gradient(180deg, transparent 0%, rgba(204,17,17,0.02) 100%)'
            }}
        >
            {/* Main grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr',
                    gap: 60,
                    paddingBottom: 40,
                    maxWidth: 1200,
                    margin: '0 auto'
                }}
            >
                {/* Brand */}
                <motion.div custom={0} variants={fadeUp}>
                    <span
                        style={{
                            fontSize: 22,
                            fontWeight: 800,
                            letterSpacing: -0.5,
                            color: 'var(--white)'
                        }}
                    >
                        {name}
                        <span style={{ color: 'var(--red)' }}>.</span>
                    </span>
                    <p style={{
                        color: 'var(--dim)',
                        fontSize: 12,
                        fontFamily: "'DM Mono', monospace",
                        lineHeight: 1.8,
                        marginTop: 14,
                        maxWidth: 280
                    }}>
                        Crafting digital experiences with the precision of a hidden blade and the power of the gods.
                    </p>
                </motion.div>

                {/* Quick Links */}
                <motion.div custom={1} variants={fadeUp}>
                    <h4 style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: 'var(--white)',
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                        marginBottom: 20
                    }}>
                        Quick Links
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <FooterLink href="#hero">Home</FooterLink>
                        <FooterLink href="#about">About</FooterLink>
                        <FooterLink href="#work">Projects</FooterLink>
                        <FooterLink href="#contact">Contact</FooterLink>
                    </ul>
                </motion.div>

                {/* Services */}
                <motion.div custom={2} variants={fadeUp}>
                    <h4 style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: 'var(--white)',
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                        marginBottom: 20
                    }}>
                        Services
                    </h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <ServiceItem>Frontend Development</ServiceItem>
                        <ServiceItem>Backend Development</ServiceItem>
                        <ServiceItem>UI/UX Design</ServiceItem>
                        <ServiceItem>API Architecture</ServiceItem>
                    </ul>
                </motion.div>
            </div>

            {/* Bottom bar */}
            <motion.div
                custom={3}
                variants={fadeUp}
                style={{
                    borderTop: '1px solid var(--line)',
                    padding: '20px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: 1200,
                    margin: '0 auto'
                }}
            >
                <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9,
                    letterSpacing: 3,
                    color: 'var(--dim)',
                    textTransform: 'uppercase'
                }}>
                    &copy; {new Date().getFullYear()} {name}
                </span>
                <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9,
                    letterSpacing: 3,
                    color: 'var(--dim)',
                    textTransform: 'uppercase'
                }}>
                    Nothing is true &middot; Everything is permitted
                </span>
            </motion.div>

            {/* Omega watermark */}
            <div style={{
                position: 'absolute',
                right: '5%',
                bottom: '20%',
                fontSize: 80,
                fontFamily: "'Cinzel Decorative', serif",
                color: 'rgba(204,17,17,0.06)',
                pointerEvents: 'none',
                lineHeight: 1,
                userSelect: 'none'
            }}>
                &Omega;
            </div>
        </motion.footer>
    )
}
