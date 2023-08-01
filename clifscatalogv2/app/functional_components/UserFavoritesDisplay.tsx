import Image from "next/image";
import React from "react";
import { getUserFavorites } from "./getUserFavorites";
import { Session } from "next-auth";

interface Props {
  session: Session;
}

export default async function UserFavoritesDisplay (props: Props) {
  
  if (props.session && props.session.user) {
    const favorites = await getUserFavorites(
      props.session.user.id,
      props.session.user.accessToken
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
      </div>
    );
  } 
};
