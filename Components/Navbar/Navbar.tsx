"use client";
import Link from "next/link";
import Image from "next/image";
import { CustomButton } from "@/Components";
import { signIn, signOut } from "next-auth/react";
import useNavbarHooks from "./hooks";

const Navbar = () => {
  const { session, providers, toggleDropdown, setToggleDropdown } =
    useNavbarHooks();
  return (
    <nav className="flex-between w-full mb-16 pt-3 px-5 z-10">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/food-logo.svg"
          alt="Food logo"
          width={54}
          height={12}
          className="object-contain"
        />
        <p className="logo_text">Recipeio</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-recipe" className="blue_btn">
              Post Recipe
            </Link>
            <CustomButton
              title="Sign Out"
              containerStyles="blue_btn"
              handleClick={() => signOut()}
            />
            <Link href="/profile">
              <Image
                src={session?.user.image as string}
                width={54}
                height={12}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <CustomButton
                  title="Sign In"
                  handleClick={() => signIn(provider.id)}
                  key={provider.name}
                  containerStyles="blue_btn"
                />
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image as string}
              alt="ProfPic"
              width={54}
              height={12}
              className="rounded-full"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            />
            {toggleDropdown && (
              <div className="dropdown border-2 shadow-md border-collapse">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-recipe"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Post Recipe
                </Link>
                <CustomButton
                  title="Sign Out"
                  handleClick={() => {
                    signOut();
                    setToggleDropdown(false);
                  }}
                  containerStyles="blue_btn"
                  btnType="button"
                />
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <CustomButton
                  key={provider.name}
                  title="Sign In"
                  handleClick={() => signIn(provider.id)}
                />
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
