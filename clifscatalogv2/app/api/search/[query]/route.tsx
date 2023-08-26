import { NextResponse } from "next/server";

export async function GET(request: Request,
  { params }: { params: { query: string } }) {

  //Headers coming from the client based off of user preference
  const excludeIngredients = request.headers.get("exclude");
  const dietPreference = request.headers.get("diet");
  
  //base URL for the search API
  let apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${params.query}&apiKey=fc356dc7986b4090b47b50832b8c4cbf`;

  //checks to see if there are valid headers coming from the client. This is filtering the search based off user preference
  if (excludeIngredients) {
    apiUrl += `&excludeIngredients=${excludeIngredients}`;
  }

  if (dietPreference) {
    apiUrl += `&diet=${dietPreference}`;
  }

  const res = await fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Response(
      JSON.stringify({
        error: "There was an error with your search, please try again",
      }),
      {
        status: 404,
      }
    );
  }

  const searchResult = await res.json();
  return NextResponse.json(searchResult);
}
