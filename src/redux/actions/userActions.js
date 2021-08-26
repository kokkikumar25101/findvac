import * as types from "./actionTypes";

export function loadLoginUserAttributes(user) {
  return { type: types.LOAD_LOGIN_USER_ATTRIBUTES_SUCCESS, user };
}

export function logoutUserRemoveAttributes(user) {
  return { type: types.LOGOUT_USER_REMOVE_ATTRIBUTES_SUCCESS, user };
}