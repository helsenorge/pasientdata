import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import patientReducer from './redux/patientReducer';
import baseInfoReducer from './redux/baseInfoReducer';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  patient: patientReducer,
  baseInfo: baseInfoReducer
});

const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(...middlewares)
));

export default store;
