import axios from "axios";

const initState = {
  progress: false,

  //AUTH FAILS=> TRUE
  authFailure: false,
  authSuccess: false, //once user signed in successfully, store this info in session/localstorage
};

// ACTION TYPES :: EMPLOYEE :: ENTITY1
const PROGRESS_ACTION_TYPE = "PROGRESS_ACTION_TYPE";
const AUTH_FAILURE_ACTION_TYPE = "AUTH_FAILURE_ACTION_TYPE";
const AUTH_SUCCESS_ACTION_TYPE = "AUTH_SUCCESS_ACTION_TYPE";

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

      //Will store the success information in storage
      //TODO will save into the storage
      localStorage.setItem("authSuccess", "1");

      //Page is redirected to another page. so no alert until 5 secs..
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

export const signOutAction = () => {
  return async (dispatch) => {
    console.log("signout");

    //remove the storage/cookies...
    localStorage.removeItem("authSuccess", "1");

    dispatch({ type: AUTH_SUCCESS_ACTION_TYPE, payload: false });
  };
};

// REDURE FOR STATE UPDTE
export function UserReducer(state = initState, action) {
  switch (action.type) {
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
