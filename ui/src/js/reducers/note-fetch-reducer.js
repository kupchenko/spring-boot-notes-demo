import {
    C_NOTE_FETCH_IS_LOADING,
    C_NOTE_FETCH_LOAD_FAILURE,
    C_NOTE_FETCH_LOAD_SUCCESS,
    C_NOTE_FETCH_LOAD_SUCCESS_EMPTY,
    C_NOTE_UPDATE_IS_IN_PROGRESS
} from "../actions/action-type";

const noteFetchInitialState = {
    isLoading: false,
    isUpdateInProgress: false,
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
            return {
                ...state,
                isSuccess: true,
                isUpdateInProgress: false,
                isLoading: false,
                hasErrors: false,
                note: action.response
            };
        }

        case C_NOTE_FETCH_LOAD_SUCCESS_EMPTY: {
            return {...state, isSuccess: true, isLoading: false, hasErrors: false, note: null};
        }

        case C_NOTE_FETCH_LOAD_FAILURE: {
            return {...state, isSuccess: false, isLoading: false, hasErrors: true, errors: action.errors};
        }

        case C_NOTE_UPDATE_IS_IN_PROGRESS: {
            return {
                ...state,
                isSuccess: true,
                isUpdateInProgress: true,
                isLoading: false,
                hasErrors: false,
                note: state.note
            };
        }

        default:
            return state
    }
};
