"use client"
import React, { useState } from "react";
import Image from "next/image";
import SousChefStyles from "../modular_css/SousChef.module.css";
import Chat from "./Chat";

const SousChef = () => {
  const [showChat, setShowChat] = useState(false);

  const handleClick = () => {
    console.log("here");
    setShowChat(!showChat);
  };

  return (
    <div>
      {!showChat && (
        <Image
          src="/chef_kiss.svg"
          width={100}
          height={100}
          alt="emoji of a chef"
          onClick={handleClick}
          className={SousChefStyles.chatbotImage}
        />
      )}
      {showChat && (
        <div className={SousChefStyles.chatbotDiv}>
          <div className={SousChefStyles.closeSectionDiv}>
            <button onClick={handleClick}>❌</button>
            <h3>My Sous-chef</h3>
          </div>
          <Chat />
        </div>
      )}
    </div>
  );
};

export default SousChef;
