"use client";
import { ExtendedSession, RecipeProps } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useProfileHooks = () => {
  const router = useRouter();
  const { data: session }: { data: ExtendedSession | null } = useSession();
  const initialRecipes: RecipeProps[] = [];
  const [recipesToShow, setRecipesToShow] =
    useState<RecipeProps[]>(initialRecipes);
  const [userName, setUserName] = useState("");
  const [createdRecipes, setCreatedRecipes] = useState(true);
  const [loading, setLoading] = useState(true);

  const userId = useSearchParams().get("id");

  useEffect(() => {
    const fetchUserName = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      console.log(data);

      setUserName(data.username);
    };
    const fetchPosts = async () => {
      setLoading(true)
      const url = userId
        ? `/api/users/${userId}/recipes`
        : `/api/users/${session?.user?.id}/recipes`;
      const response = await fetch(url);
      const data = await response.json();
      createdRecipes
        ? setRecipesToShow(data.recipes)
        : setRecipesToShow(data.savedPosts);
        setLoading(false)
    };
    if (userId) fetchUserName();
    if (session?.user?.id || userId) fetchPosts();
  }, [userId, session?.user?.id, createdRecipes]);

  const handleEdit = (id: string) => {
    router.push(`/edit-recipe?id=${id}`);
  };
  const handleDelete = async (id: string) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/recipe/${id}`, {
          method: "DELETE",
        });
        const filteredPosts = recipesToShow.filter(
          (recipe) => recipe._id.toString() !== id
        );
        setRecipesToShow(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    handleEdit,
    handleDelete,
    session,
    userId,
    userName,
    createdRecipes,
    setCreatedRecipes,
    recipesToShow,
    loading,
  };
};

export default useProfileHooks;
