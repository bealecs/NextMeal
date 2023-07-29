import Image from "next/image";
import { SimiliarRecipes } from "./SimilarRecipes";
import { Favorite } from "./Favorite";

//Leverages Spoonaculars random recipe API endpoint
export async function getRandomMeal() {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY}`,
    { cache: "no-cache" }
  );

  if (!res.ok) {
    throw new Error(
      "Oops... I wasn't able to grab a meal for you... Please try again"
    );
  }

  return res.json();
}

export const RandomMealButton = async () => {
  const data = await getRandomMeal();
  
  // regex function to remove html elements from the returned json response
  function removeTags(string: string) {
    return string
      .replace(/<[^>]*>/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  return (
    <div>
      {data.recipes.map((recipe) => {
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
            <button>Get a meal</button>
            <SimiliarRecipes mealId={destructuredRecipe.id} />
          </section>
        );
      })}
    </div>
  );
};
