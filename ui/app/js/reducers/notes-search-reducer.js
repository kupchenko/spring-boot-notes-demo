import {
    C_NOTES_SEARCH_IS_LOADING,
    C_NOTES_SEARCH_LOAD_FAILURE,
    C_NOTES_SEARCH_LOAD_SUCCESS,
    C_NOTES_SEARCH_UPDATE_QUERY
} from "../actions/action-type";

const notesSearchInitialState = {
    isLoading: false,
    hasErrors: false,
    isSuccess: false,
    errors: null,
    query: '',
    notes: [],
    pagination: null
};

export const notesSearchReducer = (state = notesSearchInitialState, action) => {

    switch (action.type) {

        case C_NOTES_SEARCH_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
                hasErrors: false
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

        case C_NOTES_SEARCH_UPDATE_QUERY: {
            console.log("asdasd");
            console.log(action.searchQuery);
            return {
                ...state,
                query: action.searchQuery
            };
        }

        default:
            return state
    }
};