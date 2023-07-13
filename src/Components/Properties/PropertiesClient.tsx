import { useNavigate } from "react-router-dom";
import { Listing, User } from "../../interfaces/UserInterface";
import Container from "../Container";
import Heading from "../Heading";
import { useCallback, useState } from "react";
import { api } from "../../api";
import { toast } from "react-hot-toast";
import ListingCard from "../Listings/ListingsCard";

interface PropertiesClientProps {
  listings: Listing[];
  currentUser?: User | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState<number>();

  const onCancel = useCallback((id: number) => {
    setDeletingId(id);

    api
      .delete(`/listing/${id}`)
      .then(() => {
        toast.success(`Listing deleted`);
        navigate("/properties", { replace: true });
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
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
