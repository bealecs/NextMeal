import Chat from "../functional_components/Chat";
import "../globalStyles.css";
import HeroSectionStyles from "../modular_css/HeroSection.module.css";

export const HeroSection = () => {
  return (
    <main className={HeroSectionStyles.container}>
      <Chat />
    </main>    
  );
};
