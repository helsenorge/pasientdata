import { IS_LOGGED_IN, SET_VIEW } from "./actionType";

const initialState = {
  isLoggedin: false,
  view: "2weeks"
};

export default function baseInfoReducer(state = initialState, action) {
  switch (action.type) {
    case IS_LOGGED_IN: {
      return {
        ...state,
        isLoggedin: action.isLoggedin
      };
    }

    case SET_VIEW: {
      return {
        ...state,
        view: action.view
      };
    }

    default:
      return state;
  }
}
