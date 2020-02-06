import {
    C_NOTE_EDITING_DISABLE_TITLE_EDIT,
    C_NOTE_EDITING_ENABLE_TITLE_EDIT,
    C_NOTE_EDITING_NEW_CONTENT_VALUE,
    C_NOTE_EDITING_NEW_TITLE_VALUE,
    C_NOTE_EDITING_NEW_VALUES_RESTORE
} from "../actions/action-type";

const noteEditingState = {
    title: '',
    content: '',
    titleEditable: false
};

export const noteEditingReducer = (state = noteEditingState, action) => {
    switch (action.type) {
        case C_NOTE_EDITING_NEW_TITLE_VALUE:
            return {...state, title: action.title};
        case C_NOTE_EDITING_NEW_CONTENT_VALUE:
            return {...state, content: action.content};
        case C_NOTE_EDITING_ENABLE_TITLE_EDIT:
            return {...state, titleEditable: true};
        case C_NOTE_EDITING_DISABLE_TITLE_EDIT:
            return {...state, titleEditable: false};
        case C_NOTE_EDITING_NEW_VALUES_RESTORE:
            return noteEditingState;
        default:
            return state
    }
};