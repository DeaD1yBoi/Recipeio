import { UseStatePostProps } from "@/types";
import { isHaveLongWord } from "@/utils";
import { useState } from "react";

interface Props extends UseStatePostProps {
  fieldToUpdate: keyof {
    ingredients: { name: string; amount: string }[];
    recipeInst: Array<string>;
    tags: Array<string>;
  };
  Numbers?: boolean;
  EnterOnSpace?: boolean;
}

export default function useTodoHooks(props: Props) {
  const { post, setPost, fieldToUpdate, EnterOnSpace, Numbers } = props;
  const [newItem, setNewItem] = useState("");
  const [amount, setAmount] = useState("");
  const [autoCompleteList, setAutoCompleteList] = useState<string[]>([]);
  const [editAutoCompleteList, setEditAutoCompleteList] = useState<string[]>(
    []
  );
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [editAmount, setEditAmount] = useState("");

  const handleCreatePost = () => {
    if (fieldToUpdate === "ingredients") {
      handleCreatePostWithAmount();
    } else {
      if (isHaveLongWord(newItem))
        return alert("You can not use word longer than 15 characters");
      if (!newItem) return alert("You can not add empty item");
      if (
        post[fieldToUpdate].includes(newItem) ||
        post[fieldToUpdate].includes(`#${newItem}`)
      ) {
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
    }
  };

  const handleCreatePostWithAmount = () => {
    if (!newItem || !amount) {
      return alert("Both ingredient and amount are required");
    }

    if (isHaveLongWord(newItem)) {
      return alert(
        "You can not use a word longer than 15 characters for the ingredient"
      );
    }

    const newItemObj = { name: newItem, amount };

    if (post.ingredients.some((item) => item.name === newItemObj.name)) {
      return alert(
        "Ingredient already exists. Please enter a unique ingredient."
      );
    }

    setPost({
      ...post,
      [fieldToUpdate]: [...post[fieldToUpdate], newItemObj],
    });

    setNewItem("");
    setEditAmount("");
    setAmount("");
  };

  const handleSaveTask = (index: number) => {
    if (fieldToUpdate === "ingredients") {
      handleSaveTaskWithAmount(index);
    } else {
      if (fieldToUpdate !== "tags" && isHaveLongWord(editText))
        return alert("You can not use word longer than 15 characters");
      if (
        post[fieldToUpdate].includes(newItem) ||
        post[fieldToUpdate].includes(`#${newItem}`)
      ) {
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
    }
  };

  const handleSaveTaskWithAmount = (index: number) => {
    if (isHaveLongWord(editText))
      return alert("You can not use word longer than 15 characters");

    const updatedTasks = post.ingredients.map((item, i) =>
      i === index ? { name: editText, amount: editAmount } : item
    );

    setPost({
      ...post,
      ingredients: updatedTasks,
    });

    setEditText("");
    setEditAmount("");
    setEditingTask(null);
  };

  const handleEditTask = (index: number) => {
    if (fieldToUpdate === "ingredients") {
      setEditText(post.ingredients[index].name);
      setEditAmount(post.ingredients[index].amount);
    } else setEditText(post[fieldToUpdate][index]);
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
    autoCompleteList,
    setAutoCompleteList,
    editAutoCompleteList,
    setEditAutoCompleteList,
    amount,
    setAmount,
    editAmount,
    setEditAmount,
  };
}
