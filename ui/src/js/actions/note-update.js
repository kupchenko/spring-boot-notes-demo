import {actionNoteFetchFailure} from "./note-select";

import {C_NOTE_UPDATE_FAILURE, C_NOTE_UPDATE_IS_IN_PROGRESS, C_NOTE_UPDATE_SUCCESS,} from "./action-type";
import {actionRestoreNewValues} from "./note-editing";
import ApiService from "../service/api.service";
import {actionDoNotesSearch} from "./notes-search";

export const actionNoteUpdateInProgress = (bool) => ({
    type: C_NOTE_UPDATE_IS_IN_PROGRESS,
    isUpdateInProgress: bool
});

export const actionNoteUpdateSuccess = (note) => ({
    type: C_NOTE_UPDATE_SUCCESS,
    note
});

export const actionNoteUpdateFailure = (errors) => ({
    type: C_NOTE_UPDATE_FAILURE,
    errors
});

export const actionDoNoteUpdate = (id, newTitle, newContent) => {

    return (dispatch) => {
        dispatch(actionNoteUpdateInProgress(true));
        ApiService.update(`/note/${id}`, {
            'title': newTitle,
            'content': newContent
        }).then(() => {
            dispatch(actionNoteUpdateSuccess());
            dispatch(actionRestoreNewValues());
            dispatch(actionDoNotesSearch());
        }).catch(() => {
            dispatch(actionNoteFetchFailure());
            dispatch(actionNoteUpdateFailure());
        });
    }
};

