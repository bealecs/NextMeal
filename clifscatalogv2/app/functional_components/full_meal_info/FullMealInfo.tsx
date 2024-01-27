"use client";
import { useContext, useState } from "react";
import Image from "next/image";
import { Session } from "next-auth";
import { Favorite } from "../favorite/Favorite";
import FullMealStyles from "../../modular_css/FullMeal.module.css";
import { ThemeContext } from "@/app/store/ThemeProvider";

interface Props {
  session: Session | null;
  mealId: number;
  textHolder: string;
}

interface DestructuredMealInfo {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  dairyFree: boolean;
  glutenFree: boolean;
  instructions: string;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  weighWatcherSmartPoints: number;
  dishTypes: string[];
  extendedIngredients: {
    amount: number;
    id: number;
    image: string;
    original: string;
  }[];
  summary: string;
}

async function getMealInfo(mealId: number) {
  //replace spoonacular api key with process.env.SPOONACULAR_API_KEY for prod environment
  const res = await fetch(
    `https://api.spoonacular.com/recipes/${mealId}/information?apiKey=fc356dc7986b4090b47b50832b8c4cbf`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    console.log("This is the source of the problem.");
  }

  return await res.json();
}

// regex function to remove html elements from the returned json response
function removeTags(string: string) {
  return string
    .replace(/<[^>]*>/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export const FullMealInfo = async (props: Props) => {
  const [mealData, setMealData] = useState<DestructuredMealInfo | null>(null);
  const [openPreferences, setOpenPreferences] = useState(false);
  const theme = useContext(ThemeContext);

  const setMealInfo = async () => {
    try {
      const data = await getMealInfo(props.mealId);
      setOpenPreferences(!openPreferences);
      setMealData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const resetMealInfo = () => {
    setMealData(null);
  };

  if (!mealData) {
    return (
      <button onClick={setMealInfo} className={FullMealStyles.displayButton}>
        {props.textHolder}
      </button>
    );
  }

  return (
    <div
      key={mealData.id * 1000}
      className={
        props.session === null
          ? "container_light_fullMeal"
          : theme.themeValue + "_fullMeal"
      }
      onClick={(e) => e.stopPropagation()}
    >
      <div className={FullMealStyles.closeFullMeal}>
        <button onClick={resetMealInfo}>
          <span>❌</span>
        </button>
      </div>
      <h3 className={FullMealStyles.h3MealTitle}>{mealData.title}</h3>
      <div className={FullMealStyles.imageDescriptionDiv}>
        <Image
          src={mealData.image}
          alt={mealData.title}
          width={400}
          height={300}
          style={{
            borderRadius: "0.5rem",
            display: "block",
            margin: "1rem auto",
          }}
        />
        <p>{removeTags(mealData.summary)}</p>
      </div>
      <br />
      <h3 className={FullMealStyles.headers}>Useful Information:</h3>
      <div className={FullMealStyles.splitDiv}>
        <div className={FullMealStyles.firstSplit}>
          <p>Servings: {mealData.servings}</p>
          <p>Time to cook: {mealData.readyInMinutes}</p>
          <p>Contains Dairy: {mealData.dairyFree ? "No" : "Yes"}</p>
          <p>Gluten Free: {mealData.glutenFree ? "Yes" : "No"}</p>
          <p>Vegan: {mealData.vegan ? "Yes" : "No"}</p>
        </div>
        <div className={FullMealStyles.secondSplit}>
          <p>Vegetarian: {mealData.vegetarian ? "Yes" : "No"}</p>
          <p>Healthy: {mealData.veryHealthy ? "Yes" : "No"}</p>
          <p>Popular: {mealData.veryPopular ? "Yes" : "No"}</p>
          <p>
            Weight Watcher Points:{" "}
            {mealData.weighWatcherSmartPoints
              ? mealData.weighWatcherSmartPoints
              : "Not Available"}
          </p>
          <p>Best Served: {mealData.dishTypes.join(", ")}</p>
        </div>
      </div>
      <br />
      <h3 className={FullMealStyles.headers}>Instructions:</h3>
      <p className={FullMealStyles.instructions}>
        {removeTags(mealData.instructions)}
      </p>
      <br />
      <h3 className={FullMealStyles.headers}>Ingredients list:</h3>
      <ul className={FullMealStyles.ingredientsList}>
        {mealData.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id * Math.floor(Math.random() * 100)}>
            {ingredient.original}
          </li>
        ))}
      </ul>
      <br />
    </div>
  );
};
