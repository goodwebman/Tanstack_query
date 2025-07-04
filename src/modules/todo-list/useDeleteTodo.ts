import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    async onSettled() {
      // инвалидация при ошибки или успехе (onSettled = onError & onSuccess)
      queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey]
      });
    },
    //data - сами данные, variables - id-шник что мы передали
    async onSuccess(_, deletedId) {
      queryClient.setQueryData(
        todoListApi.getListsQueryOptions().queryKey,
        todos => todos?.filter(item => item.id !== deletedId)
      );
    }
  });

  return {
    handleDelete: deleteTodoMutation.mutate,
    getIsPending: (id: string) =>
      deleteTodoMutation.isPending && deleteTodoMutation.variables === id
  };
};
