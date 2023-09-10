"use client";
import { Session } from "next-auth";
import React, { createContext, useState } from "react";
import { getUserProfile } from "../functional_components/user_profile/getUserProfile";
// import { getUserPreferences } from "../functional_components/getUserPreferences";

type Ctx = {
  themeValue: string;
  // onThemeChange: () => void;
};

type Props = {
  session: Session;
  children: React.ReactNode;
};

export const ThemeContext = createContext<Ctx>({
  themeValue: "container_dark",
  // onThemeChange: () => {},
});

const ThemeContextProvider = async (props: Props) => {
  // const [theme, setTheme] = useState("container_dark");

    if(props.session && props.session.user) {
      const userProfile = await getUserProfile(props.session.user.id, props.session.user.accessToken);
      const themePreference = userProfile[0].preferences[0].theme === true ? "container_dark" : "container_light";
      const ctxValue: Ctx = {
        themeValue: themePreference,
        // onThemeChange: onThemeChange,
      };
      
      return (
        <ThemeContext.Provider value={ctxValue}>
          {props.children}
        </ThemeContext.Provider>
      );
    } else {
      const ctxValue: Ctx = {
        themeValue: "container_dark"
      };
    
      return (
        <ThemeContext.Provider value={ctxValue}>
          {props.children}
        </ThemeContext.Provider>
      );
    }
  }
  
  // const onThemeChange = () => {
  //   if (theme == 'container_dark') {
  //     console.log("clicked")
  //     setTheme("container_light");
  //   } else {
  //     console.log("clicked x2")
  //     setTheme("container_dark");
  //   }
  // };

  

export default ThemeContextProvider;
