import { Footer } from "./components/Footer";
import { Main } from "./components/Main";
import { RandomMealButton } from "./functional_components/RandomMealButton";
import { SearchBar } from "./functional_components/SearchBar";
import Provider from "./store/SessionProvider";

export default async function Home() {

  return (
    <main className="main-content">
      <Provider>
        <Main />
        <SearchBar />
        {/* <RandomMealButton /> */}
        <Footer />
      </Provider>
    </main>
  );
}
