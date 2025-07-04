import { useSuspenseQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";

export const useTodoList = () => {
  const { data: todoItems } = useSuspenseQuery({
    ...todoListApi.getListsQueryOptions(),

    select: (data) => data.toReversed(),
  });

  return { todoItems };
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
