import Image from "next/image";
import React from "react";
import { Session } from "next-auth";
import UserFavoritesDisplayStyles from "../../modular_css/UserFavoritesDisplay.module.css";
import { FullMealInfo } from "../full_meal_info/FullMealInfo";
import { getUserProfile } from "../user_profile/getUserProfile";

interface Props {
  session: Session;
}

export default async function UserFavoritesDisplay(props: Props) {
  const userProfile = await getUserProfile(
    props.session.user.id,
    props.session.user.accessToken
  );

  const [profile] = await Promise.all([userProfile]);

  const handleDelete = async (id: number, title: string) => {
    try {
      const res = await fetch(
        "https://next-meal-cookbook.vercel.app/api/deleteFavorite",
        {
          cache: "force-cache",
          method: "POST",
          body: JSON.stringify({
            id: id,
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }
    document.querySelector("#" + title).remove();
  };

  //checks the result from the user DB fetch call and filters out non unique values to only display favorited meals once (failsafe measure)
  const uniqueFavorites = profile[0].favorites.filter(
    (value, index, self) =>
      self.findIndex((t) => t.title === value.title) === index
  );

  return (
    <>
      {uniqueFavorites.length <= 3 && (
        <h2 className={UserFavoritesDisplayStyles.emptyFavorites}>
          It is looking a little empty here... Go favorite some meals
        </h2>
      )}
      <div className={UserFavoritesDisplayStyles.resultsContainer}>
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
              <div
                id={destructuredFavorite.title}
                key={destructuredFavorite.id}
              >
                <table className={UserFavoritesDisplayStyles.gridTable}>
                  <tbody>
                    <tr>
                      <td colSpan={2}>
                        <h4>{destructuredFavorite.title}</h4>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <Image
                          src={destructuredFavorite.image}
                          alt={destructuredFavorite.title}
                          width={200}
                          height={150}
                        />
                      </td>
                    </tr>
                    <tr>
                      <div
                        className={
                          UserFavoritesDisplayStyles.dashboardButtonsDiv
                        }
                      >
                        <td className={UserFavoritesDisplayStyles.showFullMeal}>
                          <FullMealInfo
                            textHolder="🛈"
                            mealId={destructuredFavorite.mealId}
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
                            onClick={() =>
                              handleDelete(
                                destructuredFavorite.id,
                                destructuredFavorite.title
                              )
                            }
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
