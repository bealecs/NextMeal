import { Footer } from "./components/Footer"
import { Main } from "./components/Main"
import RandomMealGenerator from "./functional_components/RandomMealGenerator"
import { SearchBar } from "./functional_components/SearchBar"

export default function Home() {
  return (
    <main className="main-content">
      <Main />
      <SearchBar />
      <RandomMealGenerator />
      <Footer />
    </main>
  )
}
