import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { todoListApi } from "./api";

const TodoList = () => {
  const [page, setPage] = useState<number>(1);
  const [enabled, setEnabled] = useState(false);
  const { data: todoItems, error, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["tasks", "list", page],
    queryFn: meta => todoListApi.getLists({ page }, meta),
    placeholderData: keepPreviousData,
    enabled: enabled
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-10">
      <h1 className="text-3xl font-bold underline mb-5">TodoList</h1>
      <button className="pb-5" onClick={() => setEnabled(e => !e)}>
        Toggle enabled
      </button>
      <div
        className={
          `flex flex-col gap-4` + (isPlaceholderData ? " opacity-50" : "")
        }
      >
        {todoItems?.data.map(todo => (
          <div className="border border-slate-300 rounded p-3 " key={todo.id}>
            {todo.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setPage(page => Math.max(page - 1, 1))}
          className="p-3 rounded border border-teal-500"
        >
          prev
        </button>
        <button
          onClick={() =>
            setPage(page => Math.min(page + 1, todoItems?.pages ?? 1))
          }
          className="p-3 rounded border border-teal-500"
        >
          next
        </button>
      </div>
    </div>
  );
};

export default TodoList;
