import { Footer } from "./components/Footer"
import { HeroSection } from "./components/HeroSection"
import { Navigation } from "./components/Navigation"

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <Footer />
    </main>
  )
}
