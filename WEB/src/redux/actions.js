import {
  SET_PATIENT,
  SET_ACTIVE_LINK,
  HIDE_MENU_BAR,
  IS_LOGGED_IN
} from "./actionType";

export const addInfo = (googleId, firstname, lastname, email, image, datasets) => {
  return dispatch => dispatch({ type: SET_PATIENT, googleId, firstname, lastname, email, image, datasets });
};

export const onSetActiveLink = (activeLink) => {
  return dispatch => dispatch({ type: SET_ACTIVE_LINK, activeLink });
};

export const onHideMenuBar = (hideMenuBar) => {
  return dispatch => dispatch({ type: HIDE_MENU_BAR, hideMenuBar });
};

export const onLoggedIn = (isLoggedin) => {
  return dispatch => dispatch({ type: IS_LOGGED_IN, isLoggedin });
};
