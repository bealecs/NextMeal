export async function getUserFavorites(userId: number, accessToken: string) {
  //soon, make this call to database url env variable so we dont have to keep swapping the url between dev and prod
    const favoritesResponse = await fetch(`https://vtxfjirpfhbpnzrztuil.supabase.co/api/user/${userId}`, {
      headers: {
        "Authorization": `${accessToken}`,
      },
    });
  
    if (!favoritesResponse.ok) {
      //This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch your current favorite recipes.");
    }
  
    return favoritesResponse.json();
  }