import Image from "next/image";
import React from "react";
import { getUserFavorites } from "./getUserFavorites";
import { Session } from "next-auth";
import UserFavoritesDisplayStyles from '../modular_css/UserFavoritesDisplay.module.css';
import { FullMealInfo } from "./FullMealInfo";

interface Props {
  session: Session;
}

export default async function UserFavoritesDisplay(props: Props) {

  if (props.session && props.session.user) {
    const favorites = await getUserFavorites(
      props.session.user.id,
      props.session.user.accessToken
    );

    const handleDelete = async (id: number, title: string) => {
      try {
        const res = await fetch("http://localhost:3000/api/deleteFavorite", {
          method: "POST",
          body: JSON.stringify({
            id: id,
          }),
        });
      } catch (error) {
        console.log(error);
      }
      document.getElementById(title).remove();
    };
    
    //checks the result from the user DB fetch call and filters out non unique values to only display favorited meals once (failsafe measure)
    const uniqueFavorites = favorites[0].filter(
      (value, index, self) =>
        self.findIndex((t) => t.title === value.title) === index
    );

    return (
      <div>
        {uniqueFavorites &&
          uniqueFavorites.map((favorite) => {
            interface UserFavorites {
              id: number;
              title: string;
              image: string;
              mealId: number;
            }
            const destructuredFavorite: UserFavorites = favorite;

            return (
              <div id={destructuredFavorite.title} key={destructuredFavorite.id} className={UserFavoritesDisplayStyles.resultsContainer}>
                <div className={UserFavoritesDisplayStyles.individualResult}>
                  <h3>{destructuredFavorite.title}</h3>
                  <Image
                    src={destructuredFavorite.image}
                    alt={destructuredFavorite.title}
                    width={200}
                    height={200}
                  />
                  <FullMealInfo mealId={destructuredFavorite.mealId} session={props.session}/>
                  <button onClick={() => handleDelete(destructuredFavorite.id, destructuredFavorite.title)}>
                    Remove Favorite
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
