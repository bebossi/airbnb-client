import { useEffect, useState } from "react";
import EmptyState from "../Components/EmptyState";
import { useUserContext } from "../Components/currentUser";
import { api } from "../api";
import PropertiesClient from "../Components/Properties/PropertiesClient";

const PropertiesPage = () => {
  const [listings, setListings] = useState([]);
  const currentUser = useUserContext();

  useEffect(() => {
    const fecthlistings = async () => {
      try {
        const response = await api.get("/properties");
        setListings(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fecthlistings();
  }, [listings]);

  if (!listings) {
    return (
      <div>
        <EmptyState showReset />
      </div>
    );
  }
  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
