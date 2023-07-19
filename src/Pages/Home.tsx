import { useEffect, useState } from "react";
import Container from "../Components/Container";
import EmptyState from "../Components/EmptyState";
import { Listing } from "../interfaces/UserInterface";
import { api } from "../api";
import ListingCard from "../Components/Listings/ListingsCard";
import { useUserContext } from "../Components/currentUser";
import { useLocation } from "react-router-dom";
import qs from "query-string";

const Home = () => {
  const user = useUserContext();
  const [listings, setListings] = useState<Listing[] | null>();
  const location = useLocation();

  const currentUser = user;

  useEffect(() => {
    const searchParams = qs.parse(location.search);

    const fetchLitings = async () => {
      try {
        const queryString = qs.stringify(searchParams);
        const response = await api.get(`/listingSearch?${queryString}`);
        setListings(...[response.data]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLitings();
  }, [location.search]);

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
            <div key={listing.id}>
              <ListingCard currentUser={currentUser} data={listing} />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Home;
