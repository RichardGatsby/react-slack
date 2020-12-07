import { UserState } from "../../types";
import { UserAction } from "./actionCreators";
import * as actionTypes from "./actionTypes";

const initialState: UserState = {
  user: null,
};

const reducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
  }
  return state;
};

export default reducer;
