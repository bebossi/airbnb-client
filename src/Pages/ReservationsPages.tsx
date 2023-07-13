import { useEffect, useState } from "react"
import EmptyState from "../Components/EmptyState"
import { useUserContext } from "../Components/currentUser"
import { api } from "../api"
import { Reservation } from "../interfaces/UserInterface"
import ReservationsClient from "../Components/Reservations/ReservationsClient"

const ReservationsPages = () => {
    const currentUser = useUserContext()
    if(!currentUser){
        return (
            <div>
                <EmptyState title="Unathorized" subtitle="Please login"/>
            </div>
        )
    }

    const [reservations, setReservations] = useState<Reservation[]>([])

    useEffect(() => {
       const fetchReservations= async() => {
        try{
            const response = await api.get("/allReservations")
            setReservations(response.data)
        } catch(err){
            console.log(err)
        }
       }
       fetchReservations()
    },[reservations])

    if(reservations?.length === 0){
    return (
        <div>
                <EmptyState title="No reservations found" subtitle="Looks like you dont have reservations in your properties"/>
            </div>
    )
    }


  return (
    <div>
      <ReservationsClient reservations={reservations} currentUser={currentUser} />
    </div>
  )
}

export default ReservationsPages
