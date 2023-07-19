import { Footer } from "./components/Footer";
import { Main } from "./components/Main";
import { RandomMealButton } from "./functional_components/RandomMealButton";
import { SearchBar } from "./functional_components/SearchBar";
import Provider from "./store/SessionProvider";

export default function Home() {
  return (
    <main className="main-content">
      <Provider>
        <Main />
        <SearchBar />
        <RandomMealButton /> {/*commenting this out for now to save resources on our API calls */} 
        <Footer />
      </Provider>
    </main>
  );
}
