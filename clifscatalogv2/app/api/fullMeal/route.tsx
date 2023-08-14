interface RequestBody {
    mealId: number;
  }
  
  export async function GET(request: Request) {
    const body: RequestBody = await request.json();
    const res = await fetch(`https://api.spoonacular.com/recipes/${body.mealId}/information`, {
        method: "GET",
    })

    if(!res.ok) {
        alert("Unable to locate desired meal content. Please try again, perhaps with a different meal.");
    }
    
    const result = await res.json();
    return new Response(JSON.stringify(result));
  }