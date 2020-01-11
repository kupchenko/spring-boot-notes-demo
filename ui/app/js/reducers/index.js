import {combineReducers} from 'redux';
import {notesSearchReducer} from "./notesSearchReducer";
import {noteFetchReducer} from "./noteFetchReducer";

export default combineReducers({
    notesSearch: notesSearchReducer,
    noteFetch: noteFetchReducer
});