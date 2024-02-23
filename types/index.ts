import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { Session } from "next-auth";
import { ObjectId } from "mongoose";
import { DefaultSession } from "@auth/core/types";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>
    btnType?: "button" | "submit";
  disable?: boolean;
  textStyles?: string;
  isDisabled?: boolean;
  noDefaultStyles?: boolean
}

export interface SearchNameProps {
  searchName: string;
  setSearchName: (searchName: string) => void;
}

export interface UseStatePostProps {
  post: {
    nameStr: string;
    ingredients: {name: string, amount: string}[];
    recipeInst: Array<string>;
    tags: Array<string>;
    timeNeeded: number;
    image: File | null;
  };
  setPost: Dispatch<
    SetStateAction<{
      nameStr: string;
      ingredients: {name: string, amount: string}[];
      recipeInst: Array<string>;
      tags: Array<string>;
      timeNeeded: number;
      image: File | null;
    }>
  >;
}

export interface FormProps extends UseStatePostProps {
  type: string;
  submitting: boolean;
  handleSubmit?: React.FormEventHandler<HTMLFormElement>
}

export interface ProviderProps {
  children?: React.ReactNode;
  session?: Session | null | undefined;
}

export interface ProfileProps {
  _id: ObjectId;
  email: string;
  username: string;
  image: string;
  __v: number;
}

export interface RecipeProps {
  _id: ObjectId;
  name: string;
  ingredients: Array<string>;
  recipeInst: Array<string>;
  tags: Array<string>;
  image: string;
  timeNeeded: number;
  creator: {
    _id: ObjectId;
    email: string;
    username: string;
    image: string;
  };
  __v: number;
}


export interface RecipeDetailsProps {
  rating: number;
  isOpen: boolean;
  closeModal: () => void;
  recipe: RecipeProps;
  handleDelete?: () => void;
  handleEdit?: () => void;
  tagSearch: (tag: string) => void;
}

export interface getProps {
  params: {
    id: string;
  };
}

export interface FilterProps {
  name: string;
  ingredients: string;
  tag: string;
  limit: number
}

export interface ExtendedSession extends DefaultSession {
  user?: {
    id?: string
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}
