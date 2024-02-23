import { ExtendedSession, FilterProps } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface fetchRatingProps {
  id: string | null;
  session: ExtendedSession | null;
  setRating?: (values: number) => void;
  setUserRated?: (values: number | null) => void;
}

interface updateSearchProps {
  name: string;
  ing: string;
  setFilter: (values: FilterProps) => void;
  setIngredients?: (values: string[]) => void;
  setSearchName?: (values: string) => void;
  router: AppRouterInstance;
  tag: string;
  limit: number;
}

export function processTags(tagString: string): string[] {
  const tagsArray = tagString.split(/[,\s]+/).map((tag) => tag.trim());
  const processedTags = tagsArray.map((tag) => {
    const processedTag = tag.startsWith("#")
      ? tag.toLowerCase()
      : `#${tag.toLowerCase()}`;
    return processedTag;
  });

  return processedTags;
}

export const fetchRecipes = async (filter: FilterProps) => {
  const response = await fetch(
    `/api/recipe?name=${filter.name}&ingredients=${filter.ingredients}&tag=${filter.tag}&limit=${filter.limit}`
  );
  const data = await response.json();
  return data;
};

export const transformArrayToString = (array: string[]): string => {
  return array.map((item) => item.replace(/ /g, "_")).join(" ");
};

export const updateSearchParams = (props: updateSearchProps) => {
  const {
    name,
    ing,
    setFilter,
    setIngredients,
    setSearchName,
    router,
    tag,
    limit,
  } = props;
  const searchParams = new URLSearchParams(window.location.search);
  if (name) {
    searchParams.set("name", name);
  } else {
    searchParams.delete("name");
  }
  if (ing) {
    searchParams.set("ingredients", ing);
  } else {
    searchParams.delete("ingredients");
  }
  if (tag) {
    searchParams.set("tag", tag);
  } else {
    searchParams.delete("tag");
  }

  const newPath = `${window.location.pathname}?${searchParams.toString()}`;
  router.push(newPath, { scroll: false });
  setFilter({ name, ingredients: ing, tag, limit });
  if (setIngredients) setIngredients([]);
  if (setSearchName) setSearchName("");
};

export const isHaveLongWord = (string: string) => {
  const hasLongWord = string.split(/\s+/).some((word) => word.length > 15);
  return hasLongWord;
};

export const clearSearchParams = ({
  setFilter,
  router,
}: {
  setFilter: (values: FilterProps) => void;
  router: AppRouterInstance;
}) => {
  setFilter({ name: "", ingredients: "", tag: "", limit: 8 });
  router.push("/");
};

export const addSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  const newSearchParams = new URLSearchParams(window.location.search);

  newSearchParams.delete(type.toLocaleLowerCase());

  const newPathname = `${
    window.location.pathname
  }?${newSearchParams.toString()}`;

  return newPathname;
};

export const timeTextColor = (timeNeeded: number) =>
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
    : "text-red-600";

export const toBase64 = (file: File) => {
  try {
    return new Promise((response, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        response(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  } catch (error) {
    return "";
  }
};

export const calculateAverageRating = (ratings: [number]) =>
  ratings.length
    ? (
        ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
      ).toFixed(1)
    : 0;

export const fetchRating = async (props: fetchRatingProps) => {
  const { id, session, setRating, setUserRated } = props;
  const uid = session ? session?.user?.id : null;
  const response = await fetch(`/api/recipe/${id}/rate?userId=${uid}`);
  const data = await response.json();
  setRating && setRating(Number(calculateAverageRating(data.rating)));
  setUserRated && setUserRated(data.userRate);
};

export const shortener = (value: string, length: number) =>
value.length > length
  ? `${value.slice(0, length)}...`
  : value;
