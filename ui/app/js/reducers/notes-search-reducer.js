import {
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
    notes: [],
    pagination: null
};

export const notesSearchReducer = (state = notesSearchInitialState, action) => {

    switch (action.type) {

        case C_NOTES_SEARCH_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
                hasErrors: false,
                query: action.searchQuery
            };

        case C_NOTES_SEARCH_LOAD_SUCCESS: {
            return {
                ...state,
                isSuccess: true,
                isLoading: false,
                hasErrors: false,
                notes: action.response.notes,
                pagination: action.response.pagination,
                query: action.searchQuery
            };
        }

        case C_NOTES_SEARCH_LOAD_FAILURE: {
            return {
                ...state,
                isSuccess: false,
                isLoading: false,
                hasErrors: true,
                errors: action.errors,
                query: action.searchQuery
            };
        }

        case C_NOTES_REFRESH_AFTER_UPDATE: {
            let note = action.note;
            let newResponse = refreshUpdatedNote(state.response, note);
            return {
                ...state,
                isSuccess: false,
                isLoading: false,
                hasErrors: false,
                response: newResponse
            };
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
            }
        }
        return {
            ...note
        }
    });
    return {
        ...response,
        notes: notes
    };
}