export const getMealInfo = async (mealId: number) => {
    const res = await fetch("http://localhost:3000/api/fullMeal", {
        method: "GET",
        headers: {
            "Content-Type": "json/application"
        },
        body: JSON.stringify({
            mealId: mealId
        })   
    })
    return await res.json();
}