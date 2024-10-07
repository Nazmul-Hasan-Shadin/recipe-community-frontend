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
import axios from "axios";

interface IUserProviderValues {
  user: Iuser | undefined;
  isLoading: boolean;
  setUser: (user: Iuser | undefined) => void;
  setisLoading: Dispatch<SetStateAction<boolean>>;
  searchResults: any[];
  setSearchResults: Dispatch<SetStateAction<any[]>>;
}

export const userContext = createContext<IUserProviderValues | undefined>(
  undefined
);

const UserProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [user, setUser] = useState<Iuser | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<any[]>([]); // New state for search results

  const handleUser = async () => {
    const getUser = await getCurrentUser();
    setUser(getUser);
    setisLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        isLoading,
        setisLoading,
        setUser,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider Context");
  }
  return context;
};

export default UserProvider;
