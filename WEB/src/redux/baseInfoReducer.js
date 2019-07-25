import { IS_LOGGED_IN, SET_VIEW, SET_NR_OF_INTERVALS_BACK } from "./actionType";

const initialState = {
  isLoggedin: false,
  view: "2weeks",
  nrOfIntervalsBack: 0
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

    case SET_NR_OF_INTERVALS_BACK: {
      return {
        ...state,
        nrOfIntervalsBack: action.nrOfIntervalsBack
      };
    }

    default:
      return state;
  }
}
