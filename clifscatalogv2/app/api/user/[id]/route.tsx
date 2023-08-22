import { verifyJwt } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";

//API call to retrieve a list of the user's favorited recipes
export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const accessToken = request.headers.get("Authorization");
  if (!accessToken || !verifyJwt(accessToken)) {
    return new Response(
      JSON.stringify({
        error: "unauthorized",
      }),
      {
        status: 401,
      }
    );
  }
  //once adding the grocery list, change all of these prisma calls to one call on the user. Extract data from the call as needed. Data will contain favorites, preferences, and grocery list
  const userFavorites = await prisma.favorites.findMany({
    where: { userId: +params.id }, //comparing userId of the favorites model in the DB to the params id as a string
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  
  const userPreferences = await prisma.preferences.findMany({
    where: { userId: +params.id }, //comparing userId of the preferences model in the DB to the params id as a string
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return new Response(JSON.stringify([userFavorites, userPreferences]));
}
