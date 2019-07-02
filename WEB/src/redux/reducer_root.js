import { combineReducers } from 'redux';
import UserInfoReducer from './reducer_userInfo';
import BaseInfoReducer from './reducer_baseInfo';

const rootReducer = combineReducers({
  userInfo: UserInfoReducer,
  baseInfo: BaseInfoReducer
});
export default rootReducer;