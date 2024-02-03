import User from "@/models/user";
import { getProps } from "@/types";
import { connectToDB } from "@/utils/database";
import { Types } from "mongoose";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const user = await User.findById(params.id);
    if (!user) return new Response("User not found", { status: 404 });
    return new Response(
      JSON.stringify({ username: user.username, savedPosts: user.savedPosts }),
      { status: 200 }
    );
  } catch (error) {
    return new Response("Failed to fetch all users", { status: 500 });
  }
};

export const PATCH = async (req: Request, { params }: getProps) => {
  const { postId, action } = await req.json();
  try {
    await connectToDB();
    const existingUser = await User.findById(params.id);

    if (!existingUser) {
      return new Response("User not found", { status: 404 });
    }
    if (action === "ADD" && !existingUser.savedPosts.includes(postId)) {
      existingUser.savedPosts.push(postId);
    } else if (
      action === "DELETE" &&
      existingUser.savedPosts.includes(postId)
    ) {
      const filtered = existingUser.savedPosts.filter(
        (id: Types.ObjectId) => !id.equals(postId)
      );
      existingUser.savedPosts = filtered;
    } else {
      return new Response("Invalid action", { status: 400 });
    }
    await existingUser.save();
    return new Response(JSON.stringify(existingUser), { status: 200 });
  } catch (error) {
    return new Response("Failed to save recipe", { status: 500 });
  }
};
