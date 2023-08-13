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
