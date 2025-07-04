import { useAppDispatch } from "../../shared/redux";
import { logoutThunk } from "./logoutThunk";

export function LogoutButton() {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(logoutThunk())}
      className="border border-rose-500 p-3 rounded"
    >
      Выход
    </button>
  );
}
