"use client";
import { Form } from "@/Components";
import useUpdateRecipeHooks from "@/hooks/edit-recipe";
const EditRecipe = () => {
  const {
    post,
    setPost,
    submitting,
    updateRecipe
  } = useUpdateRecipeHooks();
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateRecipe}
    />
  );
};

export default EditRecipe;
