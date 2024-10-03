import axiosInstance from "@/src/lib/axiosInstance";

export const getAllRecipe = async () => {
  const res = await axiosInstance.get("recipe");

  // cookies().set('accessToken',res.data.accessToken)
  console.log(res.data.data.data);

  console.log(res, "iamr res");
};
