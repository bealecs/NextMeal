"use client"
import Image from "next/image";
import { SimiliarRecipes } from "./SimilarRecipes";
import { Favorite } from "./Favorite";
import { Session } from "next-auth";
import { getRandomMeal } from "./getRandomMeal";
import { Suspense, useState } from "react";
import { Loading } from "../suspense_fallback/Loading";
import { FullMealInfo } from "./FullMealInfo";

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
    <div>
      {!newMeal && 
      <>
        <p>Feeling hungry but not sure what you want to eat? We have got you covered! We have a broad selection of meals to choose from, all you need to do is simply click below.</p>
        <p>See a recipe you want to try? Click show full info to see a list of all of the ingredients necessary, time to cook, step by step instructions, and more!</p>
        <p>See a recipe you like, but would like to try another time? We have got you covered there too! Simply favorite the recipe to store it with the rest of those recipes that
          you are waiting to come back to
        </p>
        <button onClick={getNewMeal}>Get new recipe</button>
      </>}
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
            <h3>{destructuredRecipe.title}</h3>
            <p>{removeTags(destructuredRecipe.summary)}</p>
            <Favorite
              session={props.session}
              mealId={destructuredRecipe.id}
              title={destructuredRecipe.title}
              image={destructuredRecipe.image}
            />
            <Image
              src={destructuredRecipe.image}
              width={300}
              height={300}
              alt={destructuredRecipe.summary}
              style={{ marginTop: "2rem", borderRadius: "1rem" }}
            />
            <Suspense fallback={<Loading />}>
              <FullMealInfo mealId={destructuredRecipe.id} session={props.session} />
            </Suspense>
            <button onClick={getNewMeal}>Get new recipe</button>
            <SimiliarRecipes mealId={destructuredRecipe.id} session={props.session}/>
          </section>
        );
      })}
    </div>
  );
};
