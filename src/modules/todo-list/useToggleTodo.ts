import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api";

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation({
    mutationFn: todoListApi.updateTodo,
    onMutate: async newTodo => {
      await queryClient.cancelQueries({
        queryKey: [todoListApi.baseKey]
      });

      const previousTodos = queryClient.getQueryData(
        todoListApi.getListsQueryOptions().queryKey
      );
      queryClient.setQueryData(
        todoListApi.getListsQueryOptions().queryKey,
        old =>
          old?.map(todo =>
            todo.id === newTodo.id ? { ...todo, ...newTodo } : todo
          )
      );

      return { previousTodos };
    },

    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(
          todoListApi.getListsQueryOptions().queryKey,
          context.previousTodos
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] });
    }
  });

  const toggleTodo = (id: string, done: boolean) => {
    updateTodoMutation.mutate({
      id,
      done: !done
    });
  };

  return {
    toggleTodo
  };
};
