import {combineReducers} from 'redux';
import {notesSearchReducer} from "./notesSearchReducer";
import {noteFetchReducer} from "./noteFetchReducer";
import {noteCreateReducer} from "./noteCreateReducer";
import {noteUpdateReducer} from "./noteUpdateReducer";
import {newNoteValuesReducer} from "./newNoteValuesReducer";

export default combineReducers({
    notesSearch: notesSearchReducer,
    noteFetch: noteFetchReducer,
    noteCreate: noteCreateReducer,
    noteUpdate: noteUpdateReducer,
    newNoteValues: newNoteValuesReducer
});