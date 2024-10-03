import { useQuery } from "@tanstack/react-query";
import { getAllRecipe } from "../services/ReceipServices";

export const useGetAllRecipe = () => {
  return useQuery({
    queryKey: ["allrecipe"],
    queryFn: async (userData) => await getAllRecipe(),
  });
};
