'use client'
import { useEffect, useRef } from 'react'

export default function AnimusCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')!
        let W = 0,
            H = 0,
            t = 0
        const mouse = { x: -999, y: -999 }

        interface Node {
            x: number
            y: number
            vx: number
            vy: number
            r: number
            phase: number
        }
        let nodes: Node[] = []

        function resize() {
            const canvasEl = canvasRef.current
            if (!canvasEl) return
            W = canvasEl.width = window.innerWidth
            H = canvasEl.height = window.innerHeight
            nodes = []
            const count = Math.floor((W * H) / 7200)
            for (let i = 0; i < count; i++) {
                nodes.push({
                    x: Math.random() * W,
                    y: Math.random() * H,
                    vx: (Math.random() - 0.5) * 0.22,
                    vy: (Math.random() - 0.5) * 0.22,
                    r: Math.random() * 1.8 + 0.5,
                    phase: Math.random() * Math.PI * 2
                })
            }
        }

        function draw() {
            ctx.clearRect(0, 0, W, H)
            const has = mouse.x > 0 && mouse.x < W && mouse.y > 0 && mouse.y < H

            nodes.forEach(n => {
                n.x += n.vx
                n.y += n.vy
                if (n.x < 0 || n.x > W) n.vx *= -1
                if (n.y < 0 || n.y > H) n.vy *= -1
                if (has) {
                    const dx = n.x - mouse.x,
                        dy = n.y - mouse.y
                    const d = Math.sqrt(dx * dx + dy * dy)
                    if (d < 150) {
                        const f = (0.5 - d / 150) * 0.05
                        n.vx += (dx / d) * f
                        n.vy += (dy / d) * f
                        n.vx = Math.max(-0.9, Math.min(0.9, n.vx))
                        n.vy = Math.max(-0.9, Math.min(0.9, n.vy))
                    }
                }
            })

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const a = nodes[i],
                        b = nodes[j]
                    const dx = a.x - b.x,
                        dy = a.y - b.y
                    const d = Math.sqrt(dx * dx + dy * dy)
                    if (d < 120) {
                        ctx.beginPath()
                        ctx.moveTo(a.x, a.y)
                        ctx.lineTo(b.x, b.y)
                        ctx.strokeStyle = `rgba(204,17,17,${(1 - d / 120) * 0.15})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                }
                if (has) {
                    const dx = nodes[i].x - mouse.x,
                        dy = nodes[i].y - mouse.y
                    const d = Math.sqrt(dx * dx + dy * dy)
                    if (d < 165) {
                        ctx.beginPath()
                        ctx.moveTo(nodes[i].x, nodes[i].y)
                        ctx.lineTo(mouse.x, mouse.y)
                        ctx.strokeStyle = `rgba(220,40,0,${(1 - d / 165) * 0.35})`
                        ctx.lineWidth = 0.6
                        ctx.stroke()
                    }
                }
            }

            // Draw faint triangle meshes when 3 nearby nodes cluster together.
            for (let i = 0; i < nodes.length; i += 2) {
                const a = nodes[i]
                let nearest1: Node | null = null
                let nearest2: Node | null = null
                let d1 = Infinity
                let d2 = Infinity

                for (let j = 0; j < nodes.length; j++) {
                    if (i === j) continue
                    const b = nodes[j]
                    const dx = a.x - b.x
                    const dy = a.y - b.y
                    const d = Math.sqrt(dx * dx + dy * dy)
                    if (d < d1) {
                        d2 = d1
                        nearest2 = nearest1
                        d1 = d
                        nearest1 = b
                    } else if (d < d2) {
                        d2 = d
                        nearest2 = b
                    }
                }

                if (nearest1 && nearest2 && d1 < 130 && d2 < 130) {
                    ctx.beginPath()
                    ctx.moveTo(a.x, a.y)
                    ctx.lineTo(nearest1.x, nearest1.y)
                    ctx.lineTo(nearest2.x, nearest2.y)
                    ctx.closePath()
                    ctx.fillStyle = 'rgba(204,17,17,0.025)'
                    ctx.fill()
                }
            }

            nodes.forEach(n => {
                const p = Math.sin(t * 2 + n.phase) * 0.35 + 0.65
                ctx.beginPath()
                ctx.arc(n.x, n.y, n.r * p, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(204,17,17,${0.5 * p})`
                ctx.fill()
            })

            // Omega halo
            ctx.save()
            ctx.translate(W * 0.5, H * 0.5)
            ctx.rotate(t * 0.122)

            // Outer large circle
            ctx.strokeStyle = 'rgba(204,17,17,0.255)'
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.arc(0, 0, Math.min(W, H) * 0.28, 0, Math.PI * 2)
            ctx.stroke()

            // Inner small circle
            ctx.beginPath()
            ctx.arc(0, 0, Math.min(W, H) * 0.2, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(204,17,17,0.188)'
            ctx.stroke()

            // Radial lines (8 lines)
            for (let i = 0; i < 8; i++) {
                const ang = (i / 8) * Math.PI * 2
                ctx.beginPath()
                ctx.moveTo(Math.cos(ang) * 52, Math.sin(ang) * 52)
                ctx.lineTo(
                    Math.cos(ang) * Math.min(W, H) * 0.28,
                    Math.sin(ang) * Math.min(W, H) * 0.28
                )
                ctx.strokeStyle = 'rgba(204,17,17,0.155)'
                ctx.stroke()
            }

            // Center omega glyph
            ctx.font = `bold ${Math.min(W, H) * 0.12}px 'Cinzel Decorative', serif`
            ctx.fillStyle = 'rgba(204,17,17,0.200)'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText('\u03A9', 0, 0)
            ctx.restore()

            // Cursor crosshair
            if (has) {
                ;[8, 18, 30].forEach((r, i) => {
                    ctx.beginPath()
                    ctx.arc(
                        mouse.x,
                        mouse.y,
                        r + Math.sin(t * 4 + i) * 2,
                        0,
                        Math.PI * 2
                    )
                    ctx.strokeStyle = `rgba(204,17,17,${0.75 - i * 0.2})`
                    ctx.lineWidth = i === 0 ? 1.5 : 0.8
                    ctx.stroke()
                })
                ctx.beginPath()
                ctx.arc(mouse.x, mouse.y, 3.5, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(255,80,40,.95)'
                ctx.fill()
                ctx.strokeStyle = 'rgba(204,17,17,0.22)'
                ctx.lineWidth = 0.5
                ctx.beginPath()
                ctx.moveTo(mouse.x - 44, mouse.y)
                ctx.lineTo(mouse.x + 44, mouse.y)
                ctx.stroke()
                ctx.beginPath()
                ctx.moveTo(mouse.x, mouse.y - 44)
                ctx.lineTo(mouse.x, mouse.y + 44)
                ctx.stroke()
            }

            t += 0.011
            requestAnimationFrame(draw)
        }

        const onMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }
        const onLeave = () => {
            mouse.x = -999
            mouse.y = -999
        }

        document.addEventListener('mousemove', onMove)
        document.addEventListener('mouseleave', onLeave)
        window.addEventListener('resize', resize)
        resize()
        draw()

        return () => {
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseleave', onLeave)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 2
            }}
        />
    )
}
