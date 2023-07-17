"use client"
import { getSession } from "next-auth/react";
import React from "react"

interface UserFavorites {

}

async function getUserFavorites() {
    const session = await getSession();
    const favoritesResponse = await fetch(`/api/user/[${session.user.id}]/route.tsx`);
    
    if(!favoritesResponse.ok) {
        //This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch your current favorite recipes.')
    }

    return favoritesResponse.json();
}

export async function UserFavorites() {
    const favorites = await getUserFavorites();
    
    return (
        <section>
            {/* {favorites && } */}
            <p>User Favorites here</p>
        </section>
    )
}