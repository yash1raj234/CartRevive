import Navbar     from '@/components/sections/Navbar'
import Hero       from '@/components/sections/Hero'
import Problem    from '@/components/sections/Problem'
import HowItWorks from '@/components/sections/HowItWorks'
import LiveDemo   from '@/components/sections/LiveDemo'
import Metrics    from '@/components/sections/Metrics'
import Pricing    from '@/components/sections/Pricing'
import FAQ        from '@/components/sections/FAQ'
import FooterCTA  from '@/components/sections/FooterCTA'
import Footer     from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="bg-surface overflow-x-clip">
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <LiveDemo />
      <Metrics />
      <Pricing />
      <FAQ />
      <FooterCTA />
      <Footer />
    </main>
  )
}
