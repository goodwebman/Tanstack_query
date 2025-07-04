import { useUser } from "../auth/useUser";
import { useCreateTodo } from "./useCreateTodo";
import { useDeleteTodo } from "./useDeleteTodo";
import { useTodoList } from "./useTodoList";
import { useToggleTodo } from "./useToggleTodo";

const TodoList = () => {
  const { todoItems } = useTodoList();

  const createTodo = useCreateTodo();

  const deleteTodo = useDeleteTodo();
  const user = useUser();
  const { toggleTodo } = useToggleTodo();

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-10 ">
      <h1 className="text-3xl font-bold underline mb-5">
        TodoList {user.data?.login}
      </h1>
      <form className="flex gap-2 mb-5" onSubmit={createTodo.handleCreate}>
        <input
          className="rounded p-2 border border-teal-500"
          type="text"
          name="text"
        />
        <button
          disabled={createTodo.isLoading}
          type="submit"
          className="rounded p-2 border border-teal-500 disabled:opacity-50"
        >
          Создать
        </button>
      </form>
      <div className={`flex flex-col gap-4`}>
        {todoItems?.map((todo) => (
          <div
            className="border border-slate-300 rounded p-3 flex justify-between"
            key={todo.id}
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id, todo.done)}
            />
            {todo.text}

            <button
              className="text-rose-500 font-bold disabled:text-rose-300"
              onClick={() => deleteTodo.handleDelete(todo.id)}
              disabled={deleteTodo.getIsPending(todo.id)}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
