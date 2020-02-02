import {actionNoteFetchFailure, actionNoteFetchSuccess} from "./note-select";

import {
    C_NOTE_UPDATE_FAILURE,
    C_NOTE_UPDATE_IS_IN_PROGRESS,
    C_NOTE_UPDATE_SUCCESS,
    C_NOTES_REFRESH_AFTER_UPDATE
} from "./action-type";
import {actionRestoreNewValues} from "./note-editing";
import {actionDoNotesSearch} from "./notes-search";
import ApiService from "../service/api.service";
import appConfig from "../config/config-app";

export const actionNoteUpdateInProgress = (bool) => ({
    type: C_NOTE_UPDATE_IS_IN_PROGRESS,
    isUpdateInProgress: bool
});

export const actionRefreshNotesAfterUpdate = (note) => ({
    type: C_NOTES_REFRESH_AFTER_UPDATE,
    note
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
        ApiService.update(`${appConfig.API_URL_BASE}/note/${id}`, {
            'title': newTitle,
            'content': newContent
        }).then((json) => {
            dispatch(actionNoteFetchSuccess(json));
            dispatch(actionNoteUpdateSuccess());
            dispatch(actionDoNotesSearch());
            dispatch(actionRestoreNewValues());
        }).catch(() => {
            dispatch(actionNoteFetchFailure());
            dispatch(actionNoteUpdateFailure());
        });
    }
};

