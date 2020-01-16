import {actionNoteFetchFailure, actionNoteFetchSuccess} from "../actions/selectNote";
import {C_NOTE_UPDATE_IS_IN_PROGRESS} from "../reducers/noteFetchReducer";

export const actionNoteUpdateInProgress = (bool) => ({
    type: C_NOTE_UPDATE_IS_IN_PROGRESS,
    isUpdateInProgress: bool
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
                dispatch(actionNoteFetchSuccess(json))
            })
            .catch(() => {
                dispatch(actionNoteFetchFailure())
            });
    }
};

