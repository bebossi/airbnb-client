import { useEffect, useState } from "react";
import EmptyState from "../Components/EmptyState";
import { useUserContext } from "../Components/currentUser";
import { api } from "../api";
import TripsClient from "../Components/Trips/TripsClient";

const TripsPage = () => {
  const [reservations, setReservations] = useState([]);
  const currentUser = useUserContext();

  useEffect(() => {
    const fecthReservations = async () => {
      try {
        const response = await api.get("/reservations");
        setReservations(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fecthReservations();
  }, [reservations]);

  if (!reservations) {
    return (
      <div>
        <EmptyState showReset />
      </div>
    );
  }
  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;
