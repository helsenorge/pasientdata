import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import patientReducer from "./patientReducer";
import baseInfoReducer from "./baseInfoReducer";
import thunk from "redux-thunk";
import persistDataLocally from "./persistData";
// import {initialState} from "./patientReducer"

const reducer = combineReducers({
  patient: patientReducer,
  baseInfo: baseInfoReducer
});

// Started on persisting the state, but not nessecary yet, might use later

/* let retrievedState;
try {
  retrievedState = sessionStorage.getItem("reduxStore");
  if (retrievedState === null) {
    retrievedState = {patient: initialState};
  }
  retrievedState = JSON.parse(retrievedState);
} catch (err) {
  retrievedState = {};
} */

const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  //retrievedState,
  composeEnhancers(applyMiddleware(...middlewares, persistDataLocally))
);

export default store;
