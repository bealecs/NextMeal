import SimilarStyles from "../../modular_css/Similar.module.css";
import { useState } from "react";
import { getSimilarMeals } from "./getSimilarMeals";
import { FullMealInfo } from "../full_meal_info/FullMealInfo";
import { Session } from "next-auth";

interface Props {
  session: Session;
  mealId: number;
}

export const SimiliarRecipes = (props: Props) => {
  const [similarRecipes, setSimilarRecipes] = useState(null);
  const [showSimilar, setShowSimilar] = useState(false);
  const mealID = props.mealId;

  const getSimilarRecipes = async () => {
    setSimilarRecipes(await getSimilarMeals(mealID));
    setShowSimilar(!showSimilar);
  };

  return (
    <div className={SimilarStyles.container}>
      <button onClick={getSimilarRecipes} className={SimilarStyles.showSimilar}>
        {showSimilar ? "Hide Similar Recipes" : "Show Similar Recipes"}
      </button>
      <div className={SimilarStyles.centeredResults}>
        {similarRecipes &&
          showSimilar &&
          similarRecipes.map((recipe) => {
            interface DestructuredSimilarRecipe {
              id: number;
              title: string;
            }
            const simliarRecipe: DestructuredSimilarRecipe = recipe;
            return (
              <div
                key={similarRecipes.id}
                className={SimilarStyles.individualResults}
              >
                <h4>{simliarRecipe.title}</h4>
                <FullMealInfo
                  mealId={simliarRecipe.id}
                  session={props.session}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
