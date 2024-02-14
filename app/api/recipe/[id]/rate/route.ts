import Recipe from "@/models/receipe";
import { getProps } from "@/types";
import { connectToDB } from "@/utils/database";
import { Types } from "mongoose";


export const PATCH = async (req: Request, { params }: getProps) => {
  const { userId, rating } = await req.json();

  try {
    await connectToDB();
    const exsistingRecipe = await Recipe.findById(params.id);
    if (!exsistingRecipe)
      return new Response("Recipe not found", { status: 404 });
    const index = exsistingRecipe.rating.findIndex(
      (rate: { user: Types.ObjectId }) => rate.user.equals(userId)
    );
    if (index !== -1) {
      exsistingRecipe.rating[index].rating = rating;
    } else {
      exsistingRecipe.rating.push({ user: userId, rating: rating });
    }
    await exsistingRecipe.save();
    return new Response(JSON.stringify(exsistingRecipe), { status: 200 });
  } catch (error) {
    return new Response(`Failed to update recipe. Error: ${error}`, {
      status: 500,
    });
  }
};

export const GET = async (req: Request, { params }: getProps) => {
  const { searchParams } = new URL(req.url!);
 const userId = searchParams.get("userId");
 console.log('route userId',{userId});

  try {
    await connectToDB();
    const recipe = await Recipe.findById(params.id);
    if (!recipe) return new Response("Recipe not found", { status: 404 });
    const userRate = recipe.rating.filter((rate: { user: Types.ObjectId }) =>
      rate.user.equals(userId)
    );
    return new Response(JSON.stringify({userRate}), { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch recipe. Error: ${error}`, {
      status: 500,
    });
  }
};