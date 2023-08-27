"use client"
import { useState } from "react";
import Image from "next/image";
import { Session } from "next-auth";
import { Favorite } from "../favorite/Favorite";
import PreferencesModal from "../../store/ModalWrapper";

interface Props {
    session: Session | null;
    mealId: number;
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
        const res = await fetch(`https://api.spoonacular.com/recipes/${mealId}/information?apiKey=fc356dc7986b4090b47b50832b8c4cbf`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },  
    })
    
    if(!res.ok) {
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

    const setMealInfo = async () => {
        try {
            const data = await getMealInfo(props.mealId);
            setOpenPreferences(!openPreferences);
            setMealData(data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!mealData) {
        return <button onClick={setMealInfo}>Show Full Meal Info</button>;
    }

    return (
        <PreferencesModal
              title={mealData.title}
              isOpened={openPreferences}
              onClose={() => {
                setMealData(null);
                setOpenPreferences(false);
            }}>
            <div key={mealData.id * 1000}>
                <Image
                    src={mealData.image}
                    alt={mealData.title}
                    width={100}
                    height={100}/>
                {props.session && 
                <Favorite 
                    session={props.session}
                    mealId={mealData.id}
                    title={mealData.title}
                    image={mealData.image} />}
                <p>Servings: {mealData.servings}</p>
                <p>Time to cook: {mealData.readyInMinutes}</p>
                <p>Contains Dairy: {mealData.dairyFree ? "No": "Yes"}</p>
                <p>Gluten Free: {mealData.glutenFree ? "Yes" : "No"}</p>
                <p>{removeTags(mealData.instructions)}</p>
                <p>Vegan: {mealData.vegan ? "Yes" : "No"}</p>
                <p>Vegetarian: {mealData.vegetarian ? "Yes" : "No"}</p>
                <p>Healthy: {mealData.veryHealthy ? "Yes" : "No"}</p>
                <p>Popular: {mealData.veryPopular ? "Yes" : "No"}</p>
                <p>Weight Watcher Points: {mealData.weighWatcherSmartPoints}</p>
                <p>Best Served: {mealData.dishTypes}</p>
                <p>Ingredients list:</p>
                <ul>
                    {mealData.extendedIngredients.map((ingredient) => (
                        <li key={ingredient.id * (Math.floor(Math.random() * 100))}>
                            {ingredient.original}
                        </li>
                    ))}
                </ul>
                <p>{removeTags(mealData.summary)}</p>
            </div>
        </PreferencesModal>
        )
    }