import { useEffect, useState } from "react"
import { Listing } from "../interfaces/UserInterface"
import { api } from "../api"
import { useParams } from "react-router-dom"
import EmptyState from "../Components/EmptyState"
import { useUserContext } from "../Components/currentUser"
import ListingClient from "../Components/Listings/Listingclient"

const ListingPage = () => {

  const [listing, setListing] = useState<Listing>()
  const params = useParams()
  const currentUser = useUserContext()
  console.log(currentUser)

  useEffect(() => {
    try{
      const fetchListing = async () => {
        const response = await api.get(`/listing/${params.listingId}`)
        setListing(response.data)
      }
      fetchListing()

    } catch(err){
      console.log(err)
    }
    
  }, [])

  if(!listing) {
    return (
      <EmptyState/>
    )
  }

  return (

    <ListingClient listing={listing} currentUser={currentUser} />
  )
}

export default ListingPage
