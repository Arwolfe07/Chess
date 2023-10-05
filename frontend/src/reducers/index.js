import { combineReducers } from "redux";
import gameReducer from "./gameReducer";
import authReducer from "./authReducer";
import currentUserReducer from "./currentUserReducer";
export default combineReducers({ gameReducer, authReducer, currentUserReducer });