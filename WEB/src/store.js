import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import patientReducer from "./redux/patientReducer";
import baseInfoReducer from "./redux/baseInfoReducer";
import thunk from "redux-thunk";
import persistDataLocally from "./persistData";

const reducer = combineReducers({
  patient: patientReducer,
  baseInfo: baseInfoReducer
});

let retrievedState;
try {
  retrievedState = sessionStorage.getItem("reduxStore");
  if (retrievedState === null) {
    retrievedState = {};
  }
  retrievedState = JSON.parse(retrievedState);
} catch (err) {
  retrievedState = {};
}

const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  retrievedState,
  composeEnhancers(applyMiddleware(...middlewares, persistDataLocally))
);

export default store;
