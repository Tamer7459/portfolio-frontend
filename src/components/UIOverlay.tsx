'use client'
import { useEffect, useRef, useState } from 'react'

export default function UIOverlay() {
    const [loaded, setLoaded] = useState(false)
    const [showReturnAnimus, setShowReturnAnimus] = useState(false)
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const fillRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const navEntry = performance.getEntriesByType('navigation')[0] as
            | PerformanceNavigationTiming
            | undefined
        const isBackForward = navEntry?.type === 'back_forward'

        let t: ReturnType<typeof setTimeout> | null = null
        let splashTimer: ReturnType<typeof setTimeout> | null = null

        if (fillRef.current) fillRef.current.style.width = '100%'

        if (isBackForward) {
            // Quick splash on back/forward navigation
            setLoaded(true)
            setShowReturnAnimus(true)
            splashTimer = setTimeout(() => setShowReturnAnimus(false), 900)
        } else {
            // Full loader on initial load / refresh
            t = setTimeout(() => {
                setLoaded(true)
            }, 2400)
        }

        // Custom cursor
        const onMove = (e: MouseEvent) => {
            if (dotRef.current) {
                dotRef.current.style.left = e.clientX + 'px'
                dotRef.current.style.top = e.clientY + 'px'
            }
            if (ringRef.current) {
                ringRef.current.style.left = e.clientX + 'px'
                ringRef.current.style.top = e.clientY + 'px'
            }
        }

        const onOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null
            if (!target || !ringRef.current || !dotRef.current) return
            const hit = target.closest('a, button, .service-card')
            if (hit) {
                dotRef.current.style.width = '4px'
                dotRef.current.style.height = '4px'
                ringRef.current.style.width = '50px'
                ringRef.current.style.height = '50px'
                ringRef.current.style.borderColor = 'rgba(204,17,17,.9)'
            }
        }

        const onOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null
            if (!target || !ringRef.current || !dotRef.current) return
            const hit = target.closest('a, button, .service-card')
            if (hit) {
                dotRef.current.style.width = '8px'
                dotRef.current.style.height = '8px'
                ringRef.current.style.width = '30px'
                ringRef.current.style.height = '30px'
                ringRef.current.style.borderColor = 'rgba(204,17,17,.5)'
            }
        }

        document.addEventListener('mousemove', onMove)
        document.addEventListener('mouseover', onOver)
        document.addEventListener('mouseout', onOut)

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('on')
                    } else {
                        entry.target.classList.remove('on')
                    }
                })
            },
            { threshold: 0.1 }
        )

        document.querySelectorAll('.rv').forEach(el => observer.observe(el))

        // Scroll progress bar
        const progressBar = document.getElementById('scrollProgress')
        const onProgress = () => {
            if (!progressBar) return
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
            progressBar.style.width = pct + '%'
        }
        window.addEventListener('scroll', onProgress, { passive: true })

        const onPageShow = (e: PageTransitionEvent) => {
            if (e.persisted) {
                setShowReturnAnimus(true)
                if (splashTimer) clearTimeout(splashTimer)
                splashTimer = setTimeout(() => setShowReturnAnimus(false), 900)
            }
        }

        window.addEventListener('pageshow', onPageShow)

        return () => {
            if (t) clearTimeout(t)
            if (splashTimer) clearTimeout(splashTimer)
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseover', onOver)
            document.removeEventListener('mouseout', onOut)
            window.removeEventListener('scroll', onProgress)
            window.removeEventListener('pageshow', onPageShow)
            observer.disconnect()
        }
    }, [])

    return (
        <>
            {/* ── Loader ── */}
            <div className={`loader ${loaded ? 'out' : ''}`}>
                <div className="loader-omega">Ω</div>
                <div className="loader-text">Initializing Animus...</div>
                <div className="loader-bar">
                    <div
                        ref={fillRef}
                        className="loader-fill"
                        style={{ width: 0 }}
                    />
                </div>
            </div>

            {showReturnAnimus ? (
                <div className="loader-mini">ANIMUS</div>
            ) : null}

            {/* ── Custom cursor ── */}
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />

            {/* ── Scan lines overlay ── */}
            <div className="scan-lines" />

            {/* ── HUD corners ── */}
            <div className="hud-corner hud-tl" />
            <div className="hud-corner hud-tr" />
            <div className="hud-corner hud-bl" />
            <div className="hud-corner hud-br" />
            <div className="hud-text hud-text-1">
                ANIMUS v4.2 // DNA SYNC: 98.7%
            </div>
            <div className="hud-text hud-text-2">MEMORY SEQUENCE: ACTIVE</div>
        </>
    )
}
