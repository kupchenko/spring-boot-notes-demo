import {
    C_NOTE_NEW_VALUE_TITLE,
    C_NOTE_NEW_VALUE_CONTENT,
    C_NOTE_NEW_VALUES_RESTORE
} from "../actions/action-type";

const noteEditingState = {
    title: '',
    content: ''
};

export const noteEditingReducer = (state = noteEditingState, action) => {

    switch (action.type) {

        case C_NOTE_NEW_VALUE_TITLE:
            return {
                ...state,
                title: action.title
            };

        case C_NOTE_NEW_VALUE_CONTENT:
            return {
                ...state,
                content: action.content
            };

        case C_NOTE_NEW_VALUES_RESTORE:
            return noteEditingState;

        default:
            return state
    }
};