import Image from "next/image";

//Leverages Spoonaculars random recipe API endpoint
async function getRandomMeal() {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY}`,
    { next: { revalidate: 3000 } }
  ); //revalidates cache every 5 mins (300s)

  if (!res.ok) {
    throw new Error(
      "Oops... I wasn't able to grab a meal for you... Please try again"
    );
  }

  return res.json();
}

//This is going to be the component for the random meal generator
//after this component, render a component for similar recipes that the user might like
export default async function RandomMealGenerator() {
  const data = await getRandomMeal();

  //regex function to remove html elements from the returned json response
  function removeTags(string: string) {
    return string.replace(/<[^>]*>/g, ' ')
               .replace(/\s{2,}/g, ' ')
               .trim();
  }

  return data.recipes.map((recipe) => {
  const { image, id, title, summary, /*spoonacularSourceUrl*/ } = recipe;

    return (
      <section key={id} >
        <h3>{title}</h3>
        <p>{removeTags(summary)}</p>
        <Image src={image} width={300} height={300} alt={summary} style={{marginTop:"2rem",borderRadius:"1rem"}}/>
      </section>
    );
  });
}
