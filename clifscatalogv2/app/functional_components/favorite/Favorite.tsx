"use client";
import { Session } from "next-auth";
import { useState } from "react";

interface Props {
  mealId: number;
  title: string;
  image: string;
  session: Session;
}

export function Favorite(props: Props) {
  const [favoriteClicked, setFavoriteClicked] = useState(false);
  const handleFavorite = async () => {
    try {
      await fetch("https://next-meal-cookbook.vercel.app/api/favorite", {
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
      setFavoriteClicked(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      id="favorite-button"
      onClick={(e) => {
        if (props.session && props.session.user) {
          handleFavorite();
          e.currentTarget.disabled = true;
        } else {
          alert("Please sign in to favorite a meal");
        }
      }}
    >
      {favoriteClicked ? '🌟' : '☆'}
    </button>
  );
}

//Click the favorite button, sends a fetch request to /api/favorite
// api/favorite sends a POST request to the DB to create a new Favorite equipped with recipe title, image, summary, and userID that clicked favorite
// use prisma's findMany on Favorites where userID === current user ID when a user clicks the navbar favorites.. This is handled in api/user/[id]
