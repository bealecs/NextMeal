"use client";
import React, { useContext } from "react";
import NavigationStyles from "../modular_css/Navigation.module.css";
import { ThemeContext } from "../store/ThemeProvider";

const NavigationThemer = () => {
  const theme = useContext(ThemeContext);
  
  return (
    <button className={NavigationStyles.themer} onClick={theme.onThemeChange}>
      {theme.themeValue === "container_dark" ? "⛅" : "🌛"}
    </button>
  );
};

export default NavigationThemer;
