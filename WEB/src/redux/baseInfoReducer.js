import { SET_ACTIVE_LINK, IS_LOGGED_IN, HIDE_MENU_BAR } from "./actionType";

const initialState = {
  accessToken: "",
  activeLink: "",
  isLoggedin: false,
  hideMenuBar: false
};

export default function baseInfoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_LINK: {
      let nextState = Object.assign({}, state);
      nextState.activeLink = action.activeLink;
      return nextState;
    }
    case IS_LOGGED_IN: {
      let nextState = Object.assign({}, state);
      nextState.isLoggedin = action.isLoggedin;
      return nextState;
    }
    case HIDE_MENU_BAR: {
      let nextState = Object.assign({}, state);
      nextState.hideMenuBar = action.hideMenuBar;
      return nextState;
    }

    default:
      return state;
  }
}
