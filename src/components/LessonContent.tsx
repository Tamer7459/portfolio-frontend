import Image from 'next/image'
import type { LessonBlock } from '@/lib/api'

export default function LessonContent({ blocks }: { blocks: LessonBlock[] }) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 28
            }}
        >
            {blocks.map((block, i) => {
                switch (block.type) {
                    case 'heading':
                        return (
                            <h2
                                key={i}
                                style={{
                                    fontSize: 'clamp(20px, 3vw, 28px)',
                                    fontWeight: 800,
                                    color: 'var(--white)',
                                    letterSpacing: -0.5,
                                    margin: '12px 0 0 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12
                                }}
                            >
                                <span
                                    style={{
                                        width: 3,
                                        height: 26,
                                        background: 'var(--red)',
                                        borderRadius: 2,
                                        display: 'block',
                                        flexShrink: 0
                                    }}
                                />
                                {block.text}
                            </h2>
                        )
                    case 'paragraph':
                        return (
                            <p
                                key={i}
                                style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: 14,
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    lineHeight: 1.9,
                                    letterSpacing: 0.3,
                                    margin: 0
                                }}
                            >
                                {block.text}
                            </p>
                        )
                    case 'image': {
                        const isRemote = block.url.startsWith('http')
                        return (
                            <figure key={i} style={{ margin: 0 }}>
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: 420,
                                        borderRadius: 12,
                                        overflow: 'hidden',
                                        border: '1px solid rgba(204, 17, 17, 0.2)',
                                        background: '#0a0a0a'
                                    }}
                                >
                                    <Image
                                        src={block.url}
                                        alt={block.alt || 'Lesson image'}
                                        fill
                                        sizes="(max-width: 1200px) 100vw, 800px"
                                        style={{ objectFit: 'contain' }}
                                        unoptimized={isRemote}
                                    />
                                </div>
                                {block.caption && (
                                    <figcaption
                                        style={{
                                            fontFamily: "'DM Mono', monospace",
                                            fontSize: 11,
                                            letterSpacing: 1,
                                            color: '#666',
                                            textAlign: 'center',
                                            marginTop: 10
                                        }}
                                    >
                                        {block.caption}
                                    </figcaption>
                                )}
                            </figure>
                        )
                    }
                    case 'video':
                        return (
                            <figure key={i} style={{ margin: 0 }}>
                                <video
                                    src={block.url}
                                    controls
                                    style={{
                                        width: '100%',
                                        borderRadius: 12,
                                        border: '1px solid rgba(204, 17, 17, 0.2)',
                                        background: '#000'
                                    }}
                                />
                                {block.caption && (
                                    <figcaption
                                        style={{
                                            fontFamily: "'DM Mono', monospace",
                                            fontSize: 11,
                                            letterSpacing: 1,
                                            color: '#666',
                                            textAlign: 'center',
                                            marginTop: 10
                                        }}
                                    >
                                        {block.caption}
                                    </figcaption>
                                )}
                            </figure>
                        )
                    case 'code':
                        return (
                            <div
                                key={i}
                                style={{
                                    borderRadius: 12,
                                    overflow: 'hidden',
                                    border: '1px solid rgba(204, 17, 17, 0.2)',
                                    background: '#0d0d0d'
                                }}
                            >
                                {block.language && (
                                    <div
                                        style={{
                                            padding: '8px 16px',
                                            borderBottom: '1px solid rgba(204, 17, 17, 0.15)',
                                            fontFamily: "'DM Mono', monospace",
                                            fontSize: 10,
                                            letterSpacing: 2,
                                            textTransform: 'uppercase',
                                            color: 'var(--red2)'
                                        }}
                                    >
                                        {block.language}
                                    </div>
                                )}
                                <pre
                                    style={{
                                        margin: 0,
                                        padding: 20,
                                        overflowX: 'auto',
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: 13,
                                        lineHeight: 1.8,
                                        color: 'rgba(255, 255, 255, 0.85)'
                                    }}
                                >
                                    <code>{block.code}</code>
                                </pre>
                            </div>
                        )
                    case 'list':
                        return (
                            <ul
                                key={i}
                                style={{
                                    margin: 0,
                                    padding: 0,
                                    listStyle: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 10
                                }}
                            >
                                {block.items.map((item, j) => (
                                    <li
                                        key={j}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: 12,
                                            padding: '12px 16px',
                                            background: 'rgba(204, 17, 17, 0.04)',
                                            border: '1px solid rgba(204, 17, 17, 0.12)',
                                            borderRadius: 10,
                                            fontFamily: "'DM Mono', monospace",
                                            fontSize: 13,
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            lineHeight: 1.7
                                        }}
                                    >
                                        <span
                                            style={{
                                                width: 6,
                                                height: 6,
                                                borderRadius: '50%',
                                                background: 'var(--red)',
                                                flexShrink: 0,
                                                marginTop: 8,
                                                boxShadow: '0 0 8px var(--red)'
                                            }}
                                        />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )
                    case 'quote':
                        return (
                            <blockquote
                                key={i}
                                style={{
                                    margin: 0,
                                    padding: '20px 24px',
                                    borderLeft: '3px solid var(--red)',
                                    background: 'rgba(204, 17, 17, 0.06)',
                                    borderRadius: '0 12px 12px 0',
                                    fontSize: 16,
                                    fontStyle: 'italic',
                                    color: 'var(--white)',
                                    lineHeight: 1.8
                                }}
                            >
                                {block.text}
                            </blockquote>
                        )
                    default:
                        return null
                }
            })}
        </div>
    )
}
