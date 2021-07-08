import axios from "axios";

const initState = {
  todoList: [],
  title: "Todo Application Demo",
};

// ACTION TYPES :: EMPLOYEE :: ENTITY1
const TODO_ACTION_TYPE = "TODO_ACTION_TYPE";

//TODO ACTIONS

// REDURE FOR STATE UPDATE
export function TodoReducer(state = initState, action) {
  switch (action.type) {
    case TODO_ACTION_TYPE:
      return { ...state, todoList: action.payload };

    default:
      return state;
  }
}
