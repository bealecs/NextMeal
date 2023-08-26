"use client";
import { Suspense, useState } from "react";
import "../globalStyles.css";
import SearchBarStyles from "../modular_css/SearchBar.module.css";
import Image from "next/image";
import PreferencesModal from "./ModalWrapper";
import { FullMealInfo } from "./FullMealInfo";
import { Session } from "next-auth";
import { Loading } from "../suspense_fallback/Loading";

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

  //within this component, I need to call getUserPreferences() with a suspense boundary
  //then I need to take the array of preferences, and sort out only the values that are true. 
  //Take the values that are true and append them to the search call (maybe even do this on the server for performance)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:3000/api/search/${searchQuery.trim().replace(" ", "+")}`
    );

    if (!res.ok) {
      console.log("There was an error");
    }
    const data = await res.json();
    setSearchResult(data.results);
    setOpenPreferences(!openPreferences);
    return data;
  };
  
  return (
    <section className={SearchBarStyles.container} id="search-recipes">
      <div className={SearchBarStyles.mainDiv}>
        <form className={SearchBarStyles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            autoCorrect="true"
            placeholder="Chicken salad"
            value={searchQuery}
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
                <FullMealInfo mealId={result.id} session={props.session}/>
              </Suspense>
            </div>
          ))}
          
          {searchResult != undefined && searchResult.length <= 0 &&
          <p>There were no recipes to match your search, please try again with a different dish</p>}
          </PreferencesModal>
      </div>
    </section>
  );
};
