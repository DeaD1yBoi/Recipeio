import { UseStatePostProps } from "@/types";
import { isHaveLongWord } from "@/utils";
import { Dispatch, SetStateAction, useState } from "react";

interface Props extends UseStatePostProps {
  fieldToUpdate: keyof {
    ingredients: Array<string>;
    recipeInst: Array<string>;
    tags: Array<string>;
  };
  Numbers?: boolean;
  EnterOnSpace?: boolean;
}

export default function useTodoHooks(props: Props) {
  const { post, setPost, fieldToUpdate, EnterOnSpace, Numbers } = props;
  const [newItem, setNewItem] = useState("");
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const handleCreatePost = () => {
    if (isHaveLongWord(newItem))
      return alert("You can not use word longer than 15 characters");
    if (!newItem) return alert("You can not add empty item");
    if (post[fieldToUpdate].includes(newItem) || post[fieldToUpdate].includes(`#${newItem}`)) {
      return alert("Item already exists. Please enter a unique item.");
    }
    setPost({
      ...post,
      [fieldToUpdate]: [
        ...post[fieldToUpdate],
        fieldToUpdate === "tags"
          ? `#${newItem.replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "")}`
          : fieldToUpdate !== "recipeInst" && newItem.includes(",")
          ? newItem.replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "")
          : newItem,
      ],
    });
    setNewItem("");
  };

  const handleSaveTask = (index: number) => {
    if (fieldToUpdate !== "tags" && isHaveLongWord(editText))
      return alert("You can not use word longer than 15 characters");
      if (post[fieldToUpdate].includes(newItem) || post[fieldToUpdate].includes(`#${newItem}`)) {
        return alert("Item already exists. Please enter a unique item.");
      }
    setPost((prevPost) => ({
      ...prevPost,
      [fieldToUpdate]: prevPost[fieldToUpdate].map((item, i) =>
        i === index
          ? fieldToUpdate === "tags"
            ? `#${editText.replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "")}`
            : fieldToUpdate !== "recipeInst"
            ? editText.replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, "")
            : editText
          : item
      ),
    }));
    setEditText("");
    setEditingTask(null);
  };

  const handleEditTask = (index: number) => {
    setEditText(post[fieldToUpdate][index]);
    setEditingTask(index);
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = post[fieldToUpdate].filter((_, i) => i !== index);
    setPost({ ...post, [fieldToUpdate]: updatedTasks });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((EnterOnSpace && e.key === " ") || e.key === "Enter") {
      e.preventDefault();
      handleCreatePost();
    }
  };

  return {
    newItem,
    setNewItem,
    editingTask,
    setEditingTask,
    handleCreatePost,
    handleEditTask,
    handleSaveTask,
    handleDeleteTask,
    handleKeyDown,
    Numbers,
    editText,
    setEditText,
  };
}
