"use client";
import Image from "next/image";
import Chat from "../functional_components/Chat";
import "../globalStyles.css";
import HeroSectionStyles from "../modular_css/HeroSection.module.css";
import { useState } from "react";
import { Session } from "next-auth";
import SignIn from "../signin/page";
import { signOut } from "next-auth/react";
import UserFavoritesDisplay from "../functional_components/UserFavoritesDisplay";

interface Props {
  session: Session;
}

export const HeroSection = (props: Props) => {
  const [showChat, setShowChat] = useState(false);

  const handleClick = () => {
    setShowChat(!showChat);
  };

  return (
    <main className={HeroSectionStyles.container}>
      {props.session ? (
        <div>
          <h2>Welcome, {props.session.user.name}</h2>
          <UserFavoritesDisplay session={props.session} />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <SignIn />
      )}
      {!showChat && (
        <Image
          src="/chef_kiss.svg"
          width={100}
          height={100}
          alt="something"
          onClick={handleClick}
          className={HeroSectionStyles.chatbotImage}
        />
      )}
      {showChat && (
        <div className={HeroSectionStyles.chatbotDiv}>
          <div className={HeroSectionStyles.closeSectionDiv}>
            <button onClick={handleClick}>❌</button>
            <h3>My Sous-chef</h3>
          </div>
          <Chat />
        </div>
      )}
    </main>
  );
};
