"use client";

import { Session } from "next-auth";

interface Props {
  mealId: number;
  title: string;
  image: string;
  session: Session;
}

export function Favorite(props: Props) {
 
  const handleFavorite = async () => {
    try {
      await fetch("/api/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mealId: props.mealId,
          title: props.title,
          image: props.image,
          userId: props.session.user.id,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };
//remount hero section on favorite somehow to display the updated content
  return (
    <button
      onClick={() => {
        if (props.session && props.session.user) {
          handleFavorite();
        } else {
          alert("Please sign in to favorite a meal");
        }
      }}
    >
      Favorite ⭐
    </button>
  );
}

//Click the favorite button, sends a fetch request to /api/favorite
// api/favorite sends a POST request to the DB to create a new Favorite equipped with recipe title, image, summary, and userID that clicked favorite
// use prisma's findMany on Favorites where userID === current user ID when a user clicks the navbar favorites.. This is handled in api/user/[id]
