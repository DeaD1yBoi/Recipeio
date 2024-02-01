"use client";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment } from "react";
import { useAutocompleteInputHooks } from "./hooks";

interface Props {
  variable: string;
  setVariable: (variable: string) => void;
  constArr: string[];
  placeholder: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const AutocompleteInput = (props: Props) => {
  const { variable, setVariable, constArr, placeholder, onKeyDown } = props;
  const { query, setQuery, filteredConst } = useAutocompleteInputHooks({
    constArr,
  });
  return (
    <div className="search-ingredients border-b-2 border-gray-300 rounded-full">
      <Combobox nullable value={variable} onChange={setVariable}>
        <div className="relative w-full">
          <Combobox.Button className={"absolute top-[14px]"}>
            <Image
              src="/ingredients.png"
              width={25}
              height={25}
              className="ml-4"
              alt="ingredients"
            />
          </Combobox.Button>
          <Combobox.Input
            className={"search-ingredients__input"}
            placeholder={placeholder}
            displayValue={(query: string) => query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="search-ingredients__options" static>
              {filteredConst.slice(0, 5).map((item) => (
                <Combobox.Option
                  key={item}
                  className={({ active }) => `
                  relative search-ingredients__option
                  ${active ? "bg-primary-blue text-white" : "text-gray-900"}
                  `}
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>

                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-pribg-primary-purple"
                          }`}
                        ></span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default AutocompleteInput;
