"use client"
import '../globalStyles.css';
import MainStyles from '../modular_css/Main.module.css';
import { Session } from "next-auth";
import SousChef from "../functional_components/SousChef";
import { Suspense, useState } from "react";
import UserFavoritesDisplay from "../functional_components/UserFavoritesDisplay";
import { RandomMealButton } from "../functional_components/RandomMealButton";
import { Loading } from '../suspense_fallback/Loading';
import { SearchBar } from '../functional_components/SearchBar';

interface Props {
  session: Session;
}

export const Main = (props: Props) => {
  const [clicked, setClicked] = useState(false);
  
  const handleClick = () => {
    setClicked(!clicked)
  }

  return (
    <main className={MainStyles.container}>
      {!clicked ? (
        <>
          <SearchBar />
          <div>
            <button onClick={handleClick}>View Random Suggestion</button>
          </div>
          <Suspense fallback={<Loading />}>
            <UserFavoritesDisplay session={props.session} />
          </Suspense>
          <SousChef />
        </>
      ) : (
        <>
          <SearchBar />
          <div>
            <button onClick={handleClick}>View My Favorites</button>
          </div>
          <RandomMealButton session={props.session} />
          <SousChef />
        </>
      )}
    </main>
  );
};
