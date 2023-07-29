export async function getUserFavorites(userId: number, accessToken: string) {

    const favoritesResponse = await fetch(`/api/user/${userId}`, {
      headers: {
        "Authorization": `${accessToken}`,
      },
    });
  
    if (!favoritesResponse.ok) {
      //This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch your current favorite recipes.");
    }
  
    return await favoritesResponse.json();
  }