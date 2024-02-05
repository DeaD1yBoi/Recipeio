import { toBase64 } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const useUpdateRecipeHooks = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    nameStr: "",
    ingredients: [""],
    recipeInst: [""],
    tags: [""],
    timeNeeded: 30,
    image: null as File | null,
  });
  const searchParams = useSearchParams();
  const recipeId = searchParams.get("id");

  useEffect(() => {
    const getRecipeDetails = async () => {
      const response = await fetch(`/api/recipe/${recipeId}`);
      const data = await response.json();

      setPost({
        nameStr: data.name,
        ingredients: data.ingredients,
        recipeInst: data.recipeInst,
        tags: data.tags,
        timeNeeded: data.timeNeeded,
        image: data.image,
      });
    };
    if (recipeId) getRecipeDetails();
  }, [recipeId]);

  const updateRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    console.log(post.image);

    const base64 = await toBase64(post.image as File);

    if (!recipeId) return alert("Recipe ID not found");
    try {
      const response = await fetch(`/api/recipe/${recipeId}`, {
        method: "PATCH",
        body: JSON.stringify({
          nameStr: post.nameStr,
          ingredients: post.ingredients,
          recipeInst: post.recipeInst,
          tags: post.tags,
          timeNeeded: post.timeNeeded,
          image: base64,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return {
    post,
    setPost,
    submitting,
    updateRecipe,
  };
};

export default useUpdateRecipeHooks;
