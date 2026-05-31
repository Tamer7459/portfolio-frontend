import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import TechStack from '@/components/TechStack'
import Work from '@/components/Work'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

import AnimusCanvas from '@/components/AnimusCanvas'
import FireCanvas from '@/components/FireCanvas'
import { profile, projects } from '@/lib/data'

export default function HomePage() {
    return (
        <>
            <div className="scroll-progress" id="scrollProgress" />
            <FireCanvas />
            <AnimusCanvas />
            <Nav name={profile.name} />

            <main>
                <Hero profile={profile} />
                <TechStack />
                <About profile={profile} />
                <Work projects={projects} />
                <Services />

                <Contact profile={profile} />
            </main>

            <Footer name={profile.name} />

            <a href="#hero" className="home-fab" aria-label="Go to home">
                ↑
            </a>
        </>
    )
}
