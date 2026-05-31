'use client'
import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    SiJavascript,
    SiReact,
    SiNextdotjs,
    SiNodedotjs,
    SiPython,
    SiDjango,
    SiPostgresql,
    SiMongodb,
    SiTailwindcss,
    SiGit,
    SiDocker,
    SiTypescript,
    SiGnubash,
    SiBootstrap,
    SiC,
    SiCss,
    SiExpress,
    SiFirebase,
    SiFlask,
    SiGulp,
    SiHtml5,
    SiLaravel,
    SiLinux,
    SiMysql,
    SiMui,
    SiPostman,
    SiPug,
    SiRedux,
    SiSqlite,
    SiPhp,
    SiNestjs,
    SiMariadb,
    SiGithub,
    SiVscodium
} from 'react-icons/si'
import { DiVisualstudio, DiMsqlServer } from 'react-icons/di'

const technologies = [
    { name: 'HTML5', icon: SiHtml5, color: '#E34C26' },
    { name: 'CSS', icon: SiCss, color: '#1572B6' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#cccccc' },
    { name: 'Redux', icon: SiRedux, color: '#764ABC' },
    { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Material-UI', icon: SiMui, color: '#007FFF' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Express.js', icon: SiExpress, color: '#aaaaaa' },
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'Django', icon: SiDjango, color: '#44B78B' },
    { name: 'Flask', icon: SiFlask, color: '#aaaaaa' },
    { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
    { name: 'PHP', icon: SiPhp, color: '#777BB4' },
    { name: 'NestJS', icon: SiNestjs, color: '#E0234E' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'MySQL', icon: SiMysql, color: '#00758F' },
    { name: 'MariaDB', icon: SiMariadb, color: '#C0765A' },
    { name: 'SQLite', icon: SiSqlite, color: '#044A64' },
    { name: 'SQL Server', icon: DiMsqlServer, color: '#CC2927' },
    { name: 'Git', icon: SiGit, color: '#F1502F' },
    { name: 'GitHub', icon: SiGithub, color: '#cccccc' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
    { name: 'VS Code', icon: SiVscodium, color: '#007ACC' },
    { name: 'Visual Studio', icon: DiVisualstudio, color: '#9B59B6' },
    { name: 'Bash', icon: SiGnubash, color: '#4EAA25' },
    { name: 'Linux', icon: SiLinux, color: '#FCC624' },
    { name: 'C', icon: SiC, color: '#A8B9CC' },
    { name: 'Gulp', icon: SiGulp, color: '#CF4647' },
    { name: 'Pug', icon: SiPug, color: '#A86454' }
]

export default function TechStack() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        let scrollPosition = 0
        const scrollSpeed = 0.8

        const animate = () => {
            scrollPosition += scrollSpeed
            if (scrollPosition >= container.scrollWidth / 2) {
                scrollPosition = 0
            }
            container.style.transform = `translateX(-${scrollPosition}px)`
            requestAnimationFrame(animate)
        }

        const animationFrame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
    }, [])

    return (
        <section
            style={{
                padding: '80px 0',
                background: 'linear-gradient(180deg, transparent 0%, rgba(204,17,17,0.04) 50%, transparent 100%)',
                overflow: 'hidden',
                margin: '60px 0'
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', marginBottom: 60 }}
            >
                <div className="omega-orbit-wrap" style={{ margin: '0 auto 16px' }}>
                    <div className="omega-orbit-ring" />
                    <div className="omega-orbit-logo">Ω</div>
                </div>
                <h3
                    style={{
                        fontSize: 'clamp(24px, 3vw, 36px)',
                        fontWeight: 700,
                        color: 'var(--white)',
                        letterSpacing: -1,
                        marginBottom: 12
                    }}
                >
                    Tech Stack
                </h3>
                <div
                    style={{
                        width: 60,
                        height: 2,
                        background: 'linear-gradient(to right, var(--red), transparent)',
                        margin: '0 auto'
                    }}
                />
            </motion.div>

            <div
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    margin: '0 68px'
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 100,
                        background: 'linear-gradient(to right, var(--dark2), transparent)',
                        zIndex: 10,
                        pointerEvents: 'none'
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: 100,
                        background: 'linear-gradient(to left, var(--dark2), transparent)',
                        zIndex: 10,
                        pointerEvents: 'none'
                    }}
                />

                <div
                    ref={containerRef}
                    style={{
                        display: 'flex',
                        gap: 40,
                        padding: '20px 0',
                        willChange: 'transform'
                    }}
                >
                    {[...technologies, ...technologies].map((tech, i) => {
                        const Icon = tech.icon
                        return (
                            <motion.div
                                key={i}
                                whileHover={{ y: -8 }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 10,
                                    minWidth: 100
                                }}
                            >
                                <div
                                    style={{
                                        width: 68,
                                        height: 68,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'rgba(255,255,255,0.04)',
                                        border: `1px solid ${tech.color}44`,
                                        borderRadius: 14,
                                        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                                        boxShadow: `0 4px 16px rgba(0,0,0,0.2)`
                                    }}
                                    onMouseEnter={e => {
                                        const el = e.currentTarget as HTMLElement
                                        el.style.borderColor = tech.color
                                        el.style.background = `${tech.color}15`
                                        el.style.boxShadow = `0 8px 32px ${tech.color}33, 0 0 0 1px ${tech.color}22`
                                        el.style.transform = 'translateY(-4px)'
                                    }}
                                    onMouseLeave={e => {
                                        const el = e.currentTarget as HTMLElement
                                        el.style.borderColor = `${tech.color}44`
                                        el.style.background = 'rgba(255,255,255,0.04)'
                                        el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)'
                                        el.style.transform = 'translateY(0)'
                                    }}
                                >
                                    <Icon size={34} color={tech.color} />
                                </div>

                                <span
                                    style={{
                                        fontSize: 10,
                                        color: '#777',
                                        letterSpacing: 0.5,
                                        textAlign: 'center',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {tech.name}
                                </span>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
