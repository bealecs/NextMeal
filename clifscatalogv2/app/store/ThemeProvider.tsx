"use client";
import React, { createContext, useState } from "react";

type Ctx = {
  themeValue: string;
  onThemeChange: () => void;
};

type Props = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<Ctx>({
  themeValue: "container_dark",
  onThemeChange: () => {},
});

const ThemeContextProvider = (props: Props) => {
  const [theme, setTheme] = useState("container_dark");

  const onThemeChange = () => {
    if (theme == 'container_dark') {
      console.log("clicked")
      setTheme("container_light");
    } else {
      console.log("clicked x2")
      setTheme("container_dark");
    }
  };

  const ctxValue: Ctx = {
    themeValue: theme,
    onThemeChange: onThemeChange,
  };

  return (
    <ThemeContext.Provider value={ctxValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
