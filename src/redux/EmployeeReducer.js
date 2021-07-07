import axios from "axios";

const initState = {
  employeeList: [],
  progress: false,
};

// ACTION TYPES :: EMPLOYEE :: ENTITY1
const PROGRESS_ACTION_TYPE = "PROGRESS_ACTION_TYPE";
const EMPLOYEE_GET_ALL_ACTION_TYPE = "EMPLOYEE_GET_ALL_ACTION_TYPE";

// ACTIONS :: ENTITY 1
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

// REDURE FOR STATE UPDTE
export function EmployeeReducer(state = initState, action) {
  switch (action.type) {
    case EMPLOYEE_GET_ALL_ACTION_TYPE:
      return { ...state, employeeList: action.payload };

    case PROGRESS_ACTION_TYPE:
      return { ...state, progress: action.payload };

    default:
      return state;
  }
}
