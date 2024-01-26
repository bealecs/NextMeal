"use client";
import "../../globalStyles.css";
import RandomStyles from "../../modular_css/Random.module.css";
import Image from "next/image";
import { Favorite } from "../favorite/Favorite";
import { Session } from "next-auth";
import { getRandomMeal } from "./getRandomMeal";
import { Suspense, useState } from "react";
import { Loading } from "../../suspense_fallback/Loading";
import { FullMealInfo } from "../full_meal_info/FullMealInfo";

interface Props {
  session: Session;
}

export const RandomMealButton = (props: Props) => {
  const [newMeal, setNewMeal] = useState(null);

  const getNewMeal = async () => {
    const data = await getRandomMeal();
    setNewMeal(data);
  };

  // regex function to remove html elements from the returned json response
  function removeTags(string: string) {
    return string
      .replace(/<[^>]*>/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  if (!newMeal) {
    getNewMeal();
  }

  return (
    <div className={RandomStyles.container}>
      <h2>Random Meal Selection</h2>
      <Suspense fallback={<Loading />}>
        {newMeal &&
          newMeal.recipes.map((recipe) => {
            //creating interface for destructuring the returned recipe object with variables that will be leveraged
            interface DestructuredRecipe {
              image: string;
              id: number;
              title: string;
              summary: string;
            }
            const destructuredRecipe: DestructuredRecipe = recipe;

            return (
              <section key={destructuredRecipe.id}>
                <div className={RandomStyles.populatedMealContainer}>
                  <div className={RandomStyles.instructions}>
                    <h3>{destructuredRecipe.title}</h3>
                    <p>{removeTags(destructuredRecipe.summary)}</p>
                  </div>
                  <div className={RandomStyles.mealImage}>
                    <p className={RandomStyles.warning}>
                      <span>Warning:</span> Double check ingredients of meals,
                      your preferences will not effect the random suggestion.
                    </p>
                    <Image
                      src={destructuredRecipe.image}
                      width={400}
                      height={300}
                      alt={destructuredRecipe.summary}
                      style={{ borderRadius: "2rem" }}
                    />
                    <div className={RandomStyles.mealButtonActions}>
                      <div className={RandomStyles.favoriteButton}>
                        <Favorite
                          session={props.session}
                          mealId={destructuredRecipe.id}
                          title={destructuredRecipe.title}
                          image={destructuredRecipe.image}
                        />
                      </div>
                      <FullMealInfo
                        textHolder="🛈"
                        mealId={destructuredRecipe.id}
                        session={props.session}
                      />
                      <button
                        onClick={getNewMeal}
                        className={RandomStyles.newMealButton}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        ↻
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        <div className={RandomStyles.backgroundImage}></div>
      </Suspense>
    </div>
  );
};
