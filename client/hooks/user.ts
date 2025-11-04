import { useContext } from "react";
import { UserContext } from "../providers/user";

export const useUserStore = () => {
  const { user } = useContext(UserContext);
  return useContext(UserContext);
};
