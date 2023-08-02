"use client";
import React, { useState } from "react";
import NavigationStyles from "../modular_css/Navigation.module.css";

const NavigationThemer = () => {
  //state for navbar icon theme toggle
  const [themeClicked, setThemeClicked] = useState(false);

  //click handler for changing navbar icon for theme toggle
  const handleToggle = () => {
    setThemeClicked(!themeClicked);
  };
  return (
    <button className={NavigationStyles.themer} onClick={handleToggle}>
      {themeClicked ? "⛅" : "🌛"}
    </button>
  );
};

export default NavigationThemer;
