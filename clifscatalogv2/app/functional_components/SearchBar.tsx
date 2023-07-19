"use client";
import { useState } from "react";
import "../globalStyles.css";
import SearchBarStyles from "../modular_css/SearchBar.module.css";

export const SearchBar = async () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/search/${searchQuery}`);
    console.log(res.json())
    return res.json();
  };

  return (
    <section className={SearchBarStyles.container} id="search-recipes">
      <div className={SearchBarStyles.mainDiv}>
        <h2>Search for your favorite meals here</h2>
        <form className={SearchBarStyles.form} onSubmit={handleSubmit}>
          <input
            type="text"
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
      </div>
    </section>
  );
};
