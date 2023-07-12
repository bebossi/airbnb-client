import { api } from "../api";
import { useMemo, useCallback } from "react";
import { toast } from "react-hot-toast";
import { User } from "../interfaces/UserInterface";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: number;
  currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let response;

        if (hasFavorited) {
          response = () => api.delete(`/favorites/${listingId}`);
        } else {
          response = () => api.post(`/favorites/${listingId}`);
        }

        await response();
        toast.success("Success");
      } catch (err) {
        toast.error("Error");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal]
  );
  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
