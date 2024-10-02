import { axiosInstance } from "@/src/lib/axiosInstance";

const registerUser = async (userData) => {
  const { data } = axiosInstance.post("/user/register", { userData });
};
