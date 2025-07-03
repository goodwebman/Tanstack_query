import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { todoListApi } from "./api";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const text = String(formData.get("text") ?? "");

    createTodoMutation.mutate(
      {
        id: nanoid(),
        done: false,
        text: text,
        userId: "1"
      },
      {
        onSuccess() {
          queryClient.invalidateQueries({
            queryKey: [todoListApi.baseKey]
          });
        },
        onError(error) {
          console.error("Create todo failed:", error);
        }
      }
    );

    e.currentTarget.reset();
  };

  return {
    handleCreate
  };
};
