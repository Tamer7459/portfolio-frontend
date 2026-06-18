'use client'
import { use, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/lib/data'

const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.8, staggerChildren: 0.12 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
}

export default function ProjectDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params)
    const projectId = parseInt(id)

    const { project, allProjects } = useMemo(() => {
        const found = projects.find(p => p.id === projectId) || null
        return { project: found, allProjects: projects }
    }, [projectId])

    if (!project) {
        return (
            <div
                style={{
                    minHeight: '100vh',
                    display: 'grid',
                    placeItems: 'center',
                    background: 'var(--black)',
                    textAlign: 'center'
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 style={{ color: 'var(--red)', marginBottom: 20, fontSize: 'clamp(28px, 5vw, 48px)' }}>
                        Project Not Found
                    </h1>
                    <p style={{ color: '#666', marginBottom: 24, fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
                        The project you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                    <Link
                        href="/#work"
                        className="btn-red"
                    >
                        ← Back to Projects
                    </Link>
                </motion.div>
            </div>
        )
    }

    const safeTags = Array.isArray(project.tags) ? project.tags : []
    const [selectedMedia, setSelectedMedia] = useState(0)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const statusLabel = (project.status || 'unknown').toUpperCase()
    const currentIndex = allProjects.findIndex(p => p.id === projectId)
    const nextProject = allProjects[(currentIndex + 1) % allProjects.length]
    const prevProject =
        currentIndex > 0
            ? allProjects[currentIndex - 1]
            : allProjects[allProjects.length - 1]
    const description = project.description || project.subtitle || 'A premium project showcasing modern development practices and cutting-edge technologies.'

    return (
        <motion.main
            initial="hidden"
            animate="visible"
            variants={pageVariants}
            className="project-detail"
            style={{
                background: 'var(--black)',
                color: 'var(--white)',
                minHeight: '100vh'
            }}
        >
            {/* Hero Section */}
            <section
                className="project-detail-hero"
                style={{
                    position: 'relative',
                    height: '70vh',
                    minHeight: 500,
                    overflow: 'hidden'
                }}
            >
                {project.image_url && (
                    <>
                        <motion.div
                            initial={{ scale: 1.15, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                zIndex: 0
                            }}
                        >
                            <Image
                                src={project.image_url}
                                alt={project.title}
                                fill
                                sizes="100vw"
                                className="project-detail-hero-img"
                                priority
                                loading="eager"
                            />
                        </motion.div>
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background:
                                    'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.85) 70%, var(--black) 100%)',
                                zIndex: 1
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background:
                                    'radial-gradient(600px circle at 50% 60%, rgba(204,17,17,0.12), transparent 60%)',
                                zIndex: 1
                            }}
                        />
                    </>
                )}

                {/* Content */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        position: 'relative',
                        zIndex: 2,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '60px 68px'
                    }}
                >
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            <span
                                className="tag-pill project-status"
                                style={{ fontSize: 10 }}
                            >
                                {statusLabel}
                            </span>
                            {safeTags.slice(0, 3).map(tag => (
                                <span
                                    key={tag.id}
                                    style={{
                                        padding: '4px 12px',
                                        background: 'rgba(204,17,17,0.15)',
                                        border: '1px solid rgba(204,17,17,0.3)',
                                        borderRadius: 6,
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: 9,
                                        letterSpacing: 1,
                                        color: 'var(--red2)',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            style={{
                                fontSize: 'clamp(36px, 8vw, 72px)',
                                fontWeight: 900,
                                lineHeight: 1.05,
                                marginBottom: 16,
                                letterSpacing: -2
                            }}
                        >
                            {project.title}
                        </motion.h1>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            style={{
                                fontFamily: "'DM Mono', monospace",
                                fontSize: 15,
                                color: 'rgba(255, 255, 255, 0.65)',
                                maxWidth: '600px',
                                letterSpacing: 0.3,
                                lineHeight: 1.6
                            }}
                        >
                            {project.subtitle}
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* Back Button */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 32,
                        left: 68,
                        zIndex: 5
                    }}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                >
                    <Link
                        href="/#work"
                        className="project-back-btn"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            color: 'var(--red2)',
                            textDecoration: 'none',
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 12,
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            padding: '10px 16px',
                            border: '1px solid rgba(204, 17, 17, 0.3)',
                            borderRadius: 8,
                            transition: 'all 0.3s',
                            background: 'rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(12px)'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = 'rgba(204, 17, 17, 0.8)'
                            e.currentTarget.style.background = 'rgba(204, 17, 17, 0.15)'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'rgba(204, 17, 17, 0.3)'
                            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        ← Back
                    </Link>
                </motion.div>
            </section>

            {/* Content Section */}
            <section
                className="project-detail-body"
                style={{
                    padding: '100px 68px',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}
            >
                <div
                    className="project-detail-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr',
                        gap: 80,
                        marginBottom: 100
                    }}
                >
                    {/* Main Content */}
                    <motion.div variants={itemVariants}>
                        {/* Description */}
                        <motion.div
                            style={{ marginBottom: 80 }}
                            variants={itemVariants}
                        >
                            <h2
                                style={{
                                    fontSize: 28,
                                    fontWeight: 800,
                                    marginBottom: 24,
                                    color: 'var(--white)',
                                    letterSpacing: -0.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12
                                }}
                            >
                                <span style={{ width: 3, height: 28, background: 'var(--red)', borderRadius: 2, display: 'block' }} />
                                About This Project
                            </h2>
                            <p
                                style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: 14,
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    lineHeight: 1.9,
                                    letterSpacing: 0.3
                                }}
                            >
                                {description}
                            </p>
                        </motion.div>

                        {/* Media Gallery */}
                        {project.media && project.media.length > 0 && (
                            <motion.div
                                style={{ marginBottom: 80 }}
                                variants={itemVariants}
                            >
                                <h2
                                    style={{
                                        fontSize: 28,
                                        fontWeight: 800,
                                        marginBottom: 24,
                                        color: 'var(--white)',
                                        letterSpacing: -0.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 12
                                    }}
                                >
                                    <span style={{ width: 3, height: 28, background: 'var(--red)', borderRadius: 2, display: 'block' }} />
                                    Gallery
                                </h2>

                                {/* Main Media Display */}
                                <motion.div
                                    key={selectedMedia}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: 400,
                                        borderRadius: 12,
                                        overflow: 'hidden',
                                        border: '1px solid rgba(204, 17, 17, 0.2)',
                                        marginBottom: 16,
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => setLightboxOpen(true)}
                                >
                                    {project.media[selectedMedia].type === 'video' ? (
                                        <video
                                            src={project.media[selectedMedia].url}
                                            controls
                                            style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
                                        />
                                    ) : (
                                        <Image
                                            src={project.media[selectedMedia].url}
                                            alt={`${project.title} screenshot ${selectedMedia + 1}`}
                                            fill
                                            sizes="(max-width: 1200px) 100vw, 800px"
                                            style={{ objectFit: 'contain', background: '#111' }}
                                        />
                                    )}
                                </motion.div>

                                {/* Thumbnails */}
                                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                    {project.media.map((item, idx) => (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ scale: 1.05, borderColor: 'var(--red)' }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedMedia(idx)}
                                            style={{
                                                width: 80,
                                                height: 60,
                                                borderRadius: 8,
                                                overflow: 'hidden',
                                                border: selectedMedia === idx
                                                    ? '2px solid var(--red)'
                                                    : '2px solid rgba(204, 17, 17, 0.2)',
                                                cursor: 'pointer',
                                                padding: 0,
                                                background: '#111',
                                                position: 'relative',
                                                transition: 'border-color 0.2s'
                                            }}
                                        >
                                            {item.type === 'video' ? (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: 20,
                                                        color: 'var(--red)'
                                                    }}
                                                >
                                                    ▶
                                                </div>
                                            ) : (
                                                <Image
                                                    src={item.url}
                                                    alt={`${project.title} thumbnail ${idx + 1}`}
                                                    fill
                                                    sizes="80px"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Lightbox */}
                        {lightboxOpen && project.media && project.media[selectedMedia] && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                    position: 'fixed',
                                    inset: 0,
                                    zIndex: 9999,
                                    background: 'rgba(0,0,0,0.95)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setLightboxOpen(false)}
                            >
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '90vw',
                                        height: '90vh'
                                    }}
                                    onClick={e => e.stopPropagation()}
                                >
                                    {project.media[selectedMedia].type === 'video' ? (
                                        <video
                                            src={project.media[selectedMedia].url}
                                            controls
                                            autoPlay
                                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                        />
                                    ) : (
                                        <Image
                                            src={project.media[selectedMedia].url}
                                            alt={`${project.title} full size`}
                                            fill
                                            sizes="90vw"
                                            style={{ objectFit: 'contain' }}
                                        />
                                    )}
                                </div>
                                <button
                                    onClick={() => setLightboxOpen(false)}
                                    style={{
                                        position: 'absolute',
                                        top: 24,
                                        right: 24,
                                        background: 'rgba(204,17,17,0.8)',
                                        border: 'none',
                                        color: '#fff',
                                        width: 40,
                                        height: 40,
                                        borderRadius: '50%',
                                        fontSize: 20,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    ✕
                                </button>
                                {/* Navigation arrows */}
                                {project.media.length > 1 && (
                                    <>
                                        <button
                                            onClick={e => {
                                                e.stopPropagation()
                                                setSelectedMedia(prev => (prev - 1 + project.media.length) % project.media.length)
                                            }}
                                            style={{
                                                position: 'absolute',
                                                left: 24,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: 'rgba(204,17,17,0.8)',
                                                border: 'none',
                                                color: '#fff',
                                                width: 44,
                                                height: 44,
                                                borderRadius: '50%',
                                                fontSize: 18,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            ←
                                        </button>
                                        <button
                                            onClick={e => {
                                                e.stopPropagation()
                                                setSelectedMedia(prev => (prev + 1) % project.media.length)
                                            }}
                                            style={{
                                                position: 'absolute',
                                                right: 24,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: 'rgba(204,17,17,0.8)',
                                                border: 'none',
                                                color: '#fff',
                                                width: 44,
                                                height: 44,
                                                borderRadius: '50%',
                                                fontSize: 18,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            →
                                        </button>
                                    </>
                                )}
                            </motion.div>
                        )}

                        {/* Technologies */}
                        <motion.div
                            style={{ marginBottom: 80 }}
                            variants={itemVariants}
                        >
                            <h3
                                style={{
                                    fontSize: 18,
                                    fontWeight: 700,
                                    marginBottom: 24,
                                    color: 'var(--white)',
                                    textTransform: 'uppercase',
                                    letterSpacing: 2,
                                    fontFamily: "'DM Mono', monospace",
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12
                                }}
                            >
                                <span style={{ width: 3, height: 22, background: 'var(--red)', borderRadius: 2, display: 'block' }} />
                                Technologies Used
                            </h3>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: 10,
                                    flexWrap: 'wrap'
                                }}
                            >
                                {safeTags.map((tag, idx) => (
                                    <motion.span
                                        key={tag.id}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.05 * idx, type: 'spring', stiffness: 200 }}
                                        whileHover={{
                                            scale: 1.08,
                                            background: 'rgba(204, 17, 17, 0.25)',
                                            borderColor: 'rgba(204, 17, 17, 0.6)'
                                        }}
                                        style={{
                                            padding: '10px 22px',
                                            background: 'rgba(204, 17, 17, 0.1)',
                                            border: '1px solid rgba(204, 17, 17, 0.3)',
                                            borderRadius: 8,
                                            color: 'var(--red2)',
                                            fontFamily: "'DM Mono', monospace",
                                            fontSize: 12,
                                            fontWeight: 600,
                                            letterSpacing: 0.5,
                                            textTransform: 'uppercase',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        {tag.name}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Key Features */}
                        <motion.div
                            style={{ marginBottom: 80 }}
                            variants={itemVariants}
                        >
                            <h3
                                style={{
                                    fontSize: 18,
                                    fontWeight: 700,
                                    marginBottom: 24,
                                    color: 'var(--white)',
                                    textTransform: 'uppercase',
                                    letterSpacing: 2,
                                    fontFamily: "'DM Mono', monospace",
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12
                                }}
                            >
                                <span style={{ width: 3, height: 22, background: 'var(--red)', borderRadius: 2, display: 'block' }} />
                                Key Features
                            </h3>
                            <div
                                style={{
                                    display: 'grid',
                                    gap: 10
                                }}
                            >
                                {[
                                    'Modern & Responsive Design',
                                    'High Performance Optimization',
                                    'Seamless User Experience',
                                    'Advanced Functionality',
                                    'Cross-browser Compatible',
                                    'Production Ready'
                                ].map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.06 * idx, type: 'spring', stiffness: 150 }}
                                        whileHover={{ x: 6, background: 'rgba(204,17,17,0.1)' }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 14,
                                            padding: '14px 18px',
                                            background: 'rgba(204, 17, 17, 0.04)',
                                            border: '1px solid rgba(204, 17, 17, 0.12)',
                                            borderRadius: 10,
                                            fontFamily: "'DM Mono', monospace",
                                            fontSize: 13,
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            letterSpacing: 0.3,
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        <span
                                            style={{
                                                width: 6,
                                                height: 6,
                                                borderRadius: '50%',
                                                background: 'var(--red)',
                                                flexShrink: 0,
                                                boxShadow: '0 0 8px var(--red)'
                                            }}
                                        />
                                        {feature}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        variants={itemVariants}
                        style={{
                            position: 'sticky',
                            top: 100,
                            height: 'fit-content'
                        }}
                    >
                        {/* Image Preview Card */}
                        {project.image_url && (
                            <motion.div
                                className="project-detail-card"
                                style={{
                                    borderRadius: 16,
                                    overflow: 'hidden',
                                    marginBottom: 32,
                                    border: '1px solid rgba(204, 17, 17, 0.2)',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
                                }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                            >
                                <div style={{ position: 'relative', width: '100%', height: 220 }}>
                                    <Image
                                        src={project.image_url}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 1200px) 50vw, 33vw"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)'
                                        }}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Links Card */}
                        <motion.div
                            className="project-detail-card"
                            style={{
                                background: 'rgba(20, 20, 20, 0.8)',
                                border: '1px solid rgba(204, 17, 17, 0.2)',
                                borderRadius: 16,
                                padding: 32,
                                backdropFilter: 'blur(12px)',
                                marginBottom: 32
                            }}
                            variants={itemVariants}
                            whileHover={{ borderColor: 'rgba(204, 17, 17, 0.4)' }}
                        >
                            <h4
                                style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: 12,
                                    letterSpacing: 2,
                                    textTransform: 'uppercase',
                                    color: 'rgba(204, 17, 17, 0.8)',
                                    marginBottom: 20
                                }}
                            >
                                Visit Project
                            </h4>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 12
                                }}
                            >
                                <motion.a
                                    href={project.github_url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        padding: '14px 20px',
                                        background: 'rgba(204, 17, 17, 0.12)',
                                        border: '1px solid rgba(204, 17, 17, 0.35)',
                                        borderRadius: 10,
                                        color: 'var(--red2)',
                                        textDecoration: 'none',
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: 12,
                                        fontWeight: 700,
                                        letterSpacing: 1.2,
                                        textAlign: 'center',
                                        textTransform: 'uppercase',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = 'rgba(204, 17, 17, 0.25)'
                                        e.currentTarget.style.borderColor = 'rgba(204, 17, 17, 0.7)'
                                        e.currentTarget.style.boxShadow = '0 0 25px rgba(204, 17, 17, 0.25)'
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = 'rgba(204, 17, 17, 0.12)'
                                        e.currentTarget.style.borderColor = 'rgba(204, 17, 17, 0.35)'
                                        e.currentTarget.style.boxShadow = 'none'
                                    }}
                                >
                                    View on GitHub
                                </motion.a>

                                {project.live_url && (
                                    <motion.a
                                        href={project.live_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02, x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                        style={{
                                            padding: '14px 20px',
                                            background: 'linear-gradient(135deg, var(--red) 0%, rgba(204, 17, 17, 0.8) 100%)',
                                            border: '1px solid var(--red)',
                                            borderRadius: 10,
                                            color: 'var(--white)',
                                            textDecoration: 'none',
                                            fontFamily: "'DM Mono', monospace",
                                            fontSize: 12,
                                            fontWeight: 700,
                                            letterSpacing: 1.2,
                                            textAlign: 'center',
                                            textTransform: 'uppercase',
                                            transition: 'all 0.3s'
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.background = 'transparent'
                                            e.currentTarget.style.color = 'var(--red)'
                                            e.currentTarget.style.boxShadow = '0 0 35px rgba(204, 17, 17, 0.4)'
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.background = 'linear-gradient(135deg, var(--red) 0%, rgba(204, 17, 17, 0.8) 100%)'
                                            e.currentTarget.style.color = 'var(--white)'
                                            e.currentTarget.style.boxShadow = 'none'
                                        }}
                                    >
                                        Live Preview
                                    </motion.a>
                                )}
                            </div>
                        </motion.div>

                        {/* Project Info */}
                        <motion.div
                            className="project-detail-card"
                            style={{
                                background: 'rgba(20, 20, 20, 0.8)',
                                border: '1px solid rgba(204, 17, 17, 0.2)',
                                borderRadius: 16,
                                padding: 32,
                                backdropFilter: 'blur(12px)'
                            }}
                            variants={itemVariants}
                        >
                            <h4
                                style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: 12,
                                    letterSpacing: 2,
                                    textTransform: 'uppercase',
                                    color: 'rgba(204, 17, 17, 0.8)',
                                    marginBottom: 20
                                }}
                            >
                                Project Info
                            </h4>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 16
                                }}
                            >
                                <div>
                                    <p
                                        style={{
                                            fontFamily: "'DM Mono', monospace",
                                            fontSize: 10,
                                            letterSpacing: 2,
                                            color: 'rgba(204, 17, 17, 0.7)',
                                            textTransform: 'uppercase',
                                            marginBottom: 6
                                        }}
                                    >
                                        Status
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 14,
                                            color: 'var(--white)',
                                            fontWeight: 500
                                        }}
                                    >
                                        <span
                                            style={{
                                                display: 'inline-block',
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                background: project.status === 'completed' ? '#4caf50' : project.status === 'in-progress' ? '#ff9800' : 'var(--red)',
                                                marginRight: 8
                                            }}
                                        />
                                        {statusLabel}
                                    </p>
                                </div>

                                <div>
                                    <p
                                        style={{
                                            fontFamily: "'DM Mono', monospace",
                                            fontSize: 10,
                                            letterSpacing: 2,
                                            color: 'rgba(204, 17, 17, 0.7)',
                                            textTransform: 'uppercase',
                                            marginBottom: 6
                                        }}
                                    >
                                        Technologies
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 13,
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            lineHeight: 1.7
                                        }}
                                    >
                                        {safeTags.length > 0
                                            ? safeTags.map(t => t.name).join(', ')
                                            : 'Multiple technologies'}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Navigation */}
                <motion.div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 32,
                        marginTop: 100,
                        paddingTop: 80,
                        borderTop: '1px solid rgba(204, 17, 17, 0.15)'
                    }}
                    variants={itemVariants}
                >
                    {prevProject && (
                        <Link href={`/project/${prevProject.id}`} style={{ textDecoration: 'none' }}>
                            <motion.div
                                className="project-detail-nav-card"
                                whileHover={{ x: -6, background: 'rgba(20, 20, 20, 0.9)', borderColor: 'rgba(204, 17, 17, 0.5)' }}
                                style={{
                                    padding: 24,
                                    background: 'rgba(20, 20, 20, 0.5)',
                                    border: '1px solid rgba(204, 17, 17, 0.15)',
                                    borderRadius: 12,
                                    transition: 'all 0.35s',
                                    color: 'inherit'
                                }}
                            >
                                <p
                                    style={{
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: 11,
                                        color: 'rgba(204, 17, 17, 0.7)',
                                        marginBottom: 8
                                    }}
                                >
                                    ← Previous Project
                                </p>
                                <p
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: 'var(--white)'
                                    }}
                                >
                                    {prevProject.title}
                                </p>
                            </motion.div>
                        </Link>
                    )}

                    {nextProject && (
                        <Link href={`/project/${nextProject.id}`} style={{ textDecoration: 'none', textAlign: 'right' }}>
                            <motion.div
                                className="project-detail-nav-card"
                                whileHover={{ x: 6, background: 'rgba(20, 20, 20, 0.9)', borderColor: 'rgba(204, 17, 17, 0.5)' }}
                                style={{
                                    padding: 24,
                                    background: 'rgba(20, 20, 20, 0.5)',
                                    border: '1px solid rgba(204, 17, 17, 0.15)',
                                    borderRadius: 12,
                                    transition: 'all 0.35s',
                                    color: 'inherit'
                                }}
                            >
                                <p
                                    style={{
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: 11,
                                        color: 'rgba(204, 17, 17, 0.7)',
                                        marginBottom: 8
                                    }}
                                >
                                    Next Project →
                                </p>
                                <p
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: 'var(--white)'
                                    }}
                                >
                                    {nextProject.title}
                                </p>
                            </motion.div>
                        </Link>
                    )}
                </motion.div>
            </section>
        </motion.main>
    )
}
