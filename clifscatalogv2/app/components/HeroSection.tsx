"use client";
import Image from "next/image";
import Chat from "../functional_components/Chat";
import "../globalStyles.css";
import HeroSectionStyles from "../modular_css/HeroSection.module.css";
import { useState } from "react";

export const HeroSection = () => {
  const [showChat, setShowChat] = useState(false);

  const handleClick = () => {
    setShowChat(!showChat);
  };

  return (
    <main className={HeroSectionStyles.container}>
      {/* set a conditional here for whether the user is logged in or not for the hero message */}
      <Image
        src="/chef_kiss.svg"
        width={100}
        height={100}
        alt="something"
        onClick={handleClick}
        className={HeroSectionStyles.chatbotImage}
      />
      {showChat && <Chat />}
    </main>
  );
};
