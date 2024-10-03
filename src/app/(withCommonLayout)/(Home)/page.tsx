import Card from "@/src/components/ui/card";
import { useGetAllRecipe } from "@/src/hooks/recipes.hooks";
import { Recipe } from "@/types";
import axios from "axios";

export default async function Home() {
  const recipePost = await fetch("http://localhost:5001/api/v1/recipe", {
    cache: "no-store",
  });
  const res = await recipePost.json();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {res?.data?.map((recipe: Recipe) => (
        <Card recipe={recipe} />
      ))}
      <h2>hi</h2>
    </section>
  );
}
