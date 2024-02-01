import { connectToDB } from "@/utils/database";
import Recipe from "@/models/receipe";

export const POST = async (req: Request) => {
  const { userId, nameStr, ingredients, recipeInst, tags, timeNeeded, image } =
    await req.json();

  try {
    await connectToDB();
    const newRecipe = new Recipe({
      creator: userId,
      name: nameStr,
      ingredients: ingredients,
      recipeInst: recipeInst,
      tags: tags,
      timeNeeded: timeNeeded,
      image: image
    });
    await newRecipe.save();
    return new Response(JSON.stringify(newRecipe), { status: 201 });
  } catch (error) {
    return new Response(`${error}`, { status: 500 });
  }
};
