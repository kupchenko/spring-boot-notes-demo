import { combineReducers } from 'redux';
import {requestReducer} from "./request";

export default combineReducers({
    request: requestReducer
});