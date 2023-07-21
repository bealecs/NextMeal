"use client";

import { getSession } from "next-auth/react";

interface Props {
  mealId: number;
  title: string;
  image: string;
}

export default async function Favorite(props: Props) {
const session = await getSession();

  const handleFavorite = async () => {
      try {
        await fetch("https://vtxfjirpfhbpnzrztuil.supabase.co/api/favorite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mealId: props.mealId,
            title: props.title,
            image: props.image,
            userId: session.user.id,
          }),
        });
      } catch (error) {
        console.log(error);
      }
  };

  return <button onClick={() => handleFavorite()}>Favorite ⭐</button>;
}

//Click the favorite button, sends a fetch request to /api/favorite
// api/favorite sends a POST request to the DB to create a new Favorite equipped with recipe title, image, summary, and userID that clicked favorite
// use prisma's findMany on Favorites where userID === current user ID when a user clicks the navbar favorites.. This is handled in api/user/[id]
