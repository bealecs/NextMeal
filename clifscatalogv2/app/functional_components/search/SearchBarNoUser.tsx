"use client";
import { Suspense, useState } from "react";
import "../../globalStyles.css";
import SearchBarStyles from "../../modular_css/SearchBar.module.css";
import Image from "next/image";
import PreferencesModal from "../../store/SearchModalWrapper";
import { FullMealInfo } from "../full_meal_info/FullMealInfo";
import { Session } from "next-auth";
import { Loading } from "../../suspense_fallback/Loading";

type StateResult = [
  {
    id: number;
    title: string;
    image: string;
  }
];
interface Props {
  session: Session | null;
}

export const SearchBar = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<StateResult>();
  const [openPreferences, setOpenPreferences] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(searchQuery) {
    const res = await fetch(`https://next-meal-cookbook.vercel.app/api/search/${searchQuery.trim().replace(" ", "+")}`);

    if (!res.ok) {
      console.log("There was an error");
    }
    const data = await res.json();
    setSearchResult(data.results);
    setOpenPreferences(!openPreferences);
    setSearchQuery("");
    return data;
  }
}
  return (
    <section className={SearchBarStyles.container} id="search-recipes">
      <div className="container_light" id={SearchBarStyles.mainDiv}>
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
          <>
            <br />
            <p>No results found</p>
            <br/>
            <p>Please try another dish</p>
            <br />
          </>}
          </PreferencesModal>
      </div>
    </section>
  );
};
