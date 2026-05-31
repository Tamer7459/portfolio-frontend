'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { sendContact } from '@/lib/api'
import type { Profile } from '@/lib/api'

type Status = 'idle' | 'sending' | 'success' | 'error'
type FieldError = {
    name?: string
    email?: string
    message?: string
}

const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    padding: '14px 0',
    fontFamily: "'DM Mono', monospace",
    fontSize: 12,
    letterSpacing: 1,
    color: 'var(--white)',
    outline: 'none',
    transition: 'border-color 0.3s, border-color 0.3s',
    caretColor: 'var(--red)'
}

const inputStyleError: React.CSSProperties = {
    ...inputStyle,
    borderBottom: '1px solid rgba(255, 100, 100, 0.5)'
}

const labelStyle: React.CSSProperties = {
    fontFamily: "'DM Mono', monospace",
    fontSize: 9,
    letterSpacing: 3,
    color: 'var(--red)',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: 8
}

const errorTextStyle: React.CSSProperties = {
    fontFamily: "'DM Mono', monospace",
    fontSize: 9,
    letterSpacing: 1,
    color: 'rgba(255, 100, 100, 0.8)',
    marginTop: 4
}

const stagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
}

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
}

const fadeRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
}

export default function Contact({ profile }: { profile: Profile }) {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const headingRef = useRef<HTMLHeadingElement>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [isHoveringHeading, setIsHoveringHeading] = useState(false)

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', onMove)
        return () => window.removeEventListener('mousemove', onMove)
    }, [])

    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [status, setStatus] = useState<Status>('idle')
    const [errors, setErrors] = useState<FieldError>({})
    const [touched, setTouched] = useState<Partial<Record<keyof typeof form, boolean>>>({})

    const validateForm = (): boolean => {
        const newErrors: FieldError = {}

        if (!form.name.trim()) {
            newErrors.name = 'Name is required'
        }

        if (!form.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'Invalid email format'
        }

        if (!form.message.trim()) {
            newErrors.message = 'Message is required'
        } else if (form.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        if (touched[name as keyof typeof form]) {
            validateForm()
        }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name } = e.target
        setTouched(prev => ({ ...prev, [name]: true }))
        validateForm()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setStatus('sending')
        try {
            await sendContact(form)
            setStatus('success')
            setForm({ name: '', email: '', subject: '', message: '' })
            setTouched({})
            setErrors({})
            setTimeout(() => setStatus('idle'), 5000)
        } catch (error) {
            setStatus('error')
            setTimeout(() => setStatus('idle'), 5000)
        }
    }
    const cleanNumber = profile.whatsapp?.replace(/\D/g, '')

    const contactLinks = [
        {
            label: 'Email',
            value: profile.email,
            href: `mailto:${profile.email}`
        },
        {
            label: 'GitHub',
            value: profile.github?.replace('https://', ''),
            href: profile.github
        },
        {
            label: 'LinkedIn',
            value: 'Connect on LinkedIn',
            href: profile.linkedin
        },
        {
            label: 'WhatsApp',
            value: profile.whatsapp,
            href: cleanNumber ? `https://wa.me/${cleanNumber}` : undefined
        }
    ].filter(i => i.href)

    return (
        <section
            id="contact"
            ref={ref}
            className="contact-section"
            style={{ padding: '120px 68px 160px' }}
        >
            <motion.div
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={stagger}
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 88,
                    alignItems: 'start'
                }}
            >
                {/* Left: Contact Info */}
                <motion.div variants={fadeUp}>
                    <motion.div variants={fadeUp} className="sec-tag">
                        Contact
                    </motion.div>
                    <motion.h2
                        ref={headingRef}
                        variants={fadeUp}
                        style={{
                            fontSize: 'clamp(28px, 3.5vw, 48px)',
                            fontWeight: 900,
                            lineHeight: 1.05,
                            letterSpacing: -1.5,
                            color: 'var(--white)',
                            marginBottom: 26,
                            transform: isHoveringHeading
                                ? `translate(${(mousePos.x - (headingRef.current?.getBoundingClientRect().left ?? 0) - (headingRef.current?.offsetWidth ?? 0) / 2) * 0.03}px, ${(mousePos.y - (headingRef.current?.getBoundingClientRect().top ?? 0) - (headingRef.current?.offsetHeight ?? 0) / 2) * 0.03}px)`
                                : undefined,
                            transition: isHoveringHeading ? 'transform 0.1s ease' : 'transform 0.5s ease'
                        }}
                        onMouseEnter={() => setIsHoveringHeading(true)}
                        onMouseLeave={() => setIsHoveringHeading(false)}
                    >
                        Let&apos;s{' '}
                        <em style={{ color: 'var(--red)', fontStyle: 'normal' }}>
                            Connect
                        </em>
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 13,
                            lineHeight: 1.85,
                            color: '#555',
                            marginBottom: 40
                        }}
                    >
                        Open to opportunities, collaborations, and interesting conversations.
                    </motion.p>

                    <motion.div
                        variants={stagger}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 24
                        }}
                    >
                        {contactLinks.map(item => (
                            <motion.div
                                key={item.label}
                                variants={fadeUp}
                                whileHover={{ x: 6 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                            >
                                <div style={labelStyle}>{item.label}</div>
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: 12,
                                        color: 'var(--grey)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s'
                                    }}
                                    onMouseEnter={e =>
                                        (e.currentTarget.style.color = '#fff')
                                    }
                                    onMouseLeave={e =>
                                        (e.currentTarget.style.color = 'var(--grey)')
                                    }
                                >
                                    {item.value}
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right: Form */}
                <motion.div
                    variants={fadeRight}
                    style={{
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '48px 40px',
                        position: 'relative',
                        background: 'rgba(255,255,255,0.015)'
                    }}
                >
                    {/* Minimal accent lines */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: 24,
                            height: 1,
                            background: 'var(--red)'
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: 1,
                            height: 24,
                            background: 'var(--red)'
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: 24,
                            height: 1,
                            background: 'var(--red)'
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: 1,
                            height: 24,
                            background: 'var(--red)'
                        }}
                    />

                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 28
                        }}
                    >
                        {/* Name + Email row */}
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: 24
                            }}
                        >
                            <motion.div variants={fadeUp}>
                                <label style={labelStyle}>Name</label>
                                <div className="input-underline">
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Your name"
                                        style={
                                            touched.name && errors.name
                                                ? inputStyleError
                                                : inputStyle
                                        }
                                        aria-label="Your name"
                                    />
                                </div>
                                {touched.name && errors.name && (
                                    <div style={errorTextStyle}>{errors.name}</div>
                                )}
                            </motion.div>
                            <motion.div variants={fadeUp}>
                                <label style={labelStyle}>
                                    Email {form.email && !errors.email && '✓'}
                                </label>
                                <div className="input-underline">
                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="your@email.com"
                                        style={
                                            touched.email && errors.email
                                                ? inputStyleError
                                                : inputStyle
                                        }
                                        aria-label="Your email address"
                                    />
                                </div>
                                {touched.email && errors.email && (
                                    <div style={errorTextStyle}>{errors.email}</div>
                                )}
                            </motion.div>
                        </motion.div>

                        {/* Subject */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                        >
                            <label style={labelStyle}>Subject (optional)</label>
                            <div className="input-underline">
                                <input
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder="Project inquiry..."
                                    style={inputStyle}
                                    aria-label="Message subject"
                                />
                            </div>
                        </motion.div>

                        {/* Message */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                        >
                            <label style={labelStyle}>
                                Message ({form.message.length}/500)
                            </label>
                            <div className="input-underline">
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Tell me about your project..."
                                    rows={5}
                                    maxLength={500}
                                    style={
                                        touched.message && errors.message
                                            ? { ...inputStyleError, resize: 'none', display: 'block' }
                                            : { ...inputStyle, resize: 'none', display: 'block' }
                                    }
                                    aria-label="Your message"
                                />
                            </div>
                            {touched.message && errors.message && (
                                <div style={errorTextStyle}>{errors.message}</div>
                            )}
                        </motion.div>

                        {/* Submit */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                        >
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="btn-red"
                                style={{
                                    border: 'none',
                                    cursor: status === 'sending' ? 'wait' : 'pointer',
                                    opacity: status === 'sending' ? 0.6 : 1,
                                    alignSelf: 'flex-start',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {status === 'sending'
                                    ? '⟳ Sending...'
                                    : status === 'success'
                                        ? '✓ Sent!'
                                        : 'Send Message'}
                            </button>
                        </motion.div>

                        {/* Feedback */}
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: 11,
                                    letterSpacing: 1.5,
                                    color: 'rgba(76, 175, 80, 0.9)',
                                    padding: '12px 16px',
                                    borderLeft: '2px solid rgba(76, 175, 80, 0.9)',
                                    background: 'rgba(76, 175, 80, 0.05)'
                                }}
                            >
                                ✓ Your message has been sent! I&apos;ll get back to you soon.
                            </motion.div>
                        )}
                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: 11,
                                    letterSpacing: 1.5,
                                    color: 'rgba(255, 100, 100, 0.9)',
                                    padding: '12px 16px',
                                    borderLeft: '2px solid rgba(255, 100, 100, 0.9)',
                                    background: 'rgba(255, 100, 100, 0.05)'
                                }}
                            >
                                ✗ Something went wrong. Please try again or contact me directly.
                            </motion.div>
                        )}
                    </form>
                </motion.div>
            </motion.div>
        </section>
    )
}
