"use client";
import Image from "next/image";
import Chat from "../functional_components/Chat";
import "../globalStyles.css";
import HeroSectionStyles from "../modular_css/HeroSection.module.css";
import { Suspense, useState } from "react";
import { Session } from "next-auth";
import SignIn from "../signin/page";
import { signOut } from "next-auth/react";
import UserFavoritesDisplay from "../functional_components/UserFavoritesDisplay";
import SousChef from "../functional_components/SousChef";

interface Props {
  session: Session;
}

export const HeroSection = (props: Props) => {

  return (
    <main className={HeroSectionStyles.container}>
      {props.session ? (
        <div>
          <h2>Welcome, {props.session.user.name}</h2>
          {/* <Suspense> */}

          <UserFavoritesDisplay session={props.session} />
          {/* </Suspense> */}
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <SignIn />
      )}
      <SousChef/>
    </main>
  );
};
