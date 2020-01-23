import {
    C_NOTE_CREATE_FAILURE,
    C_NOTE_CREATE_IS_IN_PROGRESS,
    C_NOTE_CREATE_MODAL_HIDE,
    C_NOTE_CREATE_MODAL_SHOW,
    C_NOTE_CREATE_SUCCESS
} from "../reducers/noteCreateReducer";
import {actionNoteFetchSuccess} from "./note-select";
import {actionDoNotesSearch} from "./notes-search";

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

export const actionShowNoteCreateHide = () => ({
    type: C_NOTE_CREATE_MODAL_HIDE
});

export const actionDoNoteCreate = (newTitle, newContent) => {

    return (dispatch) => {
        dispatch(actionNoteCreateInProgress(true));
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'userId': 0,
                'title': newTitle,
                'content': newContent
            })
        };

        fetch('http://localhost:8080' + '/note', options)
            .then(handleErrors)
            .then((json) => {
                dispatch(actionNoteCreateSuccess());
                dispatch(actionNoteFetchSuccess(json));
                dispatch(actionDoNotesSearch())
            })
            .catch(() => {
                console.log('Error occurred...');
                dispatch(actionNoteCreateFailure())
            });
    }
};

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}