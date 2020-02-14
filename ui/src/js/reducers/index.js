import {combineReducers} from 'redux';
import {notesSearchReducer} from "./notes-search-reducer";
import {noteFetchReducer} from "./note-fetch-reducer";
import {noteCreateReducer} from "./note-create-reducer";
import {noteUpdateReducer} from "./note-update-reducer";
import {noteEditingReducer} from "./note-editing-reducer";
import {notesSelectReducer} from "./notes-select-reducer";
import {noteCreatingReducer} from "./note-creating-reducer";

export default combineReducers({
    notesSearch: notesSearchReducer,
    noteFetch: noteFetchReducer,
    noteCreate: noteCreateReducer,
    noteCreating: noteCreatingReducer,
    noteUpdate: noteUpdateReducer,
    noteEditing: noteEditingReducer,
    selectedNote: notesSelectReducer
});