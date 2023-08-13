import prisma from "@/app/lib/prisma";

interface RequestBody {
    checked: {
      theme: boolean;
      noDairy: boolean;
      nutAllergy: boolean;
      fishAllergy: boolean;
      vegan: boolean;
      vegetarian: boolean;
      noRedMeat: boolean;
      noPork: boolean;
      dieting: boolean;
    }
    userId: number;
  }
  
  export async function POST(request: Request) {
    const body: RequestBody = await request.json();
 
    const newPreferences = await prisma.preferences.create({
        data: {
            theme: body.checked.theme,
            noDairy: body.checked.noDairy,
            nutAllergy: body.checked.nutAllergy,
            fishAllergy: body.checked.fishAllergy,
            vegan: body.checked.vegan,
            vegetarian: body.checked.vegetarian,
            noRedMeat: body.checked.noRedMeat,
            noPork: body.checked.noPork,
            dieting: body.checked.dieting,
            userId: body.userId,
        },
      });
      
      const {...result} = newPreferences;
    return new Response(JSON.stringify(result));
  }