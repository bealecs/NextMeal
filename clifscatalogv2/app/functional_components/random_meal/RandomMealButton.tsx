"use client"
import '../../globalStyles.css';
import RandomStyles from '../../modular_css/Random.module.css';
import Image from "next/image";
import { SimiliarRecipes } from "../similar_meal/SimilarRecipes";
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
  }
  
  // regex function to remove html elements from the returned json response
  function removeTags(string: string) {
    return string
      .replace(/<[^>]*>/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  return (
    <div className={RandomStyles.container}>
      <h2>Random Meal Selection</h2>
      {!newMeal && 
      <div className={RandomStyles.preMeal}>
        <p>Feeling hungry but not sure what you want to eat? We have got you covered! We have a broad selection of meals to choose from, all you need to do is simply click below.</p>
        <br />
        <p>See a recipe you want to try? Click show full info to see a list of all of the ingredients necessary, time to cook, step by step instructions, and more!</p>
        <br />
        <p>See a recipe you like, but would like to try another time? We have got you covered there too! Simply favorite the recipe to store it with the rest of those recipes that
          you are waiting to come back to
        </p>
        <br />
        <button onClick={getNewMeal}>Get new recipe</button>
      </div>}
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
          <Suspense fallback={<Loading />}>
          <div className={RandomStyles.populatedMealContainer}>
            <div className={RandomStyles.instructions}>
              <h3>{destructuredRecipe.title}</h3>
              <p>{removeTags(destructuredRecipe.summary)}</p>
            </div>
            <div className={RandomStyles.mealImage}>
              <p className={RandomStyles.warning}><span>Warning:</span> Double check ingredients of meals, your preferences will not effect the random suggestion.</p>
              <Image
                  src={destructuredRecipe.image}
                  width={400}
                  height={300}
                  alt={destructuredRecipe.summary}
                  style={{borderRadius: "1rem"}}
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
                <FullMealInfo mealId={destructuredRecipe.id} session={props.session} />
                <button onClick={getNewMeal}>Get new recipe</button>
              </div>
            </div>
          </div>
          <SimiliarRecipes mealId={destructuredRecipe.id} session={props.session}/>
          </Suspense>
          </section>
        );
      })}
      <div className={RandomStyles.backgroundImage}></div>
    </div>
  );
};
