import { useState } from "react";
import { getSimilarMeals } from "./getSimilarMeals";

interface Props {
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
    <>
      <h4>See similar recipes?</h4>
      <button onClick={getSimilarRecipes}>Show Recipes</button>
      {similarRecipes &&
        similarRecipes.map((recipe) => {
          interface DestructuredSimilarRecipe {
            id: number;
            title: string;
          }
          const simliarRecipe: DestructuredSimilarRecipe = recipe;
          return (
            <div key={simliarRecipe.id}>
              <h4>{simliarRecipe.title}</h4>
            </div>
          );
        })}
    </>
  );
};
