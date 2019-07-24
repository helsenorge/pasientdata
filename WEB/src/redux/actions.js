import { SET_PATIENT, IS_LOGGED_IN, SET_GOALS } from "./actionType";

export const addInfo = (
  googleId,
  firstname,
  lastname,
  email,
  image,
  datasets
) => {
  return dispatch =>
    dispatch({
      type: SET_PATIENT,
      googleId,
      firstname,
      lastname,
      email,
      image,
      datasets
    });
};
export const onLoggedIn = isLoggedin => {
  return dispatch => dispatch({ type: IS_LOGGED_IN, isLoggedin });
};
export const setGoals = goals => {
  return dispatch => dispatch({ type: SET_GOALS, goals });
};
