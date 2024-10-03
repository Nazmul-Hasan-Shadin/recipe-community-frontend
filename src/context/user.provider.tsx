import { jwtDecode } from "jwt-decode";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCurrentUser } from "../services/AuthServices";
import { Iuser } from "@/types";

interface IUserProviderValues {
  user: Iuser | undefined;
  isLoading: boolean;
  setUser: (user: Iuser | undefined) => void;
  setisLoading: Dispatch<SetStateAction<boolean>>;
}

export const userContext = createContext<IUserProviderValues | undefined>(
  undefined
);
const UserProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState<boolean>(true);

  const [user, setUser] = useState<Iuser | undefined>(undefined);

  const handleUser = async () => {
    const getUser = await getCurrentUser();

    setUser(getUser);
    setisLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <userContext.Provider value={{ user, isLoading, setisLoading, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error("User must be used within the userProvider Context");
  }
  return context;
};

export default UserProvider;
