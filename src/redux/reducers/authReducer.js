import * as types from "../actions/actionTypes";
import initialState from "./initialState";


export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.LOAD_LOGIN_USER_ATTRIBUTES_SUCCESS:
      return {
        ...state,
        // user: {
        //   ...state.pages, [action.pageId]: action.pageObj
        // }
        user: action.user,
        isAuthUser: true
      }
    case types.LOGOUT_USER_REMOVE_ATTRIBUTES_SUCCESS:
      debugger
      return {
        ...state,
        user: action.user,
        isAuthUser: false
      }
    case types.UPDATE_LOGIN_STATE:
      return {
        ...state,
        isAuthUser: action.state
      }
    default:
      return state;
  }
}
