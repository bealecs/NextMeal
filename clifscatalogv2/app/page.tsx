import { Footer } from "./components/Footer"
import { Main } from "./components/Main"
import { SearchBar } from "./functional_components/SearchBar"

export default function Home() {
  return (
    <main className="main-content">
      <Main />
      <SearchBar />
      <Footer />
    </main>
  )
}
