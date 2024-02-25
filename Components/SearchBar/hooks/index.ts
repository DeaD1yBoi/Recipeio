import { FilterProps } from "@/types";
import { transformArrayToString, updateSearchParams } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  setFilter: (values: FilterProps) => void;
}

const useSearchBarHooks = (props: Props) => {
  const { setFilter } = props;
  const router = useRouter();
  const [searchName, setSearchName] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchName === "" && ingredients.length <= 0) {
      return alert("Please enter name or ingredients");
    }
    const name = searchName.toLowerCase();
    const ing = transformArrayToString(ingredients);

    updateSearchParams({
      name,
      ing,
      setFilter,
      setIngredients,
      setSearchName,
      router,
      tag: "",
      limit: 8,
    });
  };

  const clearSearch = () => {
    setSearchName("");
    setIngredients([]);
    router.push("/");
    updateSearchParams({
      name: "",
      ing: "",
      setFilter,
      setIngredients,
      setSearchName,
      router,
      tag: "",
      limit: 8,
    })
  }

  return {
    searchName,
    setSearchName,
    handleSearch,
    ingredients,
    setIngredients,
    clearSearch
  };
};

export default useSearchBarHooks;
