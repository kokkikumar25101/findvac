import * as types from "../actions/actionTypes";
import initialState from "./initialState";


export default function centerReducer(state = initialState.center, action) {
  switch (action.type) {
    case types.LOAD_CENTERS_SUCCESS:
      // debugger
      var centersMap = action.centers.reduce(function(map, obj) {
        map[obj.id] = obj;
        return map;
      }, {});
      return {
        ...state,
        dataList: action.centers,
        dataMap: centersMap
      }
    case types.ADD_CENTERS:
      return state;
    case types.UPDATE_SELECTED_LOCATE_CENTER:
      return {
        ...state,
        selectedLocateCenter: action.selectedLocateCenter
      };
    default:
      return state;
  }
}
