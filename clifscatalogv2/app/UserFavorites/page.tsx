"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

async function getUserFavorites(userId: number, accessToken: string) {

  const favoritesResponse = await fetch(`/api/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!favoritesResponse.ok) {
    //This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch your current favorite recipes.");
  }

  return favoritesResponse.json();
}

export default async function UserFavorites() {
  const {data: session} = useSession();
  const favorites = await getUserFavorites(session?.user?.id, session?.user?.accessToken);
  return (
    <div>
      {favorites[0] !== undefined &&
        favorites[0].map((favorite) => {
          interface UserFavorites {
            id: number;
            title: string;
            image: string;
          }
          const destructuredFavorite: UserFavorites = favorite;

          return (
            <div key={destructuredFavorite.id}>
              <h3>{destructuredFavorite.title}</h3>
              <Image
                src={destructuredFavorite.image}
                alt={destructuredFavorite.title}
                width={200}
                height={200}
              />
            </div>
          );
        })}
    </div>
  );
}
