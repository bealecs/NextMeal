import { verifyJwt } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";

//API call to retrieve a JSON object of the user
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

  const userProfile = await prisma.user.findMany({
    where: { id: +params.id }, //comparing userId of the preferences model in the DB to the params id as a string
    include: { //extracting the necessary values from user and adding them to the request
        preferences: true,
        favorites: true,
    } 
  });


  return new Response(JSON.stringify(userProfile));
}
