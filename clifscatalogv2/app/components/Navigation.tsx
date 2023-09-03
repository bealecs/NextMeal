"use client";
import NavigationStyles from "../modular_css/Navigation.module.css";
import "../globalStyles.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import PreferencesModal from "../store/SearchModalWrapper";
import { SearchBar } from "../functional_components/search/SearchBar";


interface Props {
  session: Session;
}
export const Navigation = (props: Props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [openPreferences, setOpenPreferences] = useState(false);
  const optionsRef = useRef(null); //ref for options menu
  const [checked, setChecked] = useState({
      theme: false,
      noDairy: false,
      nutAllergy: false,
      fishAllergy: false,
      vegan: false,
      vegetarian: false,
      noRedMeat: false,
      noPork: false,
      dieting: false,
  });

  const handleFormChange = (event) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    })
  }

  const handleOutsideClick = (event) => {
    // Close the options menu if the click is outside the menu
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handlePreferencesSubmission = async () => {
    const res = await fetch("http://localhost:3000/api/user/preferences", {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: props.session.user.id,
        checked: checked
      })
    })

    return await res.json();
  }
  return (
    <section className={NavigationStyles.container}>
      {props.session && props.session.user && (
        <>
          <SearchBar session={props.session}/>
          <div className={NavigationStyles.pushRight}>
            <h4>Welcome {props.session.user.name}</h4>
            <Image
              src="/avatar.svg"
              alt="stock avatar image signifying a user presence"
              width={80}
              height={80}
              className={NavigationStyles.avatar}
              onClick={() => setShowOptions(!showOptions)}
            />
          </div>
          
          {showOptions && (
            <ul ref={optionsRef} className={NavigationStyles.userOptionsList}>
              <li className={NavigationStyles.userOption} onClick={() => {
                setOpenPreferences(!openPreferences)
                setShowOptions(!showOptions)}}>User Preferences</li>
              <li
                className={NavigationStyles.userOption}
                onClick={() => signOut()}
              >
                Sign Out
              </li>
            </ul>
          )}
          <PreferencesModal
              title="User Preferences"
              isOpened={openPreferences}
              onClose={() => setOpenPreferences(false)}
            >
              <form onSubmit={handlePreferencesSubmission}>
                <label htmlFor="preference1">Theme: Light</label>
                <input type="checkbox" id="preference1" name="theme" checked={checked.theme} onChange={handleFormChange}/>
                <label htmlFor="preference2">No Dairy</label>
                <input type="checkbox" id="preference2" name="noDairy" checked={checked.noDairy} onChange={handleFormChange}/>
                <label htmlFor="preference3">Nut Allergy</label>
                <input type="checkbox" id="preference3" name="nutAllergy" checked={checked.nutAllergy} onChange={handleFormChange}/>
                <label htmlFor="preference4">Fish Allergy</label>
                <input type="checkbox"id=" preference4" name="fishAllergy" checked={checked.fishAllergy} onChange={handleFormChange}/>
                <label htmlFor="preference5">Vegan</label>
                <input type="checkbox" id="preference5" name="vegan" checked={checked.vegan} onChange={handleFormChange}/>
                <label htmlFor="preference6">Vegetarian</label>
                <input type="checkbox" id="preference6" name="vegetarian" checked={checked.vegetarian} onChange={handleFormChange}/>
                <label htmlFor="preference7">No Red Meat</label>
                <input type="checkbox" id="preference7" name="noRedMeat" checked={checked.noRedMeat} onChange={handleFormChange}/>
                <label htmlFor="preference8">No Pork</label>
                <input type="checkbox" id="preference8" name="noPork" checked={checked.noPork} onChange={handleFormChange}/>
                <label htmlFor="preference9">Dieting</label>
                <input type="checkbox" id="preference9" name="dieting" checked={checked.dieting} onChange={handleFormChange}/>
                <button type="submit">Submit Preferences</button>
              </form>
            </PreferencesModal>
        </>
      )}
    </section>
  );
};
