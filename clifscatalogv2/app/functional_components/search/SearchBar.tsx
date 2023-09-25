"use client";
import { Suspense, useContext, useState } from "react";
import "../../globalStyles.css";
import SearchBarStyles from "../../modular_css/SearchBar.module.css";
import Image from "next/image";
import PreferencesModal from "../../store/SearchModalWrapper";
import { FullMealInfo } from "../full_meal_info/FullMealInfo";
import { Session } from "next-auth";
import { Loading } from "../../suspense_fallback/Loading";
import { getUserProfile } from "../user_profile/getUserProfile";
import { ThemeContext } from "@/app/store/ThemeProvider";

type StateResult = [
  {
    id: number;
    title: string;
    image: string;
  }
];
interface Props {
  session: Session;
}

export const SearchBar = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<StateResult>();
  const [openPreferences, setOpenPreferences] = useState(false);
  const [ignorePreferences, setIgnorePreferences] = useState("");
  const theme = useContext(ThemeContext);

  const ignoreUserPreferences = () => {
    if(ignorePreferences === "") {
      setIgnorePreferences("ignore");
    } else {
      setIgnorePreferences("");
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    //grab user profile
    const preferences = await getUserProfile(props.session.user.id, props.session.user.accessToken);

    //grabs the user preferences and extracts only the values that have been selected as a preference (truthy value)
    const excludeIngredients = [];
    const dietPreference = [];
    const selectedPreferences = preferences[0].preferences.forEach((preference) => {
      for (const [key, value] of Object.entries(preference)) {
        if (value === true) {
          switch(key) {
            case 'noDairy':
              excludeIngredients.push("dairy");
            break;
            case 'nutAllergy':
              excludeIngredients.push("nuts");
            break;
            case 'fishAllergy':
              excludeIngredients.push("fish");
            break;
            case 'noRedMeat':
              excludeIngredients.push("red_meat");
            break;
            case 'noPork':
              excludeIngredients.push("pork");
            break;
            case 'vegetarian':
              dietPreference.push("vegetarian");
            break;
            case 'vegan':
              dietPreference.push("vegan");
            break;
          }
        }
      }
    });
    
    const searchAPIExcludeIngredients = excludeIngredients.join(',');
    const searchAPIDietPreferences = dietPreference.join(",");
    if(searchQuery && ignorePreferences != "ignore") {
    const res = await fetch(
      `http://localhost:3000/api/search/${searchQuery.trim().replace(" ", "+")}`,
      {
        headers: {
          "exclude": searchAPIExcludeIngredients,
          "diet": searchAPIDietPreferences,
        }
      }
    );

    if (!res.ok) {
      console.log("There was an error");
    }
    const data = await res.json();
    setSearchResult(data.results);
    setOpenPreferences(!openPreferences);
    return data;
  } else if(searchQuery && ignorePreferences) {
    const res = await fetch(`http://localhost:3000/api/search/${searchQuery.trim().replace(" ", "+")}`,);

    if (!res.ok) {
      console.log("There was an error");
    }
    const data = await res.json();
    setSearchResult(data.results);
    setOpenPreferences(!openPreferences);
    return data;
  }
};
  
  return (
    <section className={SearchBarStyles.container} id="search-recipes">
      <div className={theme.themeValue} id={SearchBarStyles.mainDiv}>
        <form className={SearchBarStyles.form} onSubmit={handleSubmit}>
          <div style={{display:'block',margin:'0.5rem 1rem', padding:'0 1rem'}}>
            <label htmlFor="ignorePreferences">Ignore Preferences</label>
            <input style={{marginLeft:'1rem',alignContent:'center'}} type="checkbox" id="ignorePreferences" value={ignorePreferences} onClick={ignoreUserPreferences}/>
          </div>
          <input
            type="text"
            autoCorrect="true"
            placeholder="Chicken salad"
            value={searchQuery}
            minLength={3}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className={SearchBarStyles.searchBar}
          />
          <button type="submit" className={SearchBarStyles.button}>
            Find Meal
          </button>
        </form>
        <PreferencesModal
            title="Search Results"
            isOpened={openPreferences}
            onClose={() => setOpenPreferences(false)}>
        {searchResult &&
          searchResult.map((result) => (
            <div key={result.id}>
              <h4>{result.title}</h4>
              <Image
                src={result.image}
                alt={result.title}
                width={100}
                height={100}
              />
              <Suspense fallback={<Loading />}>
                <FullMealInfo mealId={result.id} session={props.session} />
              </Suspense>
            </div>
          ))}
          
          {searchResult != undefined && searchResult.length <= 0 &&
          <>
            <p>No results found</p>
            <p>Please try another dish</p>
          </>}
          </PreferencesModal>
      </div>
    </section>
  );
};
