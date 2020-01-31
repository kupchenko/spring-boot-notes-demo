import {
    C_NOTE_NEW_VALUE_TITLE,
    C_NOTE_NEW_VALUE_CONTENT, C_NOTE_NEW_VALUES_RESTORE
} from "./action-type";

export const actionSetTitle = (title) => ({
    type: C_NOTE_NEW_VALUE_TITLE,
    title
});

export const actionSetContent = (content) => ({
    type: C_NOTE_NEW_VALUE_CONTENT,
    content
});
export const actionRestoreNewValues = () => ({
    type: C_NOTE_NEW_VALUES_RESTORE
});

export const actionDoUpdateNoteTitle = (newTitle) => {
    return (dispatch) => {
        dispatch(actionSetTitle(newTitle));
    }
};

export const actionDoUpdateNoteContent = (newContent) => {
    return (dispatch) => {
        dispatch(actionSetContent(newContent));
    }
};