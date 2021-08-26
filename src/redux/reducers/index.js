import { combineReducers } from "redux";
import user from "./userReducer";
import auth from "./authReducer";
import center from "./centerReducer";

const rootReducer = combineReducers({
  // user,
  auth,
  center
});

export default rootReducer;
