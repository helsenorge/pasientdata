import { SET_PATIENT } from './actionType';

const initialState = {
  googleId: "",
  firstname: "",
  lastname: "",
  fullname: "",
  email: "",
  image: "",
  datasets: []
};

export default function patientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PATIENT: {
      let nextState = Object.assign({}, state);
      nextState.googleId = action.googleId
      nextState.firstname = action.firstname
      nextState.lastname = action.lastname
      nextState.fullname = action.firstname + " " + action.lastname
      nextState.email = action.email
      nextState.image = action.image
      nextState.datasets = action.datasets
      return nextState;
    }

    default:
      return state;
  }
}