"use client";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import useRecipeDetailsHooks from "./hooks";
import { RecipeDetailsProps } from "@/types";
import { shortener, timeTextColor } from "@/utils";
import RatingStars from "@/Components/RatingStars/RatingStars";

const RecipeDetails = (props: RecipeDetailsProps) => {
  const {
    isOpen,
    tagSearch,
    closeModal,
    recipe,
    handleEdit,
    handleDelete,
    rating,
  } = props;
  const { pathName, session } = useRecipeDetailsHooks();
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className={"relative z-10"} onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={
                    "relative  w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5"
                  }
                >
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute right-2 top-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                  >
                    <Image
                      src="close.svg"
                      alt="close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>
                  <div className="flex-1 flex flex-col gap-3 ">
                    <h2 className="font-semibold text-xl capitalize border-b pb-1 border-gray-400">
                      {recipe.name}
                    </h2>
                    <div className="relative w-full rounded-lg ">
                      <Image
                        src={recipe.image || "/food-placeholder.png"}
                        alt="Food placeholder"
                        width={450}
                        height={450}
                        priority
                        className="object-contain rounded-md"
                      />
                    </div>
                  </div>
                  <div className="pt-2 items-end border-t w-full border-gray-400">
                    <RatingStars rating={rating} size={30} />
                  </div>
                  <span className={`text-md flex flex-row items-center`}>
                    This recipe takes:
                    <p
                      className={`text-xl font-bold mx-1 ${timeTextColor(
                        recipe.timeNeeded
                      )}`}
                    >
                      {recipe.timeNeeded}
                    </p>
                    min.
                  </span>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="font-semibold grid grid-cols-2 border-b border-gray-400 w-10/12">

                    <h3 className="font-semibold">Ingredients:</h3>
                    <h3 className="font-semibold">amount:</h3>
                    </div>
                    <div className={"grid grid-cols-1"}>
                      {recipe.ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="text-sm font-semibold grid grid-cols-2 border-b border-gray-400 w-10/12"
                        >
                          <p>
                            &bull;
                            {shortener(ingredient.name, 45)}
                          </p>
                          <p>{ingredient.amount}</p>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 flex justify-start flex-col">
                    <h1 className="font-semibold flex">
                      Creator of the recipe:
                    </h1>
                    <Link href={`/profile?id=${recipe.creator._id}`}>
                      <div className="bg-gray-200 cursor-pointer p-2 rounded-lg flex flex-row">
                        <Image
                          src={
                            recipe.creator.image ||
                            "https://via.placeholder.com/40"
                          }
                          alt="user_image"
                          width={40}
                          height={40}
                          className="rounded-full object-contain m-1"
                        />
                        <div className="flex flex-col">
                          <h3 className="font-semibold text-grey-900 capitalize">
                            {recipe.creator.username}
                          </h3>
                          <p className="font-inter text-sm text-grey-500">
                            {recipe.creator.email}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className={"flex flex-wrap"}>
                    {recipe.tags?.map((tag, index) => (
                      <p
                        key={index}
                        onClick={() => tagSearch(tag)}
                        className={`text-sm flex font-semibold text-blue-700 m-0.5 cursor-pointer`}
                      >
                        {tag.length > 30 ? `${tag.slice(0, 30)}...` : tag}
                      </p>
                    ))}
                  </div>
                  {session?.user?.id === recipe.creator._id.toString() &&
                    pathName === "/profile" && (
                      <div className="mt-5 flex-center gap-4 border-t border-grey-100 pt-3">
                        <p className="green_button w-full" onClick={handleEdit}>
                          Edit
                        </p>
                        <p
                          className="orange_button w-full"
                          onClick={handleDelete}
                        >
                          Delete
                        </p>
                      </div>
                    )}
                  <Link href={`/recipe?id=${recipe._id}`} className="blue_btn">
                    See recipe
                  </Link>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default RecipeDetails;
