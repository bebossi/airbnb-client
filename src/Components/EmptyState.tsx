import { useNavigate } from "react-router-dom";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyState {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyState> = ({
  title = "No exact matches",
  subtitle = "Try changing or remove your filters",
  showReset,
}) => {
  const navigate = useNavigate();

  return <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
    <Heading title={title} subtitle={subtitle} center />
    <div className="w-48 mt-4">
    {showReset && (
        <Button outline label="Remove all filters" onClick={() =>  navigate("/")} />
    )}
    </div>
    </div>;
};

export default EmptyState;
