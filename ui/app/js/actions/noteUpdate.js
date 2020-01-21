import {actionNoteFetchFailure, actionNoteFetchSuccess} from "../actions/selectNote";
import {C_NOTES_REFRESH_AFTER_UPDATE} from "../reducers/notesSearchReducer";
import {
    C_NOTE_UPDATE_FAILURE,
    C_NOTE_UPDATE_SUCCESS,
    C_NOTE_UPDATE_IS_IN_PROGRESS
} from "../reducers/noteUpdateReducer";

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

export const actionDoNoteUpdate = (noteId, newTitle, newContent) => {

    return (dispatch) => {
        dispatch(actionNoteUpdateInProgress(true));
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'title': newTitle,
                'content': newContent
            })
        };

        fetch('http://localhost:8080' + '/note/' + noteId, options)
            .then((response) => response.json())
            .then((json) => {
                dispatch(actionNoteFetchSuccess(json));
                dispatch(actionNoteUpdateSuccess());
                dispatch(actionRefreshNotesAfterUpdate(json));
            })
            .catch(() => {
                dispatch(actionNoteFetchFailure());
                dispatch(actionNoteUpdateFailure());
            });
    }
};

