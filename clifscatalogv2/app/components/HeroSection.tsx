import Link from "next/link";
import "../globalStyles.css";
import HeroSectionStyles from "../modular_css/HeroSection.module.css";
import { SearchBar } from "../functional_components/search/SearchBarNoUser";
import SousChef from "../functional_components/chat/SousChef";
import { RandomMealButton } from "../functional_components/random_meal/RandomMealButton";

export const HeroSection = () => {
  return (
    <>
      <div className={HeroSectionStyles.container}>
        <div className={HeroSectionStyles.searchBar}>
          <SearchBar session={null} />
        </div>
        <div className={HeroSectionStyles.heroText}>
          <h1>
            Find Your{" "}
            <span className={HeroSectionStyles.nameSpan}>Next Meal</span>
          </h1>
          <h4 className={HeroSectionStyles.desktopH4}>
            Set up your account preferences & find new favorites
          </h4>
          <p>Get started below</p>
          <div className={HeroSectionStyles.signInOptionsDesktop}>
            <div className={HeroSectionStyles.buttons}>
              <Link href={"/signup"} className={HeroSectionStyles.link}>
                Sign up
              </Link>
              <Link href={"/signin"} className={HeroSectionStyles.link2}>
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={HeroSectionStyles.signInOptionsMobile}>
        <p>Get started below</p>
        <div className={HeroSectionStyles.buttons}>
          <Link href={"/signup"} className={HeroSectionStyles.link}>
            Sign up
          </Link>
          <Link href={"/signin"} className={HeroSectionStyles.link2}>
            Sign in
          </Link>
        </div>
      </div>
      <SousChef session={null} />
      <RandomMealButton session={null} />
    </>
  );
};
