import Recipe from "@/models/receipe";
import { getProps } from "@/types";
import { connectToDB } from "@/utils/database";



export const GET = async (req: Request, { params }: getProps) => {
  try {
    await connectToDB();
    const recipes = await Recipe.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(recipes), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all recipes", { status: 500 });
  }
};
