import Recipe from "@/models/receipe";
import User from "@/models/user";
import { getProps } from "@/types";
import { connectToDB } from "@/utils/database";

export const GET = async (req: Request, { params }: getProps) => {
  try {
    await connectToDB();
    const recipes = await Recipe.find({ creator: params.id }).populate("creator");
    const user = await User.findById(params.id).populate({
      path: 'savedPosts',
      populate: { path: 'creator' }
    });
    const savedPosts = user?.savedPosts
    return new Response(JSON.stringify( {recipes, savedPosts}), {
      status: 200,
    });
  } catch (error) {
    return new Response(`Failed to fetch all recipes. Error: ${error}`, {
      status: 500,
    });
  }
};
