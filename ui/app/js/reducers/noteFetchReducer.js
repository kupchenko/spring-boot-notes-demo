export const C_NOTE_FETCH_IS_LOADING = 'C_NOTE_FETCH_IS_LOADING';
export const C_NOTE_FETCH_LOAD_SUCCESS = 'C_NOTE_FETCH_LOAD_SUCCESS';
export const C_NOTE_FETCH_LOAD_FAILURE = 'C_NOTE_FETCH_LOAD_FAILURE';

const noteFetchInitialState = {
    isLoading: false,
    hasErrors: false,
    isSuccess: false,
    errors: null,
    note: null
};

export const noteFetchReducer = (state = noteFetchInitialState, action) => {

    switch (action.type) {

        case C_NOTE_FETCH_IS_LOADING: {
            return {...state, isLoading: action.isLoading, hasErrors: false};
        }

        case C_NOTE_FETCH_LOAD_SUCCESS: {
            return {...state, isSuccess: true, isLoading: false, hasErrors: false, note: action.response};
        }

        case C_NOTE_FETCH_LOAD_FAILURE: {
            return {...state, isSuccess: false, isLoading: false, hasErrors: true, errors: action.errors};
        }

        default:
            return state
    }
};
