"use client"
import Image from "next/image"
import NavigationStyles from '../modular_css/Navigation.module.css';
import '../globalStyles.css';
import { useState } from "react";

export const Navigation = () => {
    //state for navbar icon theme toggle
    const [themeClicked, setThemeClicked] = useState(false);

    //click handler for changing navbar icon for theme toggle
    const handleToggle = () => {
        setThemeClicked(!themeClicked);
        console.log(themeClicked);
    }

    return (
        <section className={NavigationStyles.container}>
            <div className={NavigationStyles.imageDiv}>
                <Image width={80} height={80} alt="Clif Catalog logo" src="/next.svg"/>
            </div>
            <ul>
                <li>Pick For Me</li>
                <li>My Sous-chef</li>
                <li>My favorites</li>
                <li>Something Here</li>
                <li>Sign Up/In</li>
                <button className={NavigationStyles.themer} onClick={handleToggle}>{themeClicked ? "⛅" : "🌛"}</button>
            </ul>
        </section>
    )
}