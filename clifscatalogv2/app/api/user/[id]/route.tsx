import { verifyJwt } from "@/app/lib/jwt";
import prisma from "@/app/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const accessToken = request.headers.get("authorization");
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
    where: { userId: +params.id }, //comparing userId of the favorites model in the DB to the params id
    include: {
        user: {
            select: {
                name: true,
            }
        }
    },
  });
}
