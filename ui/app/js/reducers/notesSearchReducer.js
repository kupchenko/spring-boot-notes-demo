export const C_NOTES_SEARCH_IS_LOADING = 'C_NOTES_SEARCH_IS_LOADING'
export const C_NOTES_SEARCH_LOAD_SUCCESS = 'C_NOTES_SEARCH_LOAD_SUCCESS'
export const C_NOTES_SEARCH_LOAD_FAILURE = 'C_NOTES_SEARCH_LOAD_FAILURE'

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
            return {...state, isSuccess: true, isLoading:false, hasErrors: false, response: action.response};
        }

        case C_NOTES_SEARCH_LOAD_FAILURE: {
            return {...state, isSuccess: false, isLoading:false, hasErrors: true, errors: action.errors};
        }

        default:
            return state
    }
};
