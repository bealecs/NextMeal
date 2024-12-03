import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

interface RequestBody {
  id: number;
}
export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const deleteFavorite = await prisma.favorites.delete({
      where: {
        id: body.id,
      },
    });
    return NextResponse.json({ success: true, data: deleteFavorite });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
