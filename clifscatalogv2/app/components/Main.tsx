"use client"
import '../globalStyles.css';
import MainStyles from '../modular_css/Main.module.css';
import { Session } from "next-auth";
import { Suspense, useContext, useState } from "react";
import UserFavoritesDisplay from "../functional_components/favorite/UserFavoritesDisplay";
import { RandomMealButton } from "../functional_components/random_meal/RandomMealButton";
import { Loading } from '../suspense_fallback/Loading';
import { ThemeContext } from '../store/ThemeProvider';

interface Props {
  session: Session;
}

export const Main = (props: Props) => {
  const [clicked, setClicked] = useState("userFavorites");
  
  const theme = useContext(ThemeContext);

  const handleClick = (event) => {
    setClicked(event.target.value);
  }

  const renderSelectedComponent = () => {
    switch(clicked) {
      case 'userFavorites':
        return (
          <Suspense fallback={<Loading />}>
            <UserFavoritesDisplay session={props.session} />
          </Suspense>
        );
      case 'randomMeal':
        return <RandomMealButton session={props.session}/>
    }
  }
  return (
    <main className={theme.themeValue}>
      <div className={MainStyles.currentView}>Current View:
      {/* User is on the user favorites display */}
      {clicked === "userFavorites" && (
        <select value={clicked} placeholder={'My Favorites'} onChange={handleClick}>
          <option value={"userFavorites"}>My Favorites</option>
          <option value={"randomMeal"}>Random Meal Selector</option>
        </select>)}

      {/* User is on the random meal display */}
      {clicked === "randomMeal" && (
        <select value={clicked} placeholder={'Random Meal Selector'} onChange={handleClick}>
          <option value={"userFavorites"}>My Favorites</option>
          <option value={"randomMeal"}>Random Meal Selector</option>
        </select>)}
      </div>
      {renderSelectedComponent()}
    </main>
  );
};
