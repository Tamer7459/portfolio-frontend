import type { Metadata } from 'next'
import './globals.css'
import ClientUIOverlay from '@/components/ClientUIOverlay'

export const metadata: Metadata = {
    title: 'Bali Abdelkouddous | Portfolio',
    description:
        'A cinematic full-stack portfolio built with Next.js and Django.'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" data-scroll-behavior="smooth">
            <body>
                {children}
                <ClientUIOverlay />
            </body>
        </html>
    )
}
