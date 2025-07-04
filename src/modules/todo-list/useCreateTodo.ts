import { useAppDispatch } from "../../shared/redux";
import { createTodoThunk, useCreateLoading } from "./createTodoThunk";

export const useCreateTodo = () => {
  const dispatch = useAppDispatch();
  const isLoading = useCreateLoading()

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const text = String(formData.get("text") ?? "");
    dispatch(createTodoThunk(text));

    e.currentTarget.reset();
  };

  return {
    handleCreate,
    isLoading
  };
};
