"use client";
import React from "react";
import useProfileHooks from "./hooks";
import { RecipeCard } from "..";


const Profile = () => {
  const { userRecipes, handleEdit, handleDelete, session, userId, userName } =
    useProfileHooks();

  return (
    <section className="w-full p-3">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{session?.user?.id === userId || !userId ? "My" : `${userName}\'s`} Profile</span>
      </h1>
      <h2 className="desc text-left max-w-md mb-3">Created recepies:</h2>
      <div className="home__recipe-wrapper p-10">
        {userRecipes.map((recipe) => (
          <RecipeCard
            key={recipe._id.toString()}
            recipe={recipe}
            handleDelete={() =>
              handleDelete && handleDelete(recipe._id.toString())
            }
            handleEdit={() => handleEdit && handleEdit(recipe._id.toString())}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
