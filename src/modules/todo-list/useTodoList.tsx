import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";

export const useTodoList = () => {
  const { data: todoItems, error, isLoading } = useQuery({
    ...todoListApi.getListsQueryOptions(),

    select: data => data.toReversed()
  });

  return { error, todoItems, isLoading };
};

// !for infinity scroll!
// export function useIntersection(onIntersect: () => void) {
//   const unsubscribe = useRef(() => {});
//   return useCallback((el: HTMLDivElement | null) => {
//     const observer = new IntersectionObserver(entries => {
//       entries.forEach(intersection => {
//         if (intersection.isIntersecting) {
//           onIntersect();
//         }
//       });
//     });
//     if (el) {
//       observer.observe(el);
//       unsubscribe.current = () => observer.disconnect();
//     } else {
//       unsubscribe.current();
//     }
//   }, []);
// }
