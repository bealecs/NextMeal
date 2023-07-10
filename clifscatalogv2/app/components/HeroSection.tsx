import Chat from "../functional_components/Chat";
import "../globalStyles.css";
import HeroSectionStyles from "../modular_css/HeroSection.module.css";

export const HeroSection = () => {
  return (
    <main className={HeroSectionStyles.container}>
      {/* set a conditional here for whether the user is logged in or not for the hero message */}
    </main>    
  );
};
