import { useState } from "react";

interface Props {
    constArr: string[];
}

export const useAutocompleteInputHooks = (props : Props) => {
    const { constArr } = props;
  const [query, setQuery] = useState("");

  const filteredConst =
    query === ""
      ? constArr
      : constArr.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  return { filteredConst, setQuery, query };
};
