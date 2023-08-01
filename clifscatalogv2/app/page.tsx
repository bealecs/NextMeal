import { getServerSession } from "next-auth";
import { Footer } from "./components/Footer";
import { Main } from "./components/Main";
import { RandomMealButton } from "./functional_components/RandomMealButton";
import { SearchBar } from "./functional_components/SearchBar";
import { options } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <main className="main-content">
      <Main session={session} />
      <SearchBar />
      <RandomMealButton session={session}/>
      <Footer />
    </main>
  );
}
