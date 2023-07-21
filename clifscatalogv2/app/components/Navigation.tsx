"use client";
import Image from "next/image";
import NavigationStyles from "../modular_css/Navigation.module.css";
import "../globalStyles.css";
import { useState } from "react";
import Link from "next/link";
import { SignIn } from "../functional_components/SignIn";

export const Navigation = () => {
  //state for navbar icon theme toggle
  const [themeClicked, setThemeClicked] = useState(false);

  //click handler for changing navbar icon for theme toggle
  const handleToggle = () => {
    setThemeClicked(!themeClicked);
    console.log(themeClicked);
  };

  return (
    <section className={NavigationStyles.container}>
      <div className={NavigationStyles.imageDiv}>
        <Image
          width={80}
          height={80}
          style={{ borderRadius: "50%" }}
          alt="Clif Catalog logo"
          src="/logo.svg"
        />
      </div>
      <ul>
        <li className={NavigationStyles.navItem}>
          <Link href="#">Pick For Me</Link>
        </li>
        <li className={NavigationStyles.navItem}>
          <Link href="#">My Sous-chef</Link>
        </li>
        <li className={NavigationStyles.navItem}>
          <Link href="/#">My Favorites</Link>
        </li>
        <li className={NavigationStyles.navItem}>
          <Link href="#search-recipes">Search Recipes</Link>
        </li>
        <li className={NavigationStyles.navItem}>
          <SignIn />
        </li>
        <button className={NavigationStyles.themer} onClick={handleToggle}>
          {themeClicked ? "⛅" : "🌛"}
        </button>
      </ul>
    </section>
  );
};
