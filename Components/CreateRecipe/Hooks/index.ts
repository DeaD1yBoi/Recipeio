import { ExtendedSession } from "@/types";
import { toBase64 } from "@/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useCreateRecipeHooks = () => {
  const router = useRouter();
  const { data: session }: { data: ExtendedSession | null } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    nameStr: "",
    ingredients: [] as { name: string; amount: string }[],
    recipeInst: [] as string[],
    tags: [] as string[],
    timeNeeded: 30,
    image: null as File | null,
  });
  const createRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const base64 = await toBase64(post.image as File);
    try {
      const response = await fetch("/api/recipe/new", {
        method: "POST",
        body: JSON.stringify({
          nameStr: post.nameStr,
          ingredients: post.ingredients,
          recipeInst: post.recipeInst,
          tags: post.tags,
          userId: session?.user?.id,
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
    createRecipe,
  };
};

export default useCreateRecipeHooks;
