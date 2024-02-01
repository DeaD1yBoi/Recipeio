"use client";
import { ExtendedSession, RecipeProps } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const useProfileHooks = () => {
  const router = useRouter();
  const { data: session }: { data: ExtendedSession | null } = useSession();
  const initialRecipes: RecipeProps[] = [];
  const [userRecipes, setUserRecipes] = useState<RecipeProps[]>(initialRecipes);
  const [userName, setUserName] = useState('');

  const userId = useSearchParams().get("id");


  useEffect(() => {
    const fetchUserName = async () => {
      const response = await fetch(`/api/users/${userId}`)
      const data = await response.json();
      setUserName(data);
    }
    const fetchPosts = async () => {
      const url = userId ? `/api/users/${userId}/recipes` : `/api/users/${session?.user?.id}/recipes`;
      const response = await fetch(url)
      const data = await response.json();
      setUserRecipes(data);
    };
    if(userId) fetchUserName();
    if (session?.user?.id || userId) fetchPosts();
  }, [userId, session?.user?.id]);

  const handleEdit = (id: string) => {
    router.push(`/edit-recipe?id=${id}`);
  };
  const handleDelete = async (id: string) => {
    const hasConfirmed = confirm("Are you sure you want to delete this recipe?");
    if(hasConfirmed){
      try {
        await fetch(`/api/recipe/${id}`, {
          method: "DELETE",
        })
        const  filteredPosts = userRecipes.filter((recipe) => recipe._id.toString() !== id);
        setUserRecipes(filteredPosts);
      } catch (error) {
        console.log(error)
      }
    }
  };
  return { userRecipes, handleEdit, handleDelete, session, userId, userName };
};

export default useProfileHooks;
