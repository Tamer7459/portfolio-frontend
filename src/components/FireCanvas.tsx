'use client'
import { useEffect, useRef } from 'react'

export default function FireCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let w = 0
        let h = 0
        let frame = 0

        type Flame = {
            x: number
            y: number
            vx: number
            vy: number
            r: number
            life: number
            decay: number
        }

        const max = 100
        const particles: Flame[] = []

        const resize = () => {
            if (!canvasRef.current) return
            w = canvasRef.current.width = window.innerWidth
            h = canvasRef.current.height = window.innerHeight
        }

        const source = () => {
            const points = [
                { x: w * 0.03 + Math.random() * 100, y: h },
                { x: w * 0.97 - Math.random() * 100, y: h },
                { x: Math.random() * w, y: h + Math.random() * 8 }
            ]
            return points[Math.floor(Math.random() * points.length)]
        }

        const resetFlame = (f: Flame, x: number, y: number) => {
            f.x = x
            f.y = y
            f.vx = (Math.random() - 0.5) * 1.2
            f.vy = -(1.8 + Math.random() * 2.8)
            f.r = 3 + Math.random() * 7
            f.life = 1
            f.decay = 0.007 + Math.random() * 0.011
        }

        const drawFlame = (f: Flame) => {
            const a = Math.max(0, f.life)
            const grad = ctx.createRadialGradient(
                f.x,
                f.y,
                0,
                f.x,
                f.y,
                f.r * 2.5
            )
            grad.addColorStop(0, `rgba(255,240,200,${a * 0.9})`)
            grad.addColorStop(0.35, `rgba(220,60,0,${a * 0.7})`)
            grad.addColorStop(0.7, `rgba(140,0,0,${a * 0.4})`)
            grad.addColorStop(1, 'rgba(80,0,0,0)')

            ctx.beginPath()
            ctx.arc(f.x, f.y, f.r * 2.5, 0, Math.PI * 2)
            ctx.fillStyle = grad
            ctx.fill()
        }

        const tick = () => {
            ctx.clearRect(0, 0, w, h)

            if (frame % 2 === 0 && particles.length < max) {
                const s = source()
                const f: Flame = {
                    x: s.x,
                    y: s.y,
                    vx: 0,
                    vy: 0,
                    r: 0,
                    life: 0,
                    decay: 0
                }
                resetFlame(f, s.x, s.y)
                particles.push(f)
            }

            for (let i = particles.length - 1; i >= 0; i -= 1) {
                const p = particles[i]
                p.x += p.vx
                p.y += p.vy
                p.vx += (Math.random() - 0.5) * 0.15
                p.vy -= 0.05
                p.r *= 0.983
                p.life -= p.decay

                if (p.life <= 0 || p.r < 0.3) {
                    const s = source()
                    resetFlame(p, s.x, s.y)
                } else {
                    drawFlame(p)
                }
            }

            const bottom = ctx.createLinearGradient(0, h - 100, 0, h)
            bottom.addColorStop(0, 'transparent')
            bottom.addColorStop(1, 'rgba(140,0,0,0.22)')
            ctx.fillStyle = bottom
            ctx.fillRect(0, h - 100, w, 100)

            frame += 1
            requestAnimationFrame(tick)
        }

        resize()
        for (let i = 0; i < max; i += 1) {
            const s = source()
            const f: Flame = {
                x: s.x,
                y: s.y,
                vx: 0,
                vy: 0,
                r: 0,
                life: Math.random(),
                decay: 0
            }
            resetFlame(f, s.x, s.y)
            particles.push(f)
        }

        window.addEventListener('resize', resize)
        tick()

        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 2,
                opacity: 0.6
            }}
        />
    )
}
