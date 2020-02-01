import {
    C_NOTE_NEW_VALUE_TITLE,
    C_NOTE_NEW_VALUE_CONTENT,
    C_NOTE_NEW_VALUES_RESTORE,
    C_NOTE_ENABLE_TITLE_EDIT
} from "./action-type";

export const actionDoUpdateNoteTitle = (title) => ({
    type: C_NOTE_NEW_VALUE_TITLE,
    title
});

export const actionDoUpdateNoteContent = (content) => ({
    type: C_NOTE_NEW_VALUE_CONTENT,
    content
});
export const actionRestoreNewValues = () => ({
    type: C_NOTE_NEW_VALUES_RESTORE
});

export const actionEnableTitleEditing = () => ({
    type: C_NOTE_ENABLE_TITLE_EDIT
});