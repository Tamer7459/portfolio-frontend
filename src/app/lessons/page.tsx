import Image from 'next/image'
import Link from 'next/link'
import { lessons } from '@/lib/data'

export const metadata = {
    title: 'Lessons | Bali Abdelkouddous',
    description: 'Programming lessons: web, mobile, and desktop — learn by building.'
}

export default function LessonsPage() {
    return (
        <main
            style={{
                background: 'var(--black)',
                color: 'var(--white)',
                minHeight: '100vh',
                padding: '60px 68px 120px 68px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}
        >
            <Link
                href="/"
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
                    background: 'rgba(0, 0, 0, 0.5)',
                    marginBottom: 60
                }}
            >
                ← Home
            </Link>

            <div className="sec-tag">004 - Lessons</div>
            <h1
                style={{
                    fontSize: 'clamp(34px, 5vw, 62px)',
                    fontWeight: 900,
                    lineHeight: 1.05,
                    letterSpacing: -2,
                    color: 'var(--white)',
                    marginBottom: 16
                }}
            >
                Learn by Building
            </h1>
            <p
                style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 13,
                    color: '#888',
                    maxWidth: '600px',
                    lineHeight: 1.8,
                    marginBottom: 16
                }}
            >
                Practical programming lessons across web, mobile, and desktop —
                with images and code exactly where they belong.
            </p>
            <p
                style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    letterSpacing: 2,
                    color: 'var(--dim)',
                    marginBottom: 60
                }}
            >
                {String(lessons.length).padStart(2, '0')} Lessons
            </p>

            {lessons.length > 0 ? (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                        gap: 28,
                        width: '100%'
                    }}
                >
                    {lessons.map(lesson => (
                        <Link
                            key={lesson.id}
                            href={`/lessons/${lesson.id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <article
                                style={{
                                    borderRadius: 16,
                                    overflow: 'hidden',
                                    border: '1px solid rgba(204, 17, 17, 0.2)',
                                    background: 'rgba(20, 20, 20, 0.6)',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'border-color 0.3s, transform 0.3s'
                                }}
                            >
                                {lesson.cover_url && (
                                    <div
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            height: 220,
                                            overflow: 'hidden',
                                            background: '#0a0a0a'
                                        }}
                                    >
                                        <Image
                                            src={lesson.cover_url}
                                            alt={lesson.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            style={{ objectFit: 'contain', objectPosition: 'center top' }}
                                            unoptimized={lesson.cover_url.startsWith('http')}
                                        />
                                    </div>
                                )}
                                <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                        <span
                                            style={{
                                                fontFamily: "'DM Mono', monospace",
                                                fontSize: 10,
                                                letterSpacing: 1.5,
                                                color: 'var(--red2)'
                                            }}
                                        >
                                            {lesson.read_time} MIN READ
                                        </span>
                                        <span
                                            style={{
                                                fontFamily: "'DM Mono', monospace",
                                                fontSize: 10,
                                                letterSpacing: 1.5,
                                                color: '#666'
                                            }}
                                        >
                                            {lesson.created_at}
                                        </span>
                                    </div>
                                    <h2
                                        style={{
                                            fontSize: 22,
                                            fontWeight: 800,
                                            color: 'var(--white)',
                                            letterSpacing: -0.5,
                                            margin: 0,
                                            lineHeight: 1.3
                                        }}
                                    >
                                        {lesson.title}
                                    </h2>
                                    <p
                                        style={{
                                            fontFamily: "'DM Mono', monospace",
                                            fontSize: 12,
                                            color: '#888',
                                            lineHeight: 1.8,
                                            margin: 0,
                                            flex: 1
                                        }}
                                    >
                                        {lesson.excerpt}
                                    </p>
                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                        {lesson.tags.map(tag => (
                                            <span
                                                key={tag.id}
                                                style={{
                                                    padding: '4px 12px',
                                                    background: 'rgba(204,17,17,0.1)',
                                                    border: '1px solid rgba(204,17,17,0.25)',
                                                    borderRadius: 6,
                                                    fontFamily: "'DM Mono', monospace",
                                                    fontSize: 10,
                                                    color: 'var(--red2)'
                                                }}
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            ) : (
                <div
                    style={{
                        border: '1px dashed rgba(204, 17, 17, 0.35)',
                        borderRadius: 12,
                        padding: '36px 24px',
                        textAlign: 'center',
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 12,
                        letterSpacing: 1,
                        color: 'rgba(204, 17, 17, 0.7)'
                    }}
                >
                    // New lessons incoming
                </div>
            )}
        </main>
    )
}
