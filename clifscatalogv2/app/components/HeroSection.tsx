"use client"
import HeroSectionStyles from "../modular_css/HeroSection.module.css";
import { Session } from "next-auth";
import SignIn from "../signin/page";
import UserFavoritesDisplay from "../functional_components/UserFavoritesDisplay";
import SousChef from "../functional_components/SousChef";
import "../globalStyles.css";
import { Suspense, useContext } from "react";
import { ThemeContext } from "../store/ThemeProvider";

interface Props {
  session: Session;
}

export const HeroSection = (props: Props) => {
  
  const themeContext = useContext(ThemeContext);
  const actualTheme = themeContext.themeValue.toString();
  
  return (
    <Suspense>
    <main id="main-container" className={actualTheme}>
      {props.session ? (
          <UserFavoritesDisplay session={props.session} />
      ) : (
        <SignIn />
      )}
      <SousChef />
    </main>
    </Suspense>
  );
};
