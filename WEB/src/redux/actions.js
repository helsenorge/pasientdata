import {
  SET_PATIENT,
  IS_LOGGED_IN
} from "./actionType";

export const addInfo = (googleId, firstname, lastname, email, image, datasets) => {
  return dispatch => dispatch({ type: SET_PATIENT, googleId, firstname, lastname, email, image, datasets });
};
export const onLoggedIn = (isLoggedin) => {
  return dispatch => dispatch({ type: IS_LOGGED_IN, isLoggedin });
};
