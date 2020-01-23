import {
    C_NOTE_SELECT,
    C_NOTES_REFRESH_AFTER_UPDATE,
    C_NOTES_SEARCH_IS_LOADING,
    C_NOTES_SEARCH_LOAD_FAILURE,
    C_NOTES_SEARCH_LOAD_SUCCESS
} from "../actions/action-type";

const notesSearchInitialState = {
    isLoading: false,
    hasErrors: false,
    isSuccess: false,
    errors: null,
    response: null
};

export const notesSearchReducer = (state = notesSearchInitialState, action) => {

    switch (action.type) {

        case C_NOTES_SEARCH_IS_LOADING:
            return {...state, isLoading: action.isLoading, hasErrors: false};

        case C_NOTES_SEARCH_LOAD_SUCCESS: {
            let newResponse = selectNoteByIndex(action.response, 0);
            return {...state, isSuccess: true, isLoading: false, hasErrors: false, response: newResponse};
        }

        case C_NOTES_SEARCH_LOAD_FAILURE: {
            return {...state, isSuccess: false, isLoading: false, hasErrors: true, errors: action.errors};
        }

        case C_NOTES_REFRESH_AFTER_UPDATE: {
            let note = action.note;
            let newResponse = refreshUpdatedNote(state.response, note);
            return {...state, isSuccess: false, isLoading: false, hasErrors: false, response: newResponse};
        }

        case C_NOTE_SELECT: {
            let id = action.id;
            let notesData = state.response;
            let newResponse = selectNoteById(notesData, id);
            return {...state, isSuccess: true, isLoading: false, hasErrors: false, response: newResponse};
        }

        default:
            return state
    }
};

function refreshUpdatedNote(response, newNote) {
    let noteWithShortenContent = {
        ...newNote,
        content: newNote.content.substr(0, 20) + '...'
    };
    let notes = response.notes.map((note) => {
        if (note.id === newNote.id) {
            return {
                ...noteWithShortenContent,
                selected: true
            }
        }
        return {
            ...note,
            selected: false
        }
    });
    return {
        notes: notes,
        pagination: response.pagination
    };
}

function selectNoteById(notesData, id) {
    let notes = notesData.notes.map((note) => {
        if (note.id === id) {
            return {
                ...note,
                selected: true
            }
        }
        return {
            ...note,
            selected: false
        }
    });
    return {
        notes: notes,
        pagination: notesData.pagination
    };
}

function selectNoteByIndex(notesData) {
    if (!notesData || !notesData.notes.length) {
        return notesData;
    }
    let id = notesData.notes[0].id;
    return selectNoteById(notesData, id)
}