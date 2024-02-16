import { ExtendedSession, FilterProps, RecipeProps } from "@/types";
import { fetchRating, timeTextColor, updateSearchParams } from "@/utils";
import { ObjectId } from "mongoose";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  setFilter?: (values: FilterProps) => void;
  recipe: RecipeProps;
}

const useRecipeCardHooks = (props: Props) => {
  const { setFilter, recipe } = props;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session }: { data: ExtendedSession | null } = useSession();
  const [userSaved, setUserSaved] = useState<ObjectId[]>([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (session) fetchRating({ id: recipe._id.toString(), session, setRating });
  }, [session?.user?.id]);

  const tagSearch = (tag: string) => {
    setFilter &&
      updateSearchParams({
        name: "",
        ing: "",
        setFilter,
        router,
        tag: tag.slice(1),
        limit: 8,
      });
  };

  const fetchSaved = async () => {
    const response = await fetch(`/api/users/${session?.user?.id}`);
    const data = await response.json();
    setUserSaved(data.savedPosts);
  };

  useEffect(() => {
    if (session) fetchSaved();
  }, [session]);

  const updateSavedRecipes = async (postId: ObjectId, action: string) => {
    if (!postId) return alert("Recipe ID not found");
    try {
      const response = await fetch(`/api/users/${session?.user?.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          postId,
          action,
        }),
      });
      if (response.ok && action === "ADD") {
        setUserSaved([...userSaved, postId]);
      } else if (response.ok && action === "DELETE") {
        setUserSaved(userSaved.filter((id: ObjectId) => id !== postId));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { isOpen, setIsOpen, tagSearch, updateSavedRecipes, userSaved, rating };
};
export default useRecipeCardHooks;
