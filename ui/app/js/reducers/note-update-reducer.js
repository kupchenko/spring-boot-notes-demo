import {
    C_NOTE_UPDATE_FAILURE,
    C_NOTE_UPDATE_IS_IN_PROGRESS,
    C_NOTE_UPDATE_SUCCESS
} from "../actions/action-type";

const noteUpdateInitialState = {
    isLoading: false,
    isUpdateInProgress: false,
    hasErrors: false,
    isSuccess: false,
    errors: null
};

export const noteUpdateReducer = (state = noteUpdateInitialState, action) => {

    switch (action.type) {

        case C_NOTE_UPDATE_SUCCESS: {
            return {...state, isSuccess: true, isLoading: false, hasErrors: false};
        }

        case C_NOTE_UPDATE_FAILURE: {
            return {...state, isSuccess: false, isLoading: false, hasErrors: true, errors: action.errors};
        }

        case C_NOTE_UPDATE_IS_IN_PROGRESS: {
            return {...state, isSuccess: false, isLoading: true, hasErrors: false};
        }

        default:
            return state
    }
};
