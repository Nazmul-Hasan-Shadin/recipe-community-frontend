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
import { Iuser, Recipe } from "@/types"; // Make sure Recipe is imported if it's defined in your types
import axios from "axios";

interface IUserProviderValues {
  user: Iuser | undefined;
  isLoading: boolean;
  setUser: (user: Iuser | undefined) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  searchResults: Recipe[]; // Change 'any[]' to 'Recipe[]' or your desired type
  setSearchResults: Dispatch<SetStateAction<Recipe[]>>; // Same here
}

export const userContext = createContext<IUserProviderValues | undefined>(
  undefined
);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<Iuser | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<Recipe[]>([]); // Using specific type for search results

  const handleUser = async () => {
    const getUser = await getCurrentUser();
    setUser(getUser);
    setIsLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        isLoading,
        setIsLoading,
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
