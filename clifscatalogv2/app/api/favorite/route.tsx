import prisma from "@/app/lib/prisma";

interface RequestBody {
    title: string;
    image: string;
    mealId: number;
    userId: number;
  }
  
  export async function POST(request: Request) {
    const body: RequestBody = await request.json();
 
    const newFavorite = await prisma.favorites.create({
        data: {
          title: body.title,
          image: body.image,
          mealId: body.mealId,
          userId: body.userId,
        },
      });
      
      const {...result} = newFavorite;
      console.log(result)
    return new Response(JSON.stringify(result));
  }