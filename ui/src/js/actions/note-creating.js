import {
    C_NOTE_CREATING_NEW_CONTENT_VALUE,
    C_NOTE_CREATING_NEW_TITLE_VALUE,
    C_NOTE_CREATING_NEW_VALUES_RESTORE
} from "./action-type";

export const actionDoUpdateNoteTitle = (title) => ({
    type: C_NOTE_CREATING_NEW_TITLE_VALUE,
    title
});
export const actionDoUpdateNoteContent = (content) => ({
    type: C_NOTE_CREATING_NEW_CONTENT_VALUE,
    content
});
export const actionRestoreCreateValues = () => ({
    type: C_NOTE_CREATING_NEW_VALUES_RESTORE
});