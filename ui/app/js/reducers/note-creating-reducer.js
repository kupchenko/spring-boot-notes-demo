import {
    C_NOTE_CREATING_NEW_CONTENT_VALUE,
    C_NOTE_CREATING_NEW_TITLE_VALUE,
    C_NOTE_CREATING_NEW_VALUES_RESTORE
} from "../actions/action-type";

const noteCreatingState = {
    title: '',
    content: ''
};

export const noteCreatingReducer = (state = noteCreatingState, action) => {
    switch (action.type) {
        case C_NOTE_CREATING_NEW_TITLE_VALUE:
            return {...state, title: action.title};
        case C_NOTE_CREATING_NEW_CONTENT_VALUE:
            return {...state, content: action.content};
        case C_NOTE_CREATING_NEW_VALUES_RESTORE:
            return noteCreatingState;
        default:
            return state
    }
};