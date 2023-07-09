import Image from "next/image";

//Leverages Spoonaculars random recipe API endpoint
async function getRandomMeal() {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY}`,
    { next: { revalidate: 300 } }
  ); //revalidates cache every 5 mins (300s)

  if (!res.ok) {
    throw new Error(
      "Oops... I wasn't able to grab a meal for you... Please try again"
    );
  }

  return res.json();
}

//This is going to be the component for the random meal generator
export default async function RandomMealGenerator() {
  const data = await getRandomMeal();

  return data.recipes.map((recipe) => {
  const { image, id, title, summary, /*spoonacularSourceUrl*/ } = recipe;

    return (
      <section key={id}>
        <h3>{title}</h3>
        <Image src={image} width={200} height={200} alt={summary} />
      </section>
    );
  });
}
