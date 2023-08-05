import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

interface RequestBody {
    id: number;
}
export async function POST(request: Request) {
    const body: RequestBody = await request.json();
    const deleteFavorite = await prisma.favorites.delete({
        where: {
          id: body.id,
        },
    })
    return NextResponse;
}