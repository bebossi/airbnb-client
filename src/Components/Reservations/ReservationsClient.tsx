import { Reservation, User } from "../../interfaces/UserInterface"
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../Container";
import Heading from "../Heading";
import { api } from "../../api";
import { toast } from "react-hot-toast";
import ListingCard from "../Listings/ListingsCard";

interface ReservationsClientProps {
reservations: Reservation[];
currentUser?: User | null
}
const ReservationsClient: React.FC<ReservationsClientProps> = ({reservations, currentUser}) => {
    const navigate = useNavigate()
    const [deletingId, setDeletingId] = useState<number>()

    const onCancel = useCallback( async (id: number) => {
        setDeletingId(id)
         await api.delete(`/reservations/${id}`)
         .then(() => {
            toast.success("Reservation cancelled")
            navigate("/reservations", {replace: true})
         })
         .catch(() => {
            toast.error("Something went wrong")
         })
         .finally(() => {
            setDeletingId(undefined)
         })
    },[navigate])
 
  return (
   <Container>
    <Heading title="Reservations" subtitle="Bookings on your properties"/>
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
    {reservations.map((reservation) => (
        <ListingCard key={reservation.id} data={reservation.listing} actionId={reservation.id} onAction={onCancel} disabled={deletingId === reservation.id} actionLabel="Cancel guest reservation " currentUser={currentUser} />
    ))}
    </div>
   </Container>
  )
}

export default ReservationsClient
