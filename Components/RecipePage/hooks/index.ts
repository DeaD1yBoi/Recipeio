import { ExtendedSession, RecipeProps } from "@/types";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function useRecipePageHooks() {
  const searchParams = useSearchParams();
  const [recipe, setRecipe] = useState<RecipeProps | null>(null);
  const id = searchParams.get("id");
  const [rating, setRating] = useState<number | null>(null);
  const [userRated, setUserRated] = useState<number | null>(null);


  const { data: session }: { data: ExtendedSession | null } = useSession();
  const fetchRating = async () => {
    const userId = session?.user?.id;
    const response = await fetch(`/api/recipe/${id}/rate?userId=${userId}`);
    const data = await response.json();
    setUserRated(data.userRate[0]?.rating);
  };

  const userRatePost = async ({ rating }: { rating: number }) => {
    console.log({ id, rating });
    setUserRated(rating);
    try {
      await fetch(`/api/recipe/${id}/rate`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: session?.user?.id,
          rating: rating,
        }),
      });
    } catch (error) {
      fetchRating()
      console.log(error);
    }
  };


  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`/api/recipe/${id}`);
      const data = await response.json();
      setRecipe(data);
    };
    fetchRating();
    fetchRecipe();
  }, [id]);
  return { recipe, userRatePost, rating, userRated };
}
