import { createSelector } from "reselect";
import { AppState } from "../../types";

export const selectUserState: (s: AppState) => AppState["user"] = ({ user }) =>
  user;

export const selectUser = createSelector(selectUserState, ({ user }) => user);
