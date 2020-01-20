export const C_NOTE_CREATE_IS_IN_PROGRESS = 'C_NOTE_CREATE_IS_IN_PROGRESS';
export const C_NOTE_CREATE_SUCCESS = 'C_NOTE_CREATE_SUCCESS';
export const C_NOTE_CREATE_FAILURE = 'C_NOTE_CREATE_FAILURE';

const noteCreateInitialState = {
    isLoading: false,
    hasErrors: false,
    isSuccess: false,
    errors: null,
    note: null
};

export const noteCreateReducer = (state = noteCreateInitialState, action) => {

    switch (action.type) {

        case C_NOTE_CREATE_IS_IN_PROGRESS: {
            return {...state, isSuccess: false, isLoading: action.isLoading, hasErrors: false};
        }

        case C_NOTE_CREATE_SUCCESS: {
            return {
                ...state,
                isSuccess: true,
                isLoading: false,
                hasErrors: false,
                note: action.response
            };
        }

        case C_NOTE_CREATE_FAILURE: {
            return {...state, isSuccess: false, isLoading: false, hasErrors: true, errors: action.errors};
        }

        default:
            return state
    }
};
