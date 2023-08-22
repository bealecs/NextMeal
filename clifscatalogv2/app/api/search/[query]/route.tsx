import { NextResponse } from "next/server";

export async function GET(request: Request,
  { params }: { params: { query: string } }) {
    
  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${params.query}&apiKey=fc356dc7986b4090b47b50832b8c4cbf`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

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
