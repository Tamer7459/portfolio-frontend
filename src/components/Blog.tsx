'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import type { BlogPost } from '@/lib/api'

export default function Blog({ posts }: { posts: BlogPost[] }) {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    if (!posts.length) return null

    return (
        <section id="blog" ref={ref} style={{ padding: '120px 68px' }}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                style={{ marginBottom: 66 }}
            >
                <div className="sec-tag">Journal</div>
                <h2
                    style={{
                        fontSize: 'clamp(28px, 3.5vw, 48px)',
                        fontWeight: 900,
                        lineHeight: 1.05,
                        letterSpacing: -1.5,
                        color: 'var(--white)'
                    }}
                >
                    Latest{' '}
                    <em style={{ color: 'var(--red)', fontStyle: 'normal' }}>
                        Writings
                    </em>
                </h2>
            </motion.div>

            {/* Cards grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: 2
                }}
            >
                {posts.map((post, i) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                    >
                        <Link
                            href={`/blog/${post.slug}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <article
                                style={{
                                    padding: '32px 28px',
                                    border: '1px solid var(--line)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'border-color 0.3s',
                                    cursor: 'none'
                                }}
                                onMouseEnter={e => {
                                    ;(
                                        e.currentTarget as HTMLElement
                                    ).style.borderColor = 'rgba(204,17,17,0.25)'
                                }}
                                onMouseLeave={e => {
                                    ;(
                                        e.currentTarget as HTMLElement
                                    ).style.borderColor = 'var(--line)'
                                }}
                            >
                                {/* Meta row */}
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: 20
                                    }}
                                >
                                    <span
                                        style={{
                                            fontFamily: "'DM Mono', monospace",
                                            fontSize: 9,
                                            letterSpacing: 2,
                                            color: 'var(--red)',
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        {new Date(
                                            post.created_at
                                        ).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: "'DM Mono', monospace",
                                            fontSize: 9,
                                            letterSpacing: 1,
                                            color: 'var(--dim)'
                                        }}
                                    >
                                        {post.read_time} MIN READ
                                    </span>
                                </div>

                                {/* Title */}
                                <h3
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 700,
                                        color: 'var(--white)',
                                        marginBottom: 12,
                                        lineHeight: 1.2,
                                        letterSpacing: -0.5
                                    }}
                                >
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                <p
                                    style={{
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: 11,
                                        lineHeight: 1.7,
                                        color: '#444',
                                        marginBottom: 24
                                    }}
                                >
                                    {post.excerpt}
                                </p>

                                {/* Tags */}
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: 6,
                                        flexWrap: 'wrap',
                                        marginBottom: 24
                                    }}
                                >
                                    {post.tags.map(tag => (
                                        <span key={tag.id} className="tag-pill">
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div
                                    style={{
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: 10,
                                        letterSpacing: 2,
                                        color: 'var(--red)',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    Read Article →
                                </div>
                            </article>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
