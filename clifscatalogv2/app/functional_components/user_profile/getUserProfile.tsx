export async function getUserProfile(userId: number, accessToken: string) {
  //soon, make this call to database url env variable so we dont have to keep swapping the url between dev and prod
  const favoritesResponse = await fetch(
    `https://next-meal-cookbook.vercel.app/api/user/${userId}`,
    {
      headers: {
        Authorization: `${accessToken}`,
      },
    }
  );

  if (!favoritesResponse.ok) {
    throw new Error("Failed to fetch your current favorite recipes.");
  }

  return favoritesResponse.json();
}
