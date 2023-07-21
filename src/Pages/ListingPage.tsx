import { useEffect, useState } from "react";
import { Listing, Reservation } from "../interfaces/UserInterface";
import { api } from "../api";
import { useParams } from "react-router-dom";
import EmptyState from "../Components/EmptyState";
import { useUserContext } from "../Components/currentUser";
import ListingClient from "../Components/Listings/Listingclient";

const ListingPage = () => {
  const [listing, setListing] = useState<Listing>();
  const [reservations, setReservations] = useState<Reservation[]>([])
  const params = useParams();
  const currentUser = useUserContext();
  console.log(currentUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listingResponse = await api.get(`/listing/${params.listingId}`);
        setListing(listingResponse.data);

        const reservationsResponse = await api.get(`/reservations/${params.listingId}`);
        setReservations(reservationsResponse.data);
      } catch (err) {
        console.log(err);
        throw new Error()
      }
    };

    fetchData();
  }, [params.listingId]);

  if (!listing) {
    return <EmptyState />;
  }


  return <ListingClient reservations={reservations} listing={listing} currentUser={currentUser} />;
};

export default ListingPage;
