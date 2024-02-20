"use client";
import React from "react";
import useProfileHooks from "./hooks";
import { CustomButton, Loading, RecipeCard } from "..";

const Profile = () => {
  const {
    handleEdit,
    handleDelete,
    session,
    userId,
    userName,
    createdRecipes,
    setCreatedRecipes,
    recipesToShow,
    loading,
  } = useProfileHooks();

  return (
    <section className="w-full p-3">
      <h1 className="head_text text-left">
        <span className="blue_gradient capitalize">
          {session?.user?.id === userId || !userId ? "My" : `${userName}\'s`}{" "}
          Profile
        </span>
      </h1>
      <span className="flex flex-row my-2 items-end gap-2">
        <CustomButton
          title="Created"
          noDefaultStyles
          handleClick={() => setCreatedRecipes(true)}
          containerStyles={`text-2xl underline ${
            createdRecipes ? "font-semibold" : "font-normal"
          }`}
        />
        <p className="text-3xl">/</p>
        <CustomButton
          title="Saved"
          noDefaultStyles
          handleClick={() => setCreatedRecipes(false)}
          containerStyles={`text-2xl underline ${
            !createdRecipes ? "font-semibold" : "font-normal"
          }`}
        />
        <p className="text-2xl">Recipes</p>
      </span>
      <div className="home__recipe-wrapper p-10">
        {loading ? (
          <Loading />
        ) : (
          recipesToShow.map((recipe) => (
            <RecipeCard
              key={recipe._id.toString()}
              recipe={recipe}
              handleDelete={() =>
                handleDelete && handleDelete(recipe._id.toString())
              }
              handleEdit={() => handleEdit && handleEdit(recipe._id.toString())}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Profile;
