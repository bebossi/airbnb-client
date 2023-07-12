import { useEffect, useState } from "react";
import Container from "../Components/Container";
import EmptyState from "../Components/EmptyState";
import { Listing } from "../interfaces/UserInterface";
import { api } from "../api";
import ListingCard from "../Components/Listings/ListingsCard";
import { useUserContext } from "../Components/currentUser";

const Home = () => {

const user = useUserContext()
  const [listings, setListings] = useState<Listing[] | null>()

  const currentUser = user

  useEffect(() => {
  const fetchLitings = async () => {
    try{
      const response = await api.get("/listings")
      setListings(...[response.data])
    } catch(err){
      console.error(err);
    }
  }
  fetchLitings()
}, [])

if (listings?.length === 0) {
  return (
    <div>
      <EmptyState showReset />
    </div>
  );
}

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
        {listings?.map((listing: Listing) => {
          return (
            <div  key={listing.id}>
              <ListingCard currentUser={currentUser}  data={listing} />
            </div>
          )
        })}
      </div>
    </Container>
  );
};
 
export default Home;
