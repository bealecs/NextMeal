import Image from "next/image";
import React from "react";
import { getUserFavorites } from "./getUserFavorites";
import { Session } from "next-auth";

interface Props {
  session: Session;
}

export default async function UserFavoritesDisplay(props: Props) {

  if (props.session && props.session.user) {
    const favorites = await getUserFavorites(
      props.session.user.id,
      props.session.user.accessToken
    );

    const handleDelete = async (id: number, title: string) => {
      try {
        const res = await fetch("http://localhost:3000/api/deleteFavorite", {
          method: "POST",
          body: JSON.stringify({
            id: id,
          }),
        });
      } catch (error) {
        console.log(error);
      }
      document.getElementById(title).remove();
    };

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
              <div id={destructuredFavorite.title} key={destructuredFavorite.id}>
                <h3>{destructuredFavorite.title}</h3>
                <Image
                  src={destructuredFavorite.image}
                  alt={destructuredFavorite.title}
                  width={200}
                  height={200}
                />
                <button onClick={() => handleDelete(destructuredFavorite.id, destructuredFavorite.title)}>
                  Remove Favorite
                </button>
              </div>
            );
          })}
      </div>
    );
  }
}
