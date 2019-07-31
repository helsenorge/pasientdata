import { SET_PATIENT, SET_GOALS, CHANGE_GOAL } from "./actionType";
import defaultGoals from "../defaultGoals.js";

export const initialState = {
  googleId: "",
  firstname: "",
  lastname: "",
  fullname: "",
  email: "",
  image: "",
  datasets: [],
  goals: defaultGoals
};

export default function patientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PATIENT: {
      return {
        ...state,
        googleId: action.googleId,
        firstname: action.firstname,
        lastname: action.lastname,
        fullname: action.firstname + " " + action.lastname,
        email: action.email,
        image: action.image,
        datasets: action.datasets
      };
    }

    case SET_GOALS: {
      return {
        ...state,
        goals: action.goals
      };
    }

    case CHANGE_GOAL: {
      let newGoals = { ...state.goals };
      newGoals[action.goalName] = action.goal;
      return {
        ...state,
        goals: newGoals
      };
    }

    default:
      return state;
  }
}
