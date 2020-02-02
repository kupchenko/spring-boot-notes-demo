import {
    C_NOTE_CREATE_FAILURE,
    C_NOTE_CREATE_IS_IN_PROGRESS,
    C_NOTE_CREATE_MODAL_HIDE,
    C_NOTE_CREATE_MODAL_SHOW,
    C_NOTE_CREATE_SUCCESS
} from "./action-type";
import {actionNoteFetchSuccess} from "./note-select";
import {actionDoNotesSearch} from "./notes-search";
import {actionRestoreCreateValues} from "./note-creating";
import ApiService from "../service/api.service";
import appConfig from "../config/config-app";

export const actionNoteCreateInProgress = (bool) => ({
    type: C_NOTE_CREATE_IS_IN_PROGRESS,
    isLoading: bool
});

export const actionNoteCreateSuccess = (note) => ({
    type: C_NOTE_CREATE_SUCCESS,
    note
});

export const actionNoteCreateFailure = () => ({
    type: C_NOTE_CREATE_FAILURE
});

export const actionShowNoteCreateModal = () => ({
    type: C_NOTE_CREATE_MODAL_SHOW
});

export const actionHideNoteCreateModal = () => ({
    type: C_NOTE_CREATE_MODAL_HIDE
});

export const actionDoNoteCreate = (newTitle, newContent) => {

    return (dispatch) => {
        dispatch(actionNoteCreateInProgress(true));
        ApiService.create(`${appConfig.API_URL_BASE}/note`, {
            'userId': 0,
            'title': newTitle,
            'content': newContent
        }).then((json) => {
            dispatch(actionNoteCreateSuccess());
            dispatch(actionNoteFetchSuccess(json));
            dispatch(actionDoNotesSearch());
            dispatch(actionRestoreCreateValues())
        }).catch(() => {
            dispatch(actionNoteCreateFailure())
        });
    }
};