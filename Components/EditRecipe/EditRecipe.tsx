"use client";
import { Form } from "@/Components";
import useUpdateRecipeHooks from "./Hooks";
export default function EditRecipeComponent() {
  const { post, setPost, submitting, updateRecipe } = useUpdateRecipeHooks();
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateRecipe}
    />
  );
}
