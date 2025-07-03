import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/api/queryClient";

import TodoList from "../modules/todo-list/todo-list";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
