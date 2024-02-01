"use client";
import React from "react";
import { MdClear, MdDelete, MdDone, MdEdit } from "react-icons/md";
import useTodoHooks from "./hooks";
import { AutocompleteInput } from "..";
import { UseStatePostProps } from "@/types";

interface PostType {
  ingredients: Array<string>;
  recipeInst: Array<string>;
  tags: Array<string>;
}

interface Props extends UseStatePostProps {
  placeholder: string;
  fieldToUpdate: keyof PostType;
  Numbers?: boolean;
  EnterOnSpace?: boolean;
  AutoCompleteArr?: Array<string>;
}

const TodoList = (props: Props) => {

  const {
    placeholder,
    post,
    setPost,
    fieldToUpdate,
    Numbers,
    EnterOnSpace,
    AutoCompleteArr,
  } = props;

  const {
    newItem,
    setNewItem,
    editingTask,
    setEditingTask,
    handleCreatePost,
    handleEditTask,
    handleSaveTask,
    handleDeleteTask,
    handleKeyDown,
    editText,
    setEditText,
  } = useTodoHooks({ post, setPost, fieldToUpdate, EnterOnSpace, Numbers });
  
  return (
    <div className="p-1 rounded-lg">
      <div className="space-y-2 rounded-full ">
        {post[fieldToUpdate].map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 rounded bg-gray-100"
          >
            {Numbers && <span className="mx-1">{index + 1}.</span>}
            {editingTask === index ? (
              <>
                {AutoCompleteArr ? (
                  <AutocompleteInput
                    placeholder="Add new ingredient"
                    setVariable={setEditText}
                    variable={editText}
                    constArr={AutoCompleteArr}
                  />
                ) : (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-grow rounded bg-gray-100 outline-0"
                  />
                )}
                <MdDone
                  onClick={() => handleSaveTask(editingTask)}
                  size={40}
                  className="cursor-pointer"
                />
                <MdClear onClick={() => setEditingTask(null)} size={40} />
              </>
            ) : (
              <>
                <span className="flex-grow mr-2 whitespace-normal">{item}</span>
                <span className="flex flex-row cursor-pointer">
                  <MdEdit onClick={() => handleEditTask(index)} size={40} />
                  <MdDelete onClick={() => handleDeleteTask(index)} size={40} />
                </span>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between p-2 rounded bg-gray-100 my-2">
        {AutoCompleteArr ? (
          <AutocompleteInput
            placeholder="Add new ingredient"
            setVariable={setNewItem}
            variable={newItem}
            constArr={AutoCompleteArr}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <input
            type="text"
            placeholder={`${placeholder}`}
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-11/12 bg-gray-100 p-2 rounded outline-0"
          />
        )}
        <MdDone
          onClick={handleCreatePost}
          size={40}
          className={`cursor-pointer ${newItem ? "" : "hidden"}`}
        />
        <MdClear
          onClick={() => setNewItem("")}
          size={40}
          className={`cursor-pointer ${newItem ? "" : "hidden"}`}
        />
      </div>
    </div>
  );
};

export default TodoList;
