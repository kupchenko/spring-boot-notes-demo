import {combineReducers} from 'redux';
import {notesSearchReducer} from "./notes-search-reducer";
import {noteFetchReducer} from "./note-fetch-reducer";
import {noteCreateReducer} from "./note-create-reducer";
import {noteUpdateReducer} from "./note-update-reducer";
import {newNoteValuesReducer} from "./new-note-values-reducer";
import {notesSelectReducer} from "./notes-select-reducer";

export default combineReducers({
    notesSearch: notesSearchReducer,
    noteFetch: noteFetchReducer,
    noteCreate: noteCreateReducer,
    noteUpdate: noteUpdateReducer,
    newNoteValues: newNoteValuesReducer,
    selectedNote: notesSelectReducer
});