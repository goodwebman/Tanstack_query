import { MutationObserver, useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { queryClient } from "../../shared/api/queryClient";
import type { AppThunk } from "../../shared/redux";
import { authApi } from "../auth/api";
import { authSlice } from "../auth/authSlice";
import { todoListApi, type TodoDto } from "./api";

export const createTodoThunk =
  (text: string): AppThunk =>
  async (_, getState) => {
    const userId = authSlice.selectors.userId(getState());

    if (!userId) {
      throw new Error("user not login");
    }

    const user = await queryClient.fetchQuery(authApi.getUserById(userId));
    const newTodo: TodoDto = {
      id: nanoid(),
      done: false,
      text: `${text}. Owner: ${user.login}`,
      userId,
    };

    queryClient.cancelQueries({
      queryKey: [todoListApi.baseKey],
    });

    const prevTasks = queryClient.getQueryData(
      todoListApi.getListsQueryOptions().queryKey,
    );

    queryClient.setQueryData(
      todoListApi.getListsQueryOptions().queryKey,
      (tasks) => [...(tasks ?? []), newTodo],
    );

    try {
      await new MutationObserver(queryClient, {
        mutationFn: todoListApi.createTodo,
      }).mutate(newTodo);
    } catch {
      queryClient.setQueryData(
        todoListApi.getListsQueryOptions().queryKey,
        prevTasks,
      );
    } finally {
      queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey],
      });
    }
  };

export const useCreateLoading = () =>
  useMutation({
    mutationKey: ["create-todo"],
  }).isPending;
