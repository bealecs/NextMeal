"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { getUserFavorites } from "../functional_components/getUserFavorites";

export default function UserFavoritesDisplay () {
  const { data: session } = useSession();
  if (session && session.user) {
    const favorites = getUserFavorites(
      session.user?.id,
      session.user?.accessToken
    );

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
          <p>This is working</p>
      </div>
    );
  } else {
    return <p>Please sign in to view a favorites</p>;
  }
};
