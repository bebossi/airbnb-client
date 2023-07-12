import useCountries from "../../Hooks/useConutries";
import { User } from "../../interfaces/UserInterface";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  image: string;
  id: number;
  currentUser?: User | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title, locationValue, image, id, currentUser
}) => {

  const {getByValue} = useCountries()
  const location = getByValue(locationValue)

  return (
   <>
   <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
   <div className="w-full h-[60vh] overflow-hidden rounded-lg relative">
    <img alt="Image" src={image} className="object-cover  w-full"    />
    <div className="absolute top-5 right-5">
      <HeartButton listingId={id} currentUser={currentUser} />
    </div>
    </div>
   </>
  )
}

export default ListingHead