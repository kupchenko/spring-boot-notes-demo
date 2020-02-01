import {
    C_NOTE_NEW_VALUE_TITLE,
    C_NOTE_NEW_VALUE_CONTENT,
    C_NOTE_NEW_VALUES_RESTORE,
    C_NOTE_ENABLE_TITLE_EDIT
} from "../actions/action-type";

const noteEditingState = {
    title: '',
    content: '',
    titleEditable: false
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

        case C_NOTE_ENABLE_TITLE_EDIT:
            return {
                ...state,
                titleEditable: true
            };

        case C_NOTE_NEW_VALUES_RESTORE:
            return noteEditingState;

        default:
            return state
    }
};