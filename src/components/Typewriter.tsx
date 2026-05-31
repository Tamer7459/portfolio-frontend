'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface TypewriterProps {
    texts?: string[]
    text?: string
    delay?: number
}

const defaultTexts = [
    'Crafting digital experiences with precision and creativity',
    'Full-Stack Developer & Problem Solver',
    'Building the future, one commit at a time'
]

export default function Typewriter({ texts, text, delay = 0.8 }: TypewriterProps) {
    const phrases = texts ?? (text ? [text] : defaultTexts)
    const [displayText, setDisplayText] = useState('')
    const [isComplete, setIsComplete] = useState(false)
    const [phraseIndex, setPhraseIndex] = useState(0)

    useEffect(() => {
        let timeout: NodeJS.Timeout
        let interval: NodeJS.Timeout

        const startTyping = () => {
            let index = 0
            setDisplayText('')
            setIsComplete(false)
            const currentText = phrases[phraseIndex]

            interval = setInterval(() => {
                if (index < currentText.length) {
                    setDisplayText(currentText.slice(0, index + 1))
                    index++
                } else {
                    clearInterval(interval)
                    setIsComplete(true)

                    timeout = setTimeout(() => {
                        setPhraseIndex((prev) => (prev + 1) % phrases.length)
                    }, 3000)
                }
            }, 30)
        }

        timeout = setTimeout(() => {
            startTyping()
        }, delay * 1000)

        return () => {
            clearTimeout(timeout)
            clearInterval(interval)
        }
    }, [phrases, phraseIndex, delay])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay }}
            style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '13px',
                letterSpacing: '0.2em',
                marginBottom: '22px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
            }}
        >
            <span style={{ color: '#cc1111' }}>{'// '}</span>
            <span style={{ color: '#aaa' }}>{displayText}</span>
            {!isComplete && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    style={{ color: '#cc1111' }}
                >
                    ▊
                </motion.span>
            )}
        </motion.div>
    )
}
