import { getServerSession } from "next-auth";
import { Footer } from "./components/Footer";
import { Main } from "./components/Main";
import { options } from "./api/auth/[...nextauth]/options";
import { Navigation } from "./components/Navigation";
import ThemeContextProvider from "./store/ThemeProvider";
import { HeroSection } from "./components/HeroSection";

export default async function Home() {
  const session = await getServerSession(options);
  
  return (
    <main className="main-content">
      {session ? (
        <ThemeContextProvider session={session}>
          <Navigation session={session} />
          <Main session={session} />
          {/* <Footer /> */}
        </ThemeContextProvider>
        ) : (
        <HeroSection />)}
    </main>
  );
}
