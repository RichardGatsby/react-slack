import { User } from "../../types";
import * as actionTypes from "./actionTypes";

export type UserAction = {
  type: string;
  user: User | null;
};

export function setUser(user: User | null) {
  const action: UserAction = {
    type: actionTypes.SET_USER,
    user,
  };
  return action;
}
