import { FilterProps, RecipeProps } from "@/types";
import { clearSearchParams, fetchRecipes } from "@/utils";
import {useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function usePageHooks() {
  const searchParams = useSearchParams();
  const limit = parseInt(searchParams.get('limit')!) || 8
  const initialFilter: FilterProps = { name: searchParams.get('name') || '', ingredients: searchParams.get('ingredients') || '', tag: searchParams.get('tag') || '', limit: limit };
  const [allRecipes, setAllRecipes] = useState<[RecipeProps] | null>(null);
  const [filter, setFilter] = useState<FilterProps>(initialFilter);

  const router = useRouter();

  const fetch = async () => {
    const recipes = await fetchRecipes( filter );
    setAllRecipes(recipes);
  };


  useEffect(() => {
    fetch();
  },[filter]);

  useEffect(() => {
    const handlePopState = () => {
      const newSearchParams = new URLSearchParams(window.location.search);
      const newFilter: FilterProps = {
        name: newSearchParams.get('name') || '',
        ingredients: newSearchParams.get('ingredients') || '',
        tag: newSearchParams.get('tag') || '',
        limit: parseInt(newSearchParams.get('limit')!) || 8,
      };
      setFilter(newFilter);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);


const handleClick = () => {
  clearSearchParams({ setFilter, router })
}


  const isDataEmpty =
    !Array.isArray(allRecipes) || allRecipes.length < 1 || !allRecipes;
  return { allRecipes, isDataEmpty, setFilter, handleClick, filter };
}
