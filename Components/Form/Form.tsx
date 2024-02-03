import { FormProps } from "@/types";
import Link from "next/link";
import React from "react";
import { CustomButton, InputSlider } from "..";
import TodoComp from "../TodoComp/TodoCopm";
import useFormHooks from "./Hooks";
import { AllPossibleIngredients } from "@/constants";

const Form = (props: FormProps) => {
  const { type, post, setPost, submitting, handleSubmit } = props;
  const { handleAddName, onFileChange, onClick } = useFormHooks({post, setPost});
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Recipe</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} & share amazing recepies with the world.
      </p>
      <form
      method="POST" encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-semibold text-base text-grey-700">Name:</span>
          <input
            value={post.nameStr}
            onChange={(e) => handleAddName(e)}
            placeholder="Name of your recipe..."
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-semibold text-base text-grey-700">Image:</span>
          <p className="text-sm text-neutral-600">Upload the final image of your recipe done</p>
          <input
          type="file"
          accept='image/*'
          name='image'
            onChange={
              onFileChange
            }
            onClick={onClick}
            required
            className="form_input"
          />
        </label>
        <InputSlider setPost={setPost} post={post} />
        <label>
          <span className="font-semibold text-base text-grey-700">
            Ingredients:
          </span>
          <TodoComp
            placeholder="Enter ingredients"
            setPost={setPost}
            post={post}
            fieldToUpdate={"ingredients"}
            AutoCompleteArr={AllPossibleIngredients}
            Numbers
            EnterOnSpace
          />
        </label>
        <label>
          <span className="font-semibold text-base text-grey-700">
            Recipe...
          </span>
          <TodoComp
            placeholder="Enter recipe step by step"
            setPost={setPost}
            post={post}
            fieldToUpdate={"recipeInst"}
            Numbers
          />
        </label>
        <label>
          <span className="font-semibold text-base text-grey-700">
          Tag
          </span>
             <p className="text-sm text-neutral-600">(#vegan, #sweet, #quick)</p>
          <TodoComp
            placeholder="Enter tags"
            setPost={setPost}
            post={post}
            fieldToUpdate={"tags"}
            EnterOnSpace
          />
        </label>
        <div className="mx-3 flex-end mb-5 gap-4">
          <Link href="/" className="text-grey-500 text-sm font-bold">
            Cancel
          </Link>
          <CustomButton
            btnType="submit"
            title={submitting ? `${type}...` : type}
            containerStyles="blue_btn"
          />
        </div>
      </form>
    </section>
  );
};

export default Form;
