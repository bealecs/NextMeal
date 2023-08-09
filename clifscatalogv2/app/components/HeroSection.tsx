"use client"
import HeroSectionStyles from "../modular_css/HeroSection.module.css";
import { Session } from "next-auth";
import SignIn from "../signin/page";
import { signOut } from "next-auth/react";
import UserFavoritesDisplay from "../functional_components/UserFavoritesDisplay";
import SousChef from "../functional_components/SousChef";
import "../globalStyles.css";
import { Suspense, useContext } from "react";
import { ThemeContext } from "../store/ThemeProvider";

interface Props {
  session: Session;
}

export const HeroSection = (props: Props) => {

  // const theme = useContext(ThemeContext);

  return (
    <main className={HeroSectionStyles.container}>
      {props.session ? (
        <div>
          <h2>Welcome, {props.session.user.name}</h2>
          <Suspense>
          <UserFavoritesDisplay session={props.session} />
          </Suspense>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <SignIn />
      )}
      <SousChef />
    </main>
  );
};
