import { useEffect, useState } from "react";
import EmptyState from "../Components/EmptyState";
import { useUserContext } from "../Components/currentUser";
import { api } from "../api";
import FavoritesClient from "../Components/Favorites/FavoritesClient";

const FavoritesPage = () => {
  const currentUser = useUserContext();
  if (!currentUser) {
    return (
      <div>
        <EmptyState />
      </div>
    );
  }
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get("/favoriteListings");
        setListings(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchListings();
  }, [listings]);

  return (
    <div>
        <FavoritesClient listings={listings} currentUser={currentUser}/>
    </div>
  );
};

export default FavoritesPage;
