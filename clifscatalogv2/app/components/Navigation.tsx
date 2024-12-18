"use client";
import NavigationStyles from "../modular_css/Navigation.module.css";
import "../globalStyles.css";
import Image from "next/image";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { SearchBar } from "../functional_components/search/SearchBar";
import { Loading } from "../suspense_fallback/Loading";
import { ThemeContext } from "../store/ThemeProvider";

interface Props {
  session: Session | null;
}
export const Navigation = (props: Props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [openPreferences, setOpenPreferences] = useState(false);
  const optionsRef = useRef(null); //ref for options menu
  const preferencesRef = useRef(null); //ref for preferences menu
  const [checked, setChecked] = useState({
    theme: false,
    noDairy: false,
    nutAllergy: false,
    fishAllergy: false,
    vegan: false,
    vegetarian: false,
    noRedMeat: false,
    noPork: false,
  });

  const theme = useContext(ThemeContext);

  const handleFormChange = (event) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    });
  };

  const handleOutsideClick = (event) => {
    // Close the options menu if the click is outside the menu
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setShowOptions(false);
    }
    // Close the preferences menu if the click is outside the menu
    if (
      preferencesRef.current &&
      !preferencesRef.current.contains(event.target)
    ) {
      setOpenPreferences(false);
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleClose = () => {
    setShowOptions(false);
    setOpenPreferences(false);
  };
  const handlePreferencesSubmission = async () => {
    const res = await fetch(
      "https://next-meal-cookbook.vercel.app/api/user/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: props.session.user.id,
          checked: checked,
        }),
      }
    );

    return await res.json();
  };
  return (
    <section
      className={theme.themeValue + "_navbar"}
      id={NavigationStyles.navbar}
    >
      {props.session && props.session.user && (
        <div className={NavigationStyles.stylingContainer}>
          <div className={NavigationStyles.keepLeft}>
            <h2>Welcome, {props.session.user.name}</h2>
            <Image
              src="/avatar.svg"
              alt="stock avatar image signifying a user presence"
              width={50}
              height={50}
              className={NavigationStyles.avatar}
              onClick={() => {
                setOpenPreferences(false);
                setShowOptions(!showOptions);
              }}
            />
          </div>

          {showOptions && (
            <ul
              ref={optionsRef}
              className={theme.themeValue + "_userOptions"}
              id={NavigationStyles.userOptionsList}
            >
              <button
                className={NavigationStyles.closeButton}
                onClick={handleClose}
              >
                ❌
              </button>
              <li
                className={NavigationStyles.userOption}
                onClick={() => {
                  setOpenPreferences(!openPreferences);
                  setShowOptions(!showOptions);
                }}
              >
                User Preferences
              </li>
              <li
                className={NavigationStyles.userOption}
                onClick={() => signOut()}
              >
                Sign Out
              </li>
            </ul>
          )}
          {openPreferences && (
            <form
              ref={preferencesRef}
              onSubmit={handlePreferencesSubmission}
              className={theme.themeValue + "_preferences"}
              id={NavigationStyles.userPreferenceList}
            >
              <button
                className={NavigationStyles.closeButton}
                onClick={handleClose}
              >
                ❌
              </button>
              <div className={NavigationStyles.checkboxDiv}>
                <input
                  type="checkbox"
                  id="preference1"
                  name="theme"
                  checked={checked.theme}
                  className={NavigationStyles.inputCheckbox}
                  onChange={handleFormChange}
                />
                <label className="preferenceLabel" htmlFor="preference1">Dark Mode</label>
              </div>
              <div className={NavigationStyles.checkboxDiv}>
                <input
                  type="checkbox"
                  id="preference2"
                  name="noDairy"
                  checked={checked.noDairy}
                  className={NavigationStyles.inputCheckbox}
                  onChange={handleFormChange}
                />
                <label className="preferenceLabel" htmlFor="preference2">No Dairy</label>
              </div>
              <div className={NavigationStyles.checkboxDiv}>
                <input
                  type="checkbox"
                  id="preference3"
                  title="Nut Allergy"
                  name="nutAllergy"
                  checked={checked.nutAllergy}
                  className={NavigationStyles.inputCheckbox}
                  onChange={handleFormChange}
                />
                <label className="preferenceLabel" htmlFor="preference3">Nut Allergy</label>
              </div>
              <div className={NavigationStyles.checkboxDiv}>
                <input
                  type="checkbox"
                  id="preference4"
                  name="fishAllergy"
                  checked={checked.fishAllergy}
                  className={NavigationStyles.inputCheckbox}
                  onChange={handleFormChange}
                />
                <label className="preferenceLabel" htmlFor="preference4">Fish Allergy</label>
              </div>
              <div className={NavigationStyles.checkboxDiv}>
                <input
                  type="checkbox"
                  id="preference5"
                  name="vegan"
                  checked={checked.vegan}
                  className={NavigationStyles.inputCheckbox}
                  onChange={handleFormChange}
                />
                <label className="preferenceLabel" htmlFor="preference5">Vegan</label>
              </div>
              <div className={NavigationStyles.checkboxDiv}>
                <input
                  type="checkbox"
                  id="preference6"
                  name="vegetarian"
                  checked={checked.vegetarian}
                  className={NavigationStyles.inputCheckbox}
                  onChange={handleFormChange}
                />
                <label className="preferenceLabel" htmlFor="preference6">Vegetarian</label>
              </div>
              <div className={NavigationStyles.checkboxDiv}>
                <input
                  type="checkbox"
                  id="preference7"
                  name="noRedMeat"
                  checked={checked.noRedMeat}
                  className={NavigationStyles.inputCheckbox}
                  onChange={handleFormChange}
                />
                <label className="preferenceLabel" htmlFor="preference7">No Red Meat</label>
              </div>
              <div className={NavigationStyles.checkboxDiv}>
                <input
                  type="checkbox"
                  id="preference8"
                  name="noPork"
                  checked={checked.noPork}
                  className={NavigationStyles.inputCheckbox}
                  onChange={handleFormChange}
                />
                <label className="preferenceLabel" htmlFor="preference8">No Pork</label>
              </div>
              <button
                className={NavigationStyles.submitPreferences}
                type="submit"
              >
                ✓
              </button>
            </form>
          )}
          <div className={NavigationStyles.pushRight}>
            <Suspense fallback={<Loading />}>
              <SearchBar session={props.session} />
            </Suspense>
          </div>
        </div>
      )}
    </section>
  );
};
