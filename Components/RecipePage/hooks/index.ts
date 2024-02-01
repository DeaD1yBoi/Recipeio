import { RecipeProps } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useRecipePageHooks() {
  const searchParams = useSearchParams();
  const [recipe, setRecipe] = useState<RecipeProps | null>(null);
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`/api/recipe/${id}`);
      const data = await response.json();
      setRecipe(data);
    };
    fetchRecipe();
  }, [id]);
  return { recipe };
}
