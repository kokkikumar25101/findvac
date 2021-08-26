import * as types from "../actions/actionTypes";
import initialState from "./initialState";


export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.LOAD_LOGIN_USER_ATTRIBUTES_SUCCESS:
      return action.user;
    case types.LOGOUT_USER_REMOVE_ATTRIBUTES_SUCCESS:
      return action.user;
    default:
      return state;
  }
}
