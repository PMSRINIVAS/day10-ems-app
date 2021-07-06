import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import axios from "axios";

const initState = {
  employeeList: [],
  progress: false,

  //AUTH FAILS=> TRUE
  authFailure: false,
  authSuccess: false,
};

// ACTION TYPES :: EMPLOYEE :: ENTITY1
const PROGRESS_ACTION_TYPE = "PROGRESS_ACTION_TYPE";
const AUTH_FAILURE_ACTION_TYPE = "AUTH_FAILURE_ACTION_TYPE";
const AUTH_SUCCESS_ACTION_TYPE = "AUTH_SUCCESS_ACTION_TYPE";

const EMPLOYEE_GET_ALL_ACTION_TYPE = "EMPLOYEE_GET_ALL_ACTION_TYPE";
const EMPLOYEE_GET_BY_ID_ACTION_TYPE = "EMPLOYEE_GET_BY_ID_ACTION_TYPE";
const EMPLOYEE_CREATE_ACTION_TYPE = "EMPLOYEE_CREATE_ACTION_TYPE";
const EMPLOYEE_UPDATE_ACTION_TYPE = "EMPLOYEE_UPDATE_ACTION_TYPE";
const EMPLOYEE_DELETE_ACTION_TYPE = "EMPLOYEE_DELETE_ACTION_TYPE";

// ACTIONS
export const getAllEmployeeAction = () => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const url = `http://localhost:8080/api/v1/employee/get`;
    const response = await axios.get(url);

    // console.log(response);

    // UI UPDATE
    dispatch({ type: "EMPLOYEE_GET_ALL_ACTION_TYPE", payload: response.data });
  };
};

export const createEmployeeAction = (payload) => {
  return async (dispatch) => {
    //MAKING THE SERVER CALL
    const url = `http://localhost:8080/api/v1/employee/post`;
    await axios.post(url, payload);

    // update the ui. TODO
    dispatch({ type: PROGRESS_ACTION_TYPE, payload: true });

    //after 5 seconds PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: PROGRESS_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const deleteEmployeeAction = (payload) => {
  return async (dispatch) => {
    //MAKE AN API/SERVER CALL
    const url = `http://localhost:8080/api/v1/employee/delete/${payload.id}`;
    await axios.delete(url);

    //UPDATE THE UI TODO :: Fetch the updated list
    dispatch(getAllEmployeeAction());
  };
};

//ACTION TYPE FOR USER :: ENTITY2
const USER_CREATE_ACTION_TYPE = "USER_CREATE_ACTION_TYPE";

export const userCreateAction = (payload) => {
  return async (dispatch) => {
    //API CALL :: SERVER CALL
    const url = `http://localhost:8080/api/v1/employee/post`;
    await axios.post(url, payload);

    //TODO for UI
    dispatch({ type: PROGRESS_ACTION_TYPE, payload: true });

    //after 5 seconds PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: PROGRESS_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const authenticateUserAction = (payload) => {
  return async (dispatch) => {
    //API CALL :: Verification
    const url = `http://localhost:8080/api/v1/employee/login`;
    const response = await axios.post(url, payload);

    if (response.data !== "") {
      //VALID USER
      //UPDATE THE UI
      dispatch({ type: AUTH_SUCCESS_ACTION_TYPE, payload: true });

      //Page is redirection so no alert until 5 secs..
    } else {
      //INVALID USER :: AUTH FAILS
      //UPDATE THE UI
      dispatch({ type: AUTH_FAILURE_ACTION_TYPE, payload: true });

      //after 5 seconds PROGRESS :: FALSE AGAIN
      setTimeout(() => {
        dispatch({ type: AUTH_FAILURE_ACTION_TYPE, payload: false });
      }, 5000);
    }
  };
};

// REDURE FOR STATE UPDTE
function EmployeeReducer(state = initState, action) {
  switch (action.type) {
    case EMPLOYEE_GET_ALL_ACTION_TYPE:
      return { ...state, employeeList: action.payload };

    case PROGRESS_ACTION_TYPE:
      return { ...state, progress: action.payload };

    case AUTH_FAILURE_ACTION_TYPE:
      return { ...state, authFailure: action.payload };

    case AUTH_SUCCESS_ACTION_TYPE:
      return { ...state, authSuccess: action.payload };

    default:
      return state;
  }
}

// MIDDLEWARE FOR THE ASYNC OPOERATION
const store = createStore(EmployeeReducer, applyMiddleware(thunk));
export { store };
