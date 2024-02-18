"use client";
import React from "react";
import useRecipePageHooks from "./hooks";
import Image from "next/image";
import Link from "next/link";
import { StarRating } from "..";

const RecipePage = () => {
  const { recipe, userRatePost, rating, userRated, justRated, session } =
    useRecipePageHooks();
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-5xl font-semibold mb-4">
        {recipe?.name || "Recipe Name Placeholder"}
      </h1>
      <Image
        src={recipe?.image || "https://via.placeholder.com/800x400"}
        alt="Recipe Photo"
        className="rounded-xl mb-4"
        width={800}
        height={400}
      />
      <h1 className="font-semibold text-xl flex">Creator of the recipe:</h1>
      <Link
        href={`/profile?id=${recipe?.creator._id}`}
        className=" mb-5 w-fit bg-gray-200 p-2 rounded-lg flex flex-row"
      >
        <Image
          src={recipe?.creator.image || "https://via.placeholder.com/40"}
          alt="user_image"
          width={40}
          height={40}
          className="rounded-full object-contain m-1"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold text-grey-900 capitalize">
            {recipe?.creator.username}
          </h3>
          <p className="font-inter text-sm text-grey-500">
            {recipe?.creator.email}
          </p>
        </div>
      </Link>
      <div className="my-4">
        <h1 className="font-semibold flex flex-row items-end">
          Rating of this recipe:{" "}
          <p
            className={` font-bold text-xl ${
              rating < 3 ? "text-red-500" : "text-green-500"
            }`}
          >
            {rating}
          </p>
        </h1>
        {session?.user && (
          <div>
            <h1 className="text-xl font-semibold">Rate this recipe</h1>
            <StarRating
              justRated={justRated}
              userRated={userRated}
              rating={rating}
              userRatePost={userRatePost}
              size={25}
              textStyle="text-xl"
              ratingStyle="text-xl font-bold"
            />
          </div>
        )}
      </div>
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-2">Ingredients:</h3>
        <ul className="list-disc pl-4">
          {recipe?.ingredients.map((ingredient, index) => (
            <li key={index} className="mb-1 text-xl font-semibold">
              {ingredient || "Ingredient Placeholder"}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4 space-y-4">
        <h3 className="text-2xl font-semibold">Recipe Instructions:</h3>
        {recipe?.recipeInst.map((instruction, index) => (
          <div key={index}>
            <span className="text-2xl">{`${index + 1}. `}</span>
            <span className="text-xl justify-evenly">
              {instruction || "Instruction Placeholder"}
            </span>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="text-2xl font-semibold mb-2">Tags:</h3>
        <div className="flex flex-wrap text-xl">
          {recipe?.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 rounded-full text-blue-700 cursor-pointer px-2 py-1 mr-2 mb-2"
            >
              {tag || "Tag Placeholder"}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
