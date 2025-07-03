const BASE_URL = "http://localhost:3000";

export type PaginatedResult<T> = {
  data: T[];
  prev: number | null;
  next: number | null;
  pages: number;
  last: number;
  first: number;
  items: number;
};

export type TodoDto = {
  id: string;
  text: string;
  done: boolean;
};

export const todoListApi = {
  getLists: (
    { page }: { page: number },
    { signal }: { signal: AbortSignal }
  ) => {
    return fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=10`, {
      signal
    }).then(res => res.json() as Promise<PaginatedResult<TodoDto>>);
  }
};
