import { SET_USER, CREATE_CONNECTION, } from './actionType';

function initialState() {
  return {
    userId: '',
    name: '',
    image: '',
    email: '',
    steps: []
  }
}

export default function (state = initialState(), action) {
  switch (action.type) {

    case SET_USER: {
      let nextState = Object.assign({}, state)
      nextState.userId = action.userId;
      nextState.name = action.name;
      nextState.email = action.email;
      nextState.image = action.image;
      nextState.steps = action.steps;
      return nextState;
    }
    case CREATE_CONNECTION: {
      let nextState = Object.assign({}, state)
      nextState.accessToken = action.accessToken;
      return nextState;
    }
  
    default: return state;
  }
}