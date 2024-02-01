"use client";
import { Form } from "@/Components";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import { useState } from "react";
import { ExtendedSession } from "@/types";

const CreateRecipe = () => {
  const router = useRouter();
  const { data: session }: { data: ExtendedSession | null } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    nameStr: "",
    ingredients: [] as string[],
    recipeInst: [] as string[],
    tags: [] as string[],
    timeNeeded: 30,
    image: null as File | null,
  });
  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
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

export default CreateRecipe;
