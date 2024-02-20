"use client";

import Image from "next/image";
import { FilterProps, RecipeProps } from "@/types";
import CustomButton from "../CustomButton/CustomButton";
import { RatingStars, RecipeDetails } from "..";
import useRecipeCardHooks from "./hooks";
import { MdBookmark } from "react-icons/md";

interface RecipeCardProps {
  recipe: RecipeProps;
  handleDelete?: () => void;
  handleEdit?: () => void;
  setFilter?: (values: FilterProps) => void;
}

const RecipeCard = (props: RecipeCardProps) => {
  const { recipe, handleDelete, handleEdit, setFilter } = props;
  const { name, ingredients, tags, image, timeNeeded, _id } = recipe;
  const {
    isOpen,
    setIsOpen,
    tagSearch,
    updateSavedRecipes,
    userSaved,
    rating,
    session,
  } = useRecipeCardHooks({
    setFilter,
    recipe,
  });

  return (
    <div className="recipe-card group relative w-72 h-fit">
      <div className="recipe-card__content">
        <h2 className="recipe-card__content-title">{name}</h2>
        {session ? (
          userSaved.includes(_id) ? (
            <MdBookmark
              size={25}
              color="gold"
              className="cursor-pointer"
              onClick={() => updateSavedRecipes(_id, "DELETE")}
            />
          ) : (
            <MdBookmark
              size={25}
              className="cursor-pointer"
              onClick={() => updateSavedRecipes(_id, "ADD")}
            />
          )
        ) : null}
      </div>
      <div className="relative h-fit w-full my-3 object-contain flex justify-center items-center rounded-md">
        <Image
          src={image || "/placeholder.png"}
          alt="Food placeholder"
          width={160}
          height={160}
          priority
          className="object-contain rounded-lg"
        />
      </div>
      <div className="py-2 border-t border-gray-400 w-full">
        <RatingStars rating={rating} />
      </div>
      <span className={`text-md flex flex-row items-center`}>
        This recipe takes:
        <p
          className={`time_Text ${
            timeNeeded <= 50
              ? "text-sky-400"
              : timeNeeded <= 120
              ? "text-green-500"
              : timeNeeded <= 240
              ? "text-amber-400"
              : timeNeeded <= 360
              ? "text-amber-600"
              : timeNeeded <= 480
              ? "text-red-400"
              : "text-red-600"
          }`}
        >
          {timeNeeded}
        </p>
        min.
      </span>
      <div className="flex font-extrabold flex-col">
        <span className="self-start text-[14px] font-semibold mb-4">
          {ingredients.slice(0, 3).map((ingredient, index) => (
            <p className="mr-1" key={index}>
              &bull;
              {ingredient.length > 40
                ? `${ingredient.slice(0, 40)}...`
                : ingredient}
            </p>
          ))}
        </span>
        <span className="self-start text-sm font-medium text-blue-700 flex flex-wrap">
          {tags.slice(0, 3).map((tag, index) => (
            <p
              className="cursor-pointer mr-1"
              onClick={() => tagSearch(tag)}
              key={index}
            >
              {tag.length > 11 ? `${tag.slice(0, 11)}...` : tag}
            </p>
          ))}
        </span>
      </div>
      <div className="w-full mt-auto">
        <CustomButton
          title="View More"
          containerStyles="blue_btn w-full opacity-0 group-hover:opacity-100 duration-slow"
          handleClick={() => setIsOpen(true)}
        />
      </div>
      <RecipeDetails
        rating={rating}
        tagSearch={tagSearch}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        recipe={recipe}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default RecipeCard;
