"use client";
import { Autocomplete, Chip, Stack, TextField } from "@mui/material";
import { AllPossibleIngredients } from "@/constants";
import { useEffect, useState } from "react";

interface Props {
  autocompleteId: string;
}

export default function AutocompleteInput(props: Props) {
  const [value, setValue] = useState<string[]>([]);
  console.log(value);
  useEffect(() => {
    console.log(value)
  },[value])
  const { autocompleteId } = props;
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
        }}
        multiple
        limitTags={2}
        id={`${autocompleteId}`}
        options={AllPossibleIngredients}
        getOptionLabel={(option: string) => option}
        defaultValue={[AllPossibleIngredients[13]]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Multiple values"
            placeholder="Favorites"
          />
        )}
      />
    </Stack>
  );
}
