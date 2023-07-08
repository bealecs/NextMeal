import Image from "next/image";

//Leverages Spoonaculars random recipe API endpoint 
async function getRandomMeal() {
    const res = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY}`);
    
    if(!res.ok) {
        throw new Error("Oops... I wasn't able to grab a meal for you... Please try again");
    }

    return res.json();
}

//This is going to be the component for the random meal generator
export default async function RandomMealGenerator() {
    const data = await getRandomMeal();
    
    return (    
        data.recipes.map((recipe) => {
            const { name, originalName, image, id, sourceUrl } = recipe;
    
            return (
                <section key={id}>
                    <h3>{sourceUrl}</h3>
                    <Image src={image} width={100} height={100} alt={originalName} />
                </section>
            )
        })
    )
}