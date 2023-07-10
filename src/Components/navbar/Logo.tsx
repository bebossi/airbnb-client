import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate()
  return (
    <div>
      <img
      onClick={() => navigate("/")}
        className="hidden md:block cursor-pointer"
        height="100"
        width="100"
        src="/src/assets/download.png"
      />
    </div>
  );
}

export default Logo;
