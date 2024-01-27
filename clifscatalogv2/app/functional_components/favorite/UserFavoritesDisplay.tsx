import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Session } from "next-auth";
import UserFavoritesDisplayStyles from "../../modular_css/UserFavoritesDisplay.module.css";
import { FullMealInfo } from "../full_meal_info/FullMealInfo";

interface Props {
  session: Session;
}

async function getUserProfile(userId: number, accessToken: string) {
  const favoritesResponse = await fetch(
    `https://next-meal-cookbook.vercel.app/api/user/${userId}`,
    {
      headers: {
        Authorization: `${accessToken}`,
      },
    }
  );

  if (!favoritesResponse.ok) {
    throw new Error("Failed to fetch your current favorite recipes.");
  }

  return favoritesResponse.json();
}

export default function UserFavoritesDisplay(props: Props) {
  const [uniqueFavorites, setUniqueFavorites] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userProfile = await getUserProfile(
          props.session.user.id,
          props.session.user.accessToken
        );
        const favorites = userProfile[0]?.favorites || [];
        const uniqueFavorites = favorites.filter(
          (value, index, self) => self.findIndex((t) => t.title === value.title) === index
        );
        setUniqueFavorites(uniqueFavorites);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [props.session]);

  const handleDelete = async (id: number, title: string) => {
    try {
      // perform deletion logic here
    } catch (error) {
      console.log(error);
    }

    // update state or handle removal in a way that doesn't directly manipulate the DOM
  };

  return (
    <>
      {uniqueFavorites.length <= 3 && (
        <h2 className={UserFavoritesDisplayStyles.emptyFavorites}>
          It is looking a little empty here... Go favorite some meals
        </h2>
      )}
      <div className={UserFavoritesDisplayStyles.resultsContainer}>
        {uniqueFavorites.map((favorite) => {
          return (
            <div id={favorite.title} key={favorite.id}>
              <table className={UserFavoritesDisplayStyles.gridTable}>
                <tbody>
                  <tr>
                    <td colSpan={2}>
                      <h4>{favorite.title}</h4>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <Image
                        src={favorite.image}
                        alt={favorite.title}
                        width={200}
                        height={150}
                      />
                    </td>
                  </tr>
                  <tr>
                    <div className={UserFavoritesDisplayStyles.dashboardButtonsDiv}>
                      <td className={UserFavoritesDisplayStyles.showFullMeal}>
                        <FullMealInfo
                          textHolder="🛈"
                          mealId={favorite.mealId}
                          session={props.session}
                        />
                      </td>
                      <td className={UserFavoritesDisplayStyles.removeMeal}>
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            fontSize: "2rem",
                          }}
                          onClick={() => handleDelete(favorite.id, favorite.title)}
                        >
                          ❌
                        </button>
                      </td>
                    </div>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </>
  );
}
