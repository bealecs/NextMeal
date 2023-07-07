import { Footer } from "./components/Footer"
import { HeroSection } from "./components/HeroSection"
import { Navigation } from "./components/Navigation"

export default function Home() {
  return (
    <main className="main-content">
      <Navigation />
      <HeroSection />
      <Footer />
    </main>
  )
}
