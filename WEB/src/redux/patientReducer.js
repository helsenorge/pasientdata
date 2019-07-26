import { SET_PATIENT, SET_GOALS } from "./actionType";
import defaultGoals from "../defaultGoals.js";

const initialState = {
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

    default:
      return state;
  }
}
