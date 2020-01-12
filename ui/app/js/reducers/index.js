import {combineReducers} from 'redux';
import {notesSearchReducer} from "./notesSearchReducer";
import {noteFetchReducer} from "./noteFetchReducer";
import {notesSearchQueryReducer} from "./notesSearchQueryReducer";

export default combineReducers({
    notesSearch: notesSearchReducer,
    notesSearchQuery: notesSearchQueryReducer,
    noteFetch: noteFetchReducer
});