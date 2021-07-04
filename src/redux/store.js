import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import axios from "axios";
import thunk from "redux-thunk";

const initState = {
  employeeList: [],
};

// ACTION TYPES
const EMPLOYEE_GET_ALL_ACTION_TYPE = "EMPLOYEE_GET_ALL_ACTION_TYPE";
const EMPLOYEE_GET_BY_ID_ACTION_TYPE = "EMPLOYEE_GET_BY_ID_ACTION_TYPE";
const EMPLOYEE_CREATE_ACTION_TYPE = "EMPLOYEE_CREATE_ACTION_TYPE";
const EMPLOYEE_UPDATE_ACTION_TYPE = "EMPLOYEE_UPDATE_ACTION_TYPE";
const EMPLOYEE_DELETE_ACTION_TYPE = "EMPLOYEE_DELETE_ACTION_TYPE";

//ACTIONS
export const getAllEmployeeAction = () => {
  return async (dispatch) => {
    //API CALL
    const url = `http://localhost:8080/api/employee/`;
    const response = await axios.get(url);

    console.log(response);

    // UI UPDATE
    dispatch({ type: "EMPLOYEE_GET_ALL_ACTION_TYPE", payload: response.data });
  };
};

export const createEmployeeAction = (payload) => {
  return async (dispatch) => {
    const url = `http://localhost:8080/api/employee/`;
    await axios.post();

    //update the ui.TODO
  };
};

//REDURE FOR STATE UPDATE
function EmployeeReducer(state = initState, action) {
  switch (action.type) {
    case EMPLOYEE_GET_ALL_ACTION_TYPE:
      return { ...state, employeeList: action.payload };

    default:
      return state;
  }
}

//MIDDLEWARE FOR THE ASYNC OPERATION
const store = createStore(EmployeeReducer, applyMiddleware());

export { store };
