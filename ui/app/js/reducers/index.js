import {combineReducers} from 'redux';
import {notesSearchReducer} from "./notesSearchReducer";
import {noteFetchReducer} from "./noteFetchReducer";
import {notesSearchQueryReducer} from "./notesSearchQueryReducer";
import {noteCreateReducer} from "./noteCreateReducer";
import {noteUpdateReducer} from "./noteUpdateReducer";

export default combineReducers({
    notesSearch: notesSearchReducer,
    notesSearchQuery: notesSearchQueryReducer,
    noteFetch: noteFetchReducer,
    noteCreate: noteCreateReducer,
    noteUpdate: noteUpdateReducer
});