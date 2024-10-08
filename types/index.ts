import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Iuser {
  name: string;
  email: string;
  role: string;
  userId: string;
}
export interface TIngredient {
  name: string;
  quantity: string;
}
export interface TRating {
  user: string; // User ID as string
  rating: number; // Rating between 1 and 5
}
type Author = {
  _id: string;
  name: string;
  profilePicture?: string;
};

export interface Recipe {
  _id: string;
  name?: string;
  title: string; // Recipe title
  ingredients: TIngredient[]; // Array of ingredients
  instructions: string; // Cooking instructions
  cookingTime: number; // Cooking time in minutes
  image: string; // URL to the recipe image
  author: Author; // Author's user ID
  upvotes: string[];
  profilePicture: string;
  downvotes: string[]; // Array of user IDs who downvoted
  isPremium: boolean; // Whether the recipe is premium
  isDeleted: boolean; // Whether the recipe is deleted
  ratings: TRating[]; // Array of ratings (if applicable)
  createdAt: string; // Date when the recipe was created
  updatedAt: string; // Date when the recipe was last updated
  __v: number; // Version key (used by MongoDB)
}

export interface TUser {
  id: string;
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  bio?: string;
  isPremium: boolean;
  premiumExpiryDate?: Date;
  followers: [];
  following: [];
  role: "admin" | "user";
  status: "block" | "active";
  registeredAt: Date;
  passwordChangeAt: Date;
}
