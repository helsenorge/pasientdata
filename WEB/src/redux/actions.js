import {
  SET_PATIENT,
  IS_LOGGED_IN,
  SET_GOALS,
  SET_VIEW,
  SET_NR_OF_INTERVALS_BACK
} from "./actionType";

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
export const setView = view => {
  return dispatch => dispatch({ type: SET_VIEW, view });
};

export const setNrOfIntervalsBack = setNrOfIntervalsBack => {
  return dispatch =>
    dispatch({ type: SET_NR_OF_INTERVALS_BACK, setNrOfIntervalsBack });
};
