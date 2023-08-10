"use client";
import NavigationStyles from "../modular_css/Navigation.module.css";
import "../globalStyles.css";
import Image from "next/image";
import { useState } from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { createPortal } from "react-dom";

interface Props {
  session: Session;
}
export const Navigation = (props: Props) => {
  const [showPreferences, setShowPreferences] = useState(false);

  return (
    <section className={NavigationStyles.container}>
      {props.session && props.session.user && (
        <>
          <div className={NavigationStyles.pushRight}>
            <h4>Welcome {props.session.user.name}</h4>
            <Image
              src="/avatar.svg"
              alt="stock avatar image signifying a user presence"
              width={80}
              height={80}
              className={NavigationStyles.avatar}
              onClick={() => setShowPreferences(!showPreferences)}
            />
          </div>
          {showPreferences && (
            <ul className={NavigationStyles.userOptionsList}>
              <li className={NavigationStyles.userOption}>User Preferences</li>
              <li className={NavigationStyles.userOption}>Value Here</li>
              <li className={NavigationStyles.userOption}>Value Here</li>
              <li
                className={NavigationStyles.userOption}
                onClick={() => signOut()}
              >
                Sign Out
              </li>
            </ul>
          )}
        </>
      )}
    </section>
  );
};
