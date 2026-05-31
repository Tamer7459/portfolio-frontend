'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Project } from '@/lib/api'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.15 }
    }
}

export default function Work({ projects }: { projects: Project[] }) {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: false, margin: '-60px' })

    return (
        <section
            id="work"
            className="work-section"
            ref={ref}
            style={{ padding: '120px 68px' }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginBottom: 80
                }}
            >
                <div>
                    <div className="sec-tag">002 - Selected Work</div>
                    <h2
                        style={{
                            fontSize: 'clamp(34px, 5vw, 62px)',
                            fontWeight: 900,
                            lineHeight: 1.05,
                            letterSpacing: -2,
                            color: 'var(--white)'
                        }}
                    >
                        Projects
                    </h2>
                </div>
                <span
                    style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 11,
                        letterSpacing: 2,
                        color: 'var(--dim)'
                    }}
                >
                    {String(projects.length).padStart(2, '0')} Missions
                </span>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                    gap: 28,
                    width: '100%'
                }}
            >
                {projects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                ))}
            </motion.div>
        </section>
    )
}

function ProjectCard({
    project,
    index
}: {
    project: Project
    index: number
}) {
    const router = useRouter()
    const safeSubtitle = project.subtitle || 'Premium Project'
    const safeTags = Array.isArray(project.tags) ? project.tags : []
    const statusLabel = (project.status || 'unknown').toUpperCase()
    const hasImage = Boolean(project.image_url)
    const githubUrl = project.github_url || '#'
    const liveUrl = project.live_url || '#'
    const detailHref = `/project/${project.id}`
    const isNavigable = Boolean(project.id)

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1] as const
            }
        }
    }

    return (
        <motion.div
            variants={cardVariants}
            style={{
                position: 'relative',
                height: '100%',
                borderRadius: 16,
                overflow: 'hidden',
                background: 'rgba(18, 18, 18, 0.8)',
                border: '1px solid rgba(204, 17, 17, 0.08)'
            }}
            className={`project-card-wrapper project-card-3d${project.featured ? ' featured' : ''}`}
            role={isNavigable ? 'link' : undefined}
            tabIndex={isNavigable ? 0 : -1}
            aria-label={isNavigable ? `Open project ${project.title}` : undefined}
            onClick={() => {
                if (isNavigable) router.push(detailHref)
            }}
            onKeyDown={event => {
                if (!isNavigable) return
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    router.push(detailHref)
                }
            }}
            onMouseMove={event => {
                const card = event.currentTarget
                const rect = card.getBoundingClientRect()
                const x = event.clientX - rect.left
                const y = event.clientY - rect.top
                const rx = ((y / rect.height) - 0.5) * -6
                const ry = ((x / rect.width) - 0.5) * 8
                card.style.setProperty('--rx', `${rx}deg`)
                card.style.setProperty('--ry', `${ry}deg`)
                card.style.setProperty('--mx', `${(x / rect.width) * 100}%`)
                card.style.setProperty('--my', `${(y / rect.height) * 100}%`)
            }}
            onMouseLeave={event => {
                const card = event.currentTarget
                card.style.setProperty('--rx', '0deg')
                card.style.setProperty('--ry', '0deg')
                card.style.setProperty('--mx', '50%')
                card.style.setProperty('--my', '50%')
            }}
        >
            <div className="card-gradient" />

            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Image Section */}
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: 220,
                        overflow: 'hidden',
                        background: 'rgba(0, 0, 0, 0.4)'
                    }}
                    className="project-image-wrapper"
                >
                    {hasImage ? (
                        <Image
                            src={project.image_url as string}
                            alt={`${project.title} preview`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="project-image"
                        />
                    ) : (
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'grid',
                                placeItems: 'center',
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 10,
                                letterSpacing: 2,
                                color: 'var(--dim)',
                                background: 'rgba(0, 0, 0, 0.25)',
                                textTransform: 'uppercase'
                            }}
                        >
                            No Preview
                        </div>
                    )}
                    {/* Image overlay gradient */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)',
                            zIndex: 1
                        }}
                    />
                    {/* Status badge on image */}
                    <span
                        className="tag-pill project-status"
                        style={{
                            position: 'absolute',
                            top: 14,
                            right: 14,
                            zIndex: 2,
                            fontSize: 8,
                            padding: '4px 10px'
                        }}
                    >
                        {statusLabel}
                    </span>
                </div>

                {/* Text Content */}
                <div
                    style={{
                        padding: 24,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 14,
                        flex: 1
                    }}
                >
                    {/* Title */}
                    <div>
                        <h3
                            style={{
                                fontSize: 20,
                                fontWeight: 700,
                                marginBottom: 6,
                                color: 'var(--white)',
                                lineHeight: 1.3
                            }}
                        >
                            {project.title}
                        </h3>
                        <p
                            style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 11,
                                color: 'var(--dim)',
                                letterSpacing: 0.3,
                                lineHeight: 1.6,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}
                        >
                            {safeSubtitle}
                        </p>
                    </div>

                    {/* Tags */}
                    {safeTags.length > 0 && (
                        <div
                            style={{
                                display: 'flex',
                                gap: 6,
                                flexWrap: 'wrap'
                            }}
                        >
                            {safeTags.slice(0, 4).map(tag => (
                                <span
                                    key={tag.id}
                                    className="tag-pill project-tag"
                                    style={{
                                        fontSize: 9,
                                        padding: '4px 10px',
                                        background: 'rgba(204, 17, 17, 0.07)',
                                        border: '1px solid rgba(204, 17, 17, 0.2)',
                                        borderRadius: 6,
                                        color: 'rgba(255, 50, 50, 0.7)'
                                    }}
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    )}

                    <div style={{ flex: 1 }} />

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: 10 }}>
                        <motion.a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                            style={{
                                flex: 1,
                                padding: '11px 14px',
                                background: 'rgba(204, 17, 17, 0.1)',
                                border: '1px solid rgba(204, 17, 17, 0.3)',
                                borderRadius: 8,
                                color: 'var(--red2)',
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 10,
                                fontWeight: 600,
                                letterSpacing: 1,
                                textDecoration: 'none',
                                textAlign: 'center',
                                textTransform: 'uppercase',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(204, 17, 17, 0.2)'
                                e.currentTarget.style.borderColor = 'rgba(204, 17, 17, 0.6)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(204, 17, 17, 0.1)'
                                e.currentTarget.style.borderColor = 'rgba(204, 17, 17, 0.3)'
                            }}
                            onClick={event => event.stopPropagation()}
                        >
                            GitHub
                        </motion.a>

                        {liveUrl !== '#' && (
                            <motion.a
                                href={liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.96 }}
                                style={{
                                    flex: 1,
                                    padding: '11px 14px',
                                    background: 'var(--red)',
                                    border: '1px solid var(--red)',
                                    borderRadius: 8,
                                    color: 'var(--white)',
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: 10,
                                    fontWeight: 600,
                                    letterSpacing: 1,
                                    textDecoration: 'none',
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'transparent'
                                    e.currentTarget.style.color = 'var(--red)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'var(--red)'
                                    e.currentTarget.style.color = 'var(--white)'
                                }}
                                onClick={event => event.stopPropagation()}
                            >
                                Live
                            </motion.a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
