//Leverages Spoonaculars random recipe API endpoint
export async function GET() {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY}`,
      {
        method: "GET",
        cache: "no-store"
      }
    );
  
    if (!res.ok) {
      throw new Error(
        "Oops... I wasn't able to grab a meal for you... Please try again"
      );
    }
  
    return await res.json();
  }