"use client"
import Image from "next/image";
import { SimiliarRecipes } from "./SimilarRecipes";
import { Favorite } from "./Favorite";
import { Session } from "next-auth";
import { getRandomMeal } from "./getRandomMeal";
import { useState } from "react";

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
      <button onClick={getNewMeal}>Get fresh meal</button>
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
            <SimiliarRecipes mealId={destructuredRecipe.id} />
          </section>
        );
      })}
    </div>
  );
};
