"use client";
import { Autocomplete, Stack, TextField } from "@mui/material";

interface Props {
  variable: string;
  setVariable: (variable: string) => void;
  constArr: string[];
  placeholder: string;
  autocompleteId: string;
}

export default function AutocompleteInputString(props: Props) {
  const { variable, setVariable, constArr, placeholder, autocompleteId } =
    props;
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
      value={variable}
        onChange={(e, newValue) => {
          setVariable(newValue);
        }}
        freeSolo
        id={`${autocompleteId}`}
        disableClearable
        options={constArr.map((option: string) => option)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`${placeholder}`}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Stack>
  );
}
