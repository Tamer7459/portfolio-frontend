'use client'
import dynamic from 'next/dynamic'

const UIOverlay = dynamic(() => import('@/components/UIOverlay'), { ssr: false })

export default function ClientUIOverlay() {
    return <UIOverlay />
}
