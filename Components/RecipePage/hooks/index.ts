import { ExtendedSession, RecipeProps } from "@/types";
import { calculateAverageRating, fetchRating } from "@/utils";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useRecipePageHooks() {
  const searchParams = useSearchParams();
  const [recipe, setRecipe] = useState<RecipeProps | null>(null);
  const id = searchParams.get("id");
  const [rating, setRating] = useState<number>(0);
  const [userRated, setUserRated] = useState<number | null>(null);
  const [justRated, setJustRated] = useState(false);

  const { data: session }: { data: ExtendedSession | null } = useSession();

  const userID = session?.user?.id!;

  const userRatePost = async ({ rating }: { rating: number }) => {
    setJustRated(true);
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
      console.log(error);
    } finally {
      fetchRating({ id, session, setRating, setUserRated });
      setTimeout(() => setJustRated(false), 2500);
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`/api/recipe/${id}`);
      const data = await response.json();
      setRecipe(data);
    };
    fetchRecipe();
  }, [id]);

  useEffect(() => {
    if (!userID) return;
    fetchRating({ id, session, setRating, setUserRated });
  }, [userID]);

  return { recipe, userRatePost, rating, userRated, justRated };
}
