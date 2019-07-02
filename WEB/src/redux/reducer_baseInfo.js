import { CREATE_CONNECTION, SET_ACTIVE_LINK, SET_IS_WAITING, HIDE_MENU_BAR } from './actionType';

function initialState() {
  return {
    accessToken: '',
    activeLink: '',
    isWaiting: false,
    isLoggedId: false,
    hideMenuBar: false,
    hideMenuBarBottom: false,
  }
}

function saveToLocalstorage(accessToken) {
  localStorage.setItem('accessToken', JSON.stringify(accessToken));
}

export default function (state = initialState(), action) {
  switch (action.type) {

    case CREATE_CONNECTION: {
      let nextState = Object.assign({}, state)
      nextState.accessToken = action.accessToken;
      saveToLocalstorage(action.accessToken);
      return nextState;
    }
    case SET_ACTIVE_LINK: {
      let nextState = Object.assign({}, state)
      nextState.activeLink = action.activeLink;
      return nextState;
    }
    case SET_IS_WAITING: {
      let nextState = Object.assign({}, state)
      nextState.isWaiting = action.isWaiting;
      return nextState;
    }
    case HIDE_MENU_BAR: {
      let nextState = Object.assign({}, state)
      nextState.hideMenuBar = action.hideMenuBar;
      nextState.hideMenuBarBottom = action.hideMenuBarBottom;
      return nextState;
    }
    default: return state;
  }
}