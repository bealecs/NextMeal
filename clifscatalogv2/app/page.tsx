import { getServerSession } from "next-auth";
import { Main } from "./components/Main";
import { options } from "./api/auth/[...nextauth]/options";
import { Navigation } from "./components/Navigation";
import ThemeContextProvider from "./store/ThemeProvider";
import { HeroSection } from "./components/HeroSection";
import { Suspense } from "react";
import { Loading } from "./suspense_fallback/Loading";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <main className="main-content">
      {session ? (
        <ThemeContextProvider session={session}>
          <Suspense fallback={<Loading />}>
            <Navigation session={session} />
            <Main session={session} />
          </Suspense>
          {/* <Footer /> */}
        </ThemeContextProvider>
      ) : (
        <HeroSection />
      )}
    </main>
  );
}
