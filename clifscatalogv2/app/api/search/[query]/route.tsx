import { NextResponse } from "next/server";

export async function GET({
  params: { query },
}: {
  params: { query: string };
}) {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}&query=${query}`,
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
  return NextResponse.json({searchResult});
}
