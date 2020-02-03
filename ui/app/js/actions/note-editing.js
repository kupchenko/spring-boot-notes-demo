import {
    C_NOTE_EDITING_DISABLE_TITLE_EDIT,
    C_NOTE_EDITING_ENABLE_TITLE_EDIT,
    C_NOTE_EDITING_NEW_CONTENT_VALUE,
    C_NOTE_EDITING_NEW_TITLE_VALUE,
    C_NOTE_EDITING_NEW_VALUES_RESTORE
} from "./action-type";

export const actionDoUpdateNoteTitle = (title) => ({
    type: C_NOTE_EDITING_NEW_TITLE_VALUE,
    title
});

export const actionDoUpdateNoteContent = (content) => ({
    type: C_NOTE_EDITING_NEW_CONTENT_VALUE,
    content
});
export const actionRestoreNewValues = () => ({
    type: C_NOTE_EDITING_NEW_VALUES_RESTORE
});

export const actionEnableTitleEditing = () => ({
    type: C_NOTE_EDITING_ENABLE_TITLE_EDIT
});

export const actionDisableTitleEditing = () => ({
    type: C_NOTE_EDITING_DISABLE_TITLE_EDIT
});