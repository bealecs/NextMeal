import Provider from "../store/SessionProvider";
import UserFavoritesDisplay from "./UserFavoritesDisplay";

export default function UserFavorites() {

  return (
    <Provider>
      <UserFavoritesDisplay />
    </Provider>
  )
}