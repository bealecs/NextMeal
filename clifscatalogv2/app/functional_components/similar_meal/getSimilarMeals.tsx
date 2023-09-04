//Leverages Spoonaculars random recipe API endpoint
export async function getSimilarMeals(mealId: number) {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${mealId}/similar?apiKey=fc356dc7986b4090b47b50832b8c4cbf&number=3`,
      {
        method: "GET",
        cache: "no-store"
      }
    );
  
    if (!res.ok) {
      throw new Error(
        "Oops... I wasn't able to grab any similar meals for you... Please try again"
      );
    }
  
    return await res.json();
  }