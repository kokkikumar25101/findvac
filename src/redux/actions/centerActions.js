import * as types from "./actionTypes";
import API, { graphqlOperation } from '@aws-amplify/api';
import { listVaccinationCenters } from '../../graphql/queries';
import {createVaccinationCenter } from '../../graphql/mutations';

export function loadCenters() {
  // debugger
  return function(dispatch) {
    return API.graphql(graphqlOperation(listVaccinationCenters)).then(result => {
      var listCenters = result.data.listVaccinationCenters.items;
      console.log(listCenters.length)
      // debugger
      dispatch({ 
        type: types.LOAD_CENTERS_SUCCESS, 
        centers: listCenters
      })
    })
  };
  
}

export function addCenters(inputData) {
  for(let input of inputData) {
    console.log(input)
    API.graphql(graphqlOperation(createVaccinationCenter, { input : input })).then(result => {
      return { type: types.ADD_CENTERS};
    })
  }
}

export function updateSelectedLocateCenter(center) {
  // debugger
  return { 
    type: types.UPDATE_SELECTED_LOCATE_CENTER, 
    selectedLocateCenter: center
  }
  
}
