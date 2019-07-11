import { IS_LOGGED_IN } from "./actionType";

const initialState = {
  isLoggedin: false,
};

export default function baseInfoReducer(state = initialState, action) {
  switch (action.type) {

    case IS_LOGGED_IN: {
      return{
        ...state,
        isLoggedin: action.isLoggedin
      }
    }

    default:
      return state;
  }
}
