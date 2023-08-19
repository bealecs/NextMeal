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
            })}
        </>
    )}