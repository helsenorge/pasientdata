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
      return{
        ...state,
        googleId: action.googleId,
        firstname: action.firstname, 
        lastname: action.lastname, 
        fullname: action.firstname + " " + action.lastname, 
        email: action.email,
        image: action.image,
        datasets: action.datasets
      }
    }

    default:
      return state;
  }
}