import {
    C_NOTE_NEW_VALUE_TITLE,
    C_NOTE_NEW_VALUE_CONTENT
} from "../actions/action-type";

const newNoteValuesState = {
    title: '',
    content: ''
};

export const newNoteValuesReducer = (state = newNoteValuesState, action) => {

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
        default:
            return state
    }
};