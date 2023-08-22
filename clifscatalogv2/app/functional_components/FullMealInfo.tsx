"use client"
import { useState } from "react";
import { getMealInfo } from "./getMealInfo";

interface Props {
    mealId: number;
}

export const FullMealInfo = async (props: Props) => {
    const [mealData, setMealData] = useState(null);

    
    const setMealInfo = async () => {
        setMealData(await getMealInfo(props.mealId));
    }

    return (
        <>
            <button onClick={setMealInfo}>Show Full Meal Info</button>
            {/* consider setting the populated mealData map into a modal */}
            {mealData &&
            mealData.map((meal) => {
                //add logic here to destructure the mapped meal item
                //then, provide jsx using destructured values to build full meal info page
                interface ExtendedIngredients {
                    amount: number;
                    id: number;
                    image: string;
                    original: string;
                  }
                interface WinePairing {
                    pairedWines: string[];
                }
                //Interface for all data that will be available in the FullMealInfo component
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
                    extendedIngredients: ExtendedIngredients[]; //This will be an array of all of the ingriedients. Each index in the array has the data from extendedIngredients interface
                    summary: string;
                    winePairing: WinePairing;
                    pairingText: string;
                }

                const destructuredMealInfo: DestructuredMealInfo = meal;

                return (
                    <></>
                )
            })}
        </>
    )}