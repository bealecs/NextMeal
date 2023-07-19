interface Props {
  mealId: number;
}

export const SimiliarRecipes = async (props: Props) => {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/${props.mealId}/similar?apiKey=${process.env.SPOONACULAR_API_KEY}&number=3`,
    { cache: "no-store" }
  );
  const resJson = await res.json();
  const resMapped = resJson.map((recipe) => {
    interface DestructuredSimilarRecipe {
      id: number;
      title: string;
    }
    const simliarRecipe: DestructuredSimilarRecipe = recipe;

    return (
      <div key={props.mealId}>
        <h4>{simliarRecipe.title}</h4>
      </div>
    );
  });
  return resMapped;
};
