"use client";
import { Autocomplete, Stack, TextField } from "@mui/material";

interface Props {
  variable: string[];
  setVariable: (variable: string[]) => void;
  constArr: string[];
  placeholder: string;
  autocompleteId: string;
}

export default function AutocompleteInputArray(props: Props) {
  const { variable, setVariable, constArr, placeholder, autocompleteId } =
    props;
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        value={variable}
        onChange={(e, newValue) => {
          setVariable(newValue);
        }}
        multiple
        limitTags={2}
        id={`${autocompleteId}`}
        options={constArr}
        getOptionLabel={(option: string) => option}
        defaultValue={[constArr[1]]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label={`${placeholder}`}
            placeholder={`${placeholder}`}
          />
        )}
      />
    </Stack>
  );
}
