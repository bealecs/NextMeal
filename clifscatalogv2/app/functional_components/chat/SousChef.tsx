"use client"
import React, { useContext, useState } from "react";
import Image from "next/image";
import SousChefStyles from "../../modular_css/SousChef.module.css";
import Chat from "./Chat";
import { ThemeContext } from "@/app/store/ThemeProvider";
import { Session } from "next-auth";

interface Props {
  session: Session | null;
}

const SousChef = (props:Props) => {
  const [showChat, setShowChat] = useState(false);
  const theme = useContext(ThemeContext);

  const handleClick = () => {
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
        <div className={props.session === null ? "container_light_souschef" : theme.themeValue+"_souschef"} id={SousChefStyles.chatBotDiv}>
          <div className={SousChefStyles.closeSectionDiv} id="closeSectionDiv">
            <button onClick={handleClick}>❌</button>
            <h3 style={{textAlign:'center', alignItems:'center'}}>My Sous-chef</h3>
          </div>
          <Chat />
        </div>
      )}
    </div>
  );
};

export default SousChef;
