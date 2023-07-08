import { HeroSection } from "./HeroSection";
import { Navigation } from "./Navigation";
import '../globalStyles.css';
import MainStyles from '../modular_css/Main.module.css';

export const Main = () => {
  return (
    <main className={MainStyles.container}>
      <Navigation />
      <HeroSection />
    </main>
  );
};
