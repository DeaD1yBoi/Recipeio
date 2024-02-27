'use client';
import { Form } from "@/Components";
import useCreateRecipeHooks from "./Hooks";

const CreateRecipeComponent = () => {
  const { post, setPost, submitting, createRecipe } = useCreateRecipeHooks();

  return (
    <div className=" flex items-center justify-center">
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createRecipe}
      />
    </div>
  );
};

export default CreateRecipeComponent;
