import { useMemo } from "react";
import { Listing, Reservation, User } from "../../interfaces/UserInterface";
import { categories } from "../navbar/Categories";
import Container from "../Container";
import ListingHead from "./ListingHead";
import LinstingInfo from "./LinstingInfo";

interface ListingCLientProps {
  reservations?: Reservation[];
  listing: Listing & {
    user: User;
  };
  currentUser?: User | null;
}

const ListingClient: React.FC<ListingCLientProps> = ({
  listing,
  currentUser,
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            image={listing.image}
            locationValue={listing.locationValue}
            currentUser={currentUser}
            id={listing.id}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <LinstingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
