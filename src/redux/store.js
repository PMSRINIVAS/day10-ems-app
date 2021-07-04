import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const initState = {
  employeeList: [],
};

function EmployeeReducer(state = initState, action) {
  return state;
}

//MIDDLEWARE FOR THE ASYNC OPERATION
const store = createStore(EmployeeReducer, applyMiddleware());

export { store };
