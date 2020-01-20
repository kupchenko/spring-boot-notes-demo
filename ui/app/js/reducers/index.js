import {combineReducers} from 'redux';
import {notesSearchReducer} from "./notesSearchReducer";
import {noteFetchReducer} from "./noteFetchReducer";
import {notesSearchQueryReducer} from "./notesSearchQueryReducer";
import {noteCreateReducer} from "./noteCreateReducer";

export default combineReducers({
    notesSearch: notesSearchReducer,
    notesSearchQuery: notesSearchQueryReducer,
    noteFetch: noteFetchReducer,
    noteCreate: noteCreateReducer
});