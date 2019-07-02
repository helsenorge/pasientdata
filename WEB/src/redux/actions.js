import { CREATE_CONNECTION, SET_ACTIVE_LINK, SET_IS_WAITING, SET_USER, HIDE_MENU_BAR } from './actionType';

export const onLoggedIn = (userId, name, email, image, steps) => {
    return dispatch => dispatch({ type: SET_USER, userId, name, email, image, steps })
}

export const onCreateConnection = (accessToken) => {
  return dispatch => dispatch({ type: CREATE_CONNECTION, accessToken})
}

export const onSetActiveLink = (activeLink) => {
  return dispatch => dispatch({ type: SET_ACTIVE_LINK, activeLink})
}

export const onSetIsWaiting = (isWaiting) => {
  return dispatch => dispatch({ type: SET_IS_WAITING, isWaiting})
}

export const onHideMenuBar = (hideMenuBar, hideMenuBarBottom) => {
  return dispatch => dispatch({ type: HIDE_MENU_BAR, hideMenuBar, hideMenuBarBottom})
}
