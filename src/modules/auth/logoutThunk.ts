import { queryClient } from "../../shared/api/queryClient";
import type { AppThunk } from "../../shared/redux";
import { authSlice } from "./authSlice";

export const logoutThunk = (): AppThunk => async (dispatch) => {
  dispatch(authSlice.actions.removeUser());
  queryClient.removeQueries();
  localStorage.removeItem("userId");
};
