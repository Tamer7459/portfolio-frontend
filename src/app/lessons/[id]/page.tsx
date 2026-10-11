import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { lessons } from '@/lib/data'
import LessonContent from '@/components/LessonContent'

export function generateStaticParams() {
    return lessons.map(lesson => ({ id: String(lesson.id) }))
}

export default async function LessonDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const lessonId = parseInt(id)
    const lesson = lessons.find(l => l.id === lessonId) || null

    if (!lesson) {
        notFound()
    }

    const currentIndex = lessons.findIndex(l => l.id === lessonId)
    const nextLesson = lessons[(currentIndex + 1) % lessons.length]
    const prevLesson =
        currentIndex > 0
            ? lessons[currentIndex - 1]
            : lessons[lessons.length - 1]

    return (
        <main
            style={{
                background: 'var(--black)',
                color: 'var(--white)',
                minHeight: '100vh'
            }}
        >
            <div
                style={{
                    maxWidth: '860px',
                    margin: '0 auto',
                    padding: '60px 32px 120px 32px'
                }}
            >
                <div style={{ display: 'flex', gap: 12, marginBottom: 60 }}>
                    <Link
                        href="/lessons"
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
                            background: 'rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        ← Lessons
                    </Link>
                    <Link
                        href="/"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            color: '#888',
                            textDecoration: 'none',
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 12,
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            padding: '10px 16px',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            borderRadius: 8
                        }}
                    >
                        Home
                    </Link>
                </div>

                <div className="sec-tag">Lesson {String(lesson.id).padStart(2, '0')}</div>
                <h1
                    style={{
                        fontSize: 'clamp(30px, 5vw, 52px)',
                        fontWeight: 900,
                        lineHeight: 1.1,
                        letterSpacing: -1.5,
                        color: 'var(--white)',
                        marginBottom: 20
                    }}
                >
                    {lesson.title}
                </h1>

                <div
                    style={{
                        display: 'flex',
                        gap: 16,
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        marginBottom: 20,
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 11,
                        letterSpacing: 1.5,
                        color: '#666'
                    }}
                >
                    <span style={{ color: 'var(--red2)' }}>{lesson.read_time} MIN READ</span>
                    <span>{lesson.created_at}</span>
                </div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
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

                {lesson.cover_url && (
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: 380,
                            borderRadius: 16,
                            overflow: 'hidden',
                            border: '1px solid rgba(204, 17, 17, 0.2)',
                            background: '#0a0a0a',
                            marginBottom: 60
                        }}
                    >
                        <Image
                            src={lesson.cover_url}
                            alt={lesson.title}
                            fill
                            sizes="(max-width: 860px) 100vw, 860px"
                            style={{ objectFit: 'contain' }}
                            priority
                            unoptimized={lesson.cover_url.startsWith('http')}
                        />
                    </div>
                )}

                <LessonContent blocks={lesson.content} />

                {lessons.length > 1 && (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 24,
                            marginTop: 100,
                            paddingTop: 60,
                            borderTop: '1px solid rgba(204, 17, 17, 0.15)'
                        }}
                    >
                        {prevLesson && (
                            <Link
                                href={`/lessons/${prevLesson.id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <div
                                    style={{
                                        padding: 24,
                                        background: 'rgba(20, 20, 20, 0.5)',
                                        border: '1px solid rgba(204, 17, 17, 0.15)',
                                        borderRadius: 12,
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
                                        ← Previous Lesson
                                    </p>
                                    <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--white)' }}>
                                        {prevLesson.title}
                                    </p>
                                </div>
                            </Link>
                        )}

                        {nextLesson && (
                            <Link
                                href={`/lessons/${nextLesson.id}`}
                                style={{ textDecoration: 'none', textAlign: 'right' }}
                            >
                                <div
                                    style={{
                                        padding: 24,
                                        background: 'rgba(20, 20, 20, 0.5)',
                                        border: '1px solid rgba(204, 17, 17, 0.15)',
                                        borderRadius: 12,
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
                                        Next Lesson →
                                    </p>
                                    <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--white)' }}>
                                        {nextLesson.title}
                                    </p>
                                </div>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </main>
    )
}
