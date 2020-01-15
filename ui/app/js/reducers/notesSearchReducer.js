export const C_NOTES_SEARCH_IS_LOADING = 'C_NOTES_SEARCH_IS_LOADING';
export const C_NOTES_SEARCH_LOAD_SUCCESS = 'C_NOTES_SEARCH_LOAD_SUCCESS';
export const C_NOTES_SEARCH_LOAD_FAILURE = 'C_NOTES_SEARCH_LOAD_FAILURE';
export const C_NOTE_SELECT = 'C_NOTE_SELECT';

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