import prisma from "@/app/lib/prisma";
import * as bcrypt from "bcrypt";

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  //checking to make sure that there is no user with the requested email already created.. If there isn't this will return null
  const findUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  
  if (findUser === null) {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
        preferences: {
          create: {
            theme: false,
            noDairy: false,
            nutAllergy: false,
            fishAllergy: false,
            vegan: false,
            vegetarian: false,
            noRedMeat: false,
            noPork: false,
            dieting: false
          }
        }
      },
    });
    const { password, ...result } = user;
    return new Response(JSON.stringify(result));
  } else {
    return new Response(
      JSON.stringify({
        error:
          "The email that was attempted already exists, please try another",
      }),
      {
        status: 409,
      }
    );
  }
}
