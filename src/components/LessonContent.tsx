import { Fragment } from 'react'
import Image from 'next/image'
import type { LessonBlock } from '@/lib/api'

function renderInline(text: string, keyPrefix: string) {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g)
    return parts
        .filter(Boolean)
        .map((part, i) => {
            const key = `${keyPrefix}-${i}`
            if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
                return <strong key={key} style={{ color: 'var(--white)' }}>{part.slice(2, -2)}</strong>
            }
            if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
                return (
                    <code
                        key={key}
                        dir="ltr"
                        style={{
                            background: 'rgba(204, 17, 17, 0.12)',
                            border: '1px solid rgba(204, 17, 17, 0.25)',
                            borderRadius: 5,
                            padding: '1px 7px',
                            fontSize: '0.92em',
                            color: 'var(--red2)',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {part.slice(1, -1)}
                    </code>
                )
            }
            const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
            if (linkMatch) {
                return (
                    <a
                        key={key}
                        href={linkMatch[2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--red2)', textDecoration: 'underline' }}
                    >
                        {linkMatch[1]}
                    </a>
                )
            }
            return <Fragment key={key}>{part}</Fragment>
        })
}

export default function LessonContent({
    blocks,
    dir = 'ltr'
}: {
    blocks: LessonBlock[]
    dir?: 'rtl' | 'ltr'
}) {
    const isRtl = dir === 'rtl'
    return (
        <div
            dir={dir}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 28,
                textAlign: isRtl ? 'right' : 'left'
            }}
        >
            {blocks.map((block, i) => {
                switch (block.type) {
                    case 'heading': {
                        const isH3 = block.level === 3
                        return (
                            <h2
                                key={i}
                                style={{
                                    fontSize: isH3 ? 'clamp(17px, 2.4vw, 22px)' : 'clamp(20px, 3vw, 28px)',
                                    fontWeight: 800,
                                    color: 'var(--white)',
                                    letterSpacing: isRtl ? 0 : -0.5,
                                    margin: '12px 0 0 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12
                                }}
                            >
                                <span
                                    style={{
                                        width: 3,
                                        height: isH3 ? 20 : 26,
                                        background: 'var(--red)',
                                        borderRadius: 2,
                                        display: 'block',
                                        flexShrink: 0
                                    }}
                                />
                                {block.text}
                            </h2>
                        )
                    }
                    case 'paragraph':
                        return (
                            <p
                                key={i}
                                style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: 14,
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    lineHeight: 2,
                                    letterSpacing: 0.3,
                                    margin: 0
                                }}
                            >
                                {renderInline(block.text, `p-${i}`)}
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
                                dir="ltr"
                                style={{
                                    borderRadius: 12,
                                    overflow: 'hidden',
                                    border: '1px solid rgba(204, 17, 17, 0.2)',
                                    background: '#0d0d0d',
                                    textAlign: 'left'
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
                            <ol
                                key={i}
                                style={{
                                    margin: 0,
                                    padding: 0,
                                    listStyle: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 10,
                                    counterReset: 'lesson-step'
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
                                            lineHeight: 1.9,
                                            counterIncrement: block.ordered ? 'lesson-step' : undefined
                                        }}
                                    >
                                        {block.ordered ? (
                                            <span
                                                style={{
                                                    minWidth: 26,
                                                    height: 26,
                                                    borderRadius: '50%',
                                                    background: 'rgba(204, 17, 17, 0.15)',
                                                    border: '1px solid rgba(204, 17, 17, 0.4)',
                                                    color: 'var(--red2)',
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0,
                                                    marginTop: 2
                                                }}
                                            >
                                                {j + 1}
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    width: 6,
                                                    height: 6,
                                                    borderRadius: '50%',
                                                    background: 'var(--red)',
                                                    flexShrink: 0,
                                                    marginTop: 10,
                                                    boxShadow: '0 0 8px var(--red)'
                                                }}
                                            />
                                        )}
                                        <span>{renderInline(item, `li-${i}-${j}`)}</span>
                                    </li>
                                ))}
                            </ol>
                        )
                    case 'table':
                        return (
                            <div
                                key={i}
                                style={{
                                    overflowX: 'auto',
                                    borderRadius: 12,
                                    border: '1px solid rgba(204, 17, 17, 0.2)'
                                }}
                            >
                                <table
                                    style={{
                                        width: '100%',
                                        borderCollapse: 'collapse',
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: 12.5,
                                        lineHeight: 1.9
                                    }}
                                >
                                    <thead>
                                        <tr style={{ background: 'rgba(204, 17, 17, 0.12)' }}>
                                            {block.headers.map((h, j) => (
                                                <th
                                                    key={j}
                                                    style={{
                                                        padding: '12px 16px',
                                                        textAlign: isRtl ? 'right' : 'left',
                                                        color: 'var(--red2)',
                                                        fontWeight: 700,
                                                        borderBottom: '1px solid rgba(204, 17, 17, 0.25)',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {block.rows.map((row, r) => (
                                            <tr
                                                key={r}
                                                style={{
                                                    background: r % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                                                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                                                }}
                                            >
                                                {row.map((cell, c) => (
                                                    <td
                                                        key={c}
                                                        style={{
                                                            padding: '12px 16px',
                                                            color: 'rgba(255, 255, 255, 0.75)',
                                                            verticalAlign: 'top'
                                                        }}
                                                    >
                                                        {renderInline(cell, `t-${i}-${r}-${c}`)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    case 'quote':
                        return (
                            <blockquote
                                key={i}
                                style={{
                                    margin: 0,
                                    padding: '20px 24px',
                                    borderLeft: isRtl ? undefined : '3px solid var(--red)',
                                    borderRight: isRtl ? '3px solid var(--red)' : undefined,
                                    background: 'rgba(204, 17, 17, 0.06)',
                                    borderRadius: isRtl ? '12px 0 0 12px' : '0 12px 12px 0',
                                    fontSize: 15,
                                    fontStyle: 'italic',
                                    color: 'var(--white)',
                                    lineHeight: 2
                                }}
                            >
                                {renderInline(block.text, `q-${i}`)}
                            </blockquote>
                        )
                    default:
                        return null
                }
            })}
        </div>
    )
}
