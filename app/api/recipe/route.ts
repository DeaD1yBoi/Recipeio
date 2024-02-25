import Recipe from "@/models/receipe";
import { connectToDB } from "@/utils/database";
import { NextApiRequest } from "next";

export const GET = async (req: NextApiRequest) => {
  const { searchParams } = new URL(req.url!);
  const name = searchParams.get("name");
  const ingredients = searchParams.get("ingredients");
  const tag = searchParams.get("tag");
  const limitSt = searchParams.get("limit");
  let limitNum;
  if (limitSt) limitNum = parseInt(limitSt);
  const query: any = {};

  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  if (ingredients && ingredients.length > 0) {
    query.ingredients = {
      $elemMatch: {
        name: {
          $in: ingredients
            .split(" ")
            .map((ing) => ing.trim().toLowerCase().replace("_", " ")),
        },
      },
    };
  }

  if (tag) {
    query.tags = { $regex: tag, $options: "i" };
  }

  try {
    await connectToDB();
    const recipes = await Recipe.find(query)
      .populate("creator")
      .limit(limitNum || 8);
    return new Response(JSON.stringify(recipes), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all recipes", { status: 500 });
  }
};
