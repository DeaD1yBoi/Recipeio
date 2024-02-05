import Recipe from "@/models/receipe";
import { getProps } from "@/types";
import { connectToDB } from "@/utils/database";
import { NextApiRequest } from "next";


export const GET = async (req: NextApiRequest,  {params} : getProps) => {
  try {
    await connectToDB();
    const recipe = await Recipe.findById(params.id).populate("creator");
    if (!recipe) return new Response("Recipe not found", { status: 404 });
    return new Response(JSON.stringify(recipe), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all recipes", { status: 500 });
  }
};

export const PATCH = async (req: Request, { params }: getProps) => {
  const { nameStr, ingredients, tags, image, timeNeeded, recipeInst } = await req.json();

  try {
    await connectToDB();
    const exsistingRecipe  = await Recipe.findById(params.id);
    if (!exsistingRecipe)
      return new Response("Recipe not found", { status: 404 });

    exsistingRecipe.name = nameStr;
    exsistingRecipe.ingredients = ingredients;
    exsistingRecipe.tags = tags;
    exsistingRecipe.image = image? image: exsistingRecipe.image;
    exsistingRecipe.timeNeeded = timeNeeded;
    exsistingRecipe.recipeInst = recipeInst;
    await exsistingRecipe.save();
    return new Response(JSON.stringify(exsistingRecipe), { status: 200 });
  } catch (error) {
    return new Response(`Failed to update recipe. Error: ${error}`, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: getProps) => {
  try {
    await connectToDB();
    await Recipe.findByIdAndDelete(params.id);
    return new Response("Recipe deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete recipe", { status: 500 });
  }
};
