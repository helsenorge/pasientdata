import { SET_ACTIVE_LINK, IS_LOGGED_IN, HIDE_MENU_BAR } from "./actionType";

const initialState = {
  activeLink: "",
  isLoggedin: false,
  hideMenuBar: false
};

export default function baseInfoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_LINK: {
      return{
        ...state,
        activeLink: action.activeLink
      }
    }
    case IS_LOGGED_IN: {
      return{
        ...state,
        isLoggedin: action.isLoggedin
      }
    }
    case HIDE_MENU_BAR: {
      return{
        ...state,
        hideMenuBar: action.hideMenuBar
      }
    }

    default:
      return state;
  }
}
