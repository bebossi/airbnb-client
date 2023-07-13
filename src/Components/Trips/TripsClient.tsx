import { useNavigate } from "react-router-dom";
import { Reservation, User } from "../../interfaces/UserInterface";
import Container from "../Container";
import Heading from "../Heading";
import { useCallback, useState } from "react";
import { api } from "../../api";
import { toast } from "react-hot-toast";
import ListingCard from "../Listings/ListingsCard";

interface TripsClientProps {
  reservations: Reservation[];
  currentUser?: User | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState<number>();

  const onCancel = useCallback((id: number) => {
    setDeletingId(id);

    api
      .delete(`/reservations/${id}`)

      .then(() => {
        toast.success(`Reservation canceled`);
        navigate("/trips", { replace: true });
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setDeletingId(undefined);
      });
  }, []);

  return (
    <Container>
      <Heading title="Trips" subtitle="Where you`ve been and where you going" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Canecel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
