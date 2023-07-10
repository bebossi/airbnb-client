import { useContext } from "react";
import { AuthContext } from "../Components/authContext";

export const getCurrentUser = () => {
  const user = useContext(AuthContext);
  if (!user) return;
  return user;
};
