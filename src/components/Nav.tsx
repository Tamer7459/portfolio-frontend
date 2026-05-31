'use client'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' }
]

export default function Nav({ name }: { name?: string }) {
    const [scrolled, setScrolled] = useState(false)
    const [activeHref, setActiveHref] = useState('#hero')
    const [mobileOpen, setMobileOpen] = useState(false)
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
    const linksRef = useRef<Map<string, HTMLLIElement>>(new Map())

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40)

            const pivot = window.scrollY + window.innerHeight * 0.32
            let current = '#hero'

            for (const link of LINKS) {
                const id = link.href.replace('#', '')
                const section = document.getElementById(id)
                if (!section) continue

                const top = section.offsetTop
                const bottom = top + section.offsetHeight
                if (pivot >= top && pivot < bottom) {
                    current = link.href
                    break
                }
            }

            setActiveHref(current)
        }

        window.addEventListener('scroll', onScroll)
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const el = linksRef.current.get(activeHref)
        if (el) {
            const parent = el.closest('ul')
            if (parent) {
                const parentRect = parent.getBoundingClientRect()
                const elRect = el.getBoundingClientRect()
                setIndicatorStyle({
                    left: elRect.left - parentRect.left,
                    width: elRect.width
                })
            }
        }
    }, [activeHref])

    useEffect(() => {
        if (!mobileOpen) return
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setMobileOpen(false)
            }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [mobileOpen])

    return (
        <motion.nav
            className={`nav-main ${scrolled ? 's' : ''}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <a href="#hero" className="nlogo" aria-label="Go to home">
                <span className="nomega">{'\u03A9'}</span>
                <span>{name ?? 'BA_DEV'}</span>
            </a>

            <ul className="nlinks">
                {LINKS.map(link => (
                    <li
                        key={link.label}
                        ref={el => {
                            if (el) linksRef.current.set(link.href, el)
                            else linksRef.current.delete(link.href)
                        }}
                        style={{ position: 'relative' }}
                    >
                        <a
                            href={link.href}
                            className={`nlink ${activeHref === link.href ? 'active' : ''}`}
                            onClick={() => {
                                setActiveHref(link.href)
                            }}
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
                {/* Animated indicator */}
                <motion.li
                    className="nav-indicator"
                    aria-hidden
                    animate={{
                        left: indicatorStyle.left,
                        width: indicatorStyle.width
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{
                        position: 'absolute',
                        bottom: -4,
                        height: 2,
                        background: 'var(--red)',
                        borderRadius: 2,
                        pointerEvents: 'none'
                    }}
                />
            </ul>

            <button
                type="button"
                className="nav-toggle"
                aria-expanded={mobileOpen}
                aria-controls="nav-mobile"
                onClick={() => setMobileOpen(open => !open)}
            >
                {mobileOpen ? 'Close' : 'Menu'}
            </button>

            <div
                id="nav-mobile"
                className={`nav-mobile ${mobileOpen ? 'open' : ''}`}
            >
                {LINKS.map(link => (
                    <a
                        key={link.label}
                        href={link.href}
                        className="nav-mobile-link"
                        onClick={() => {
                            setActiveHref(link.href)
                            setMobileOpen(false)
                        }}
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </motion.nav>
    )
}
