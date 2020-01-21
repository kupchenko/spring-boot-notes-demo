import {
    C_NOTES_SEARCH_IS_LOADING,
    C_NOTES_SEARCH_LOAD_FAILURE,
    C_NOTES_SEARCH_LOAD_SUCCESS
} from "../reducers/notesSearchReducer";
import {actionDoNoteFetch, actionNoteFetchIsLoading, actionNoteFetchSuccessEmpty} from "./selectNote";

export const actionNotesSearchIsLoading = (bool) => ({
    type: C_NOTES_SEARCH_IS_LOADING,
    isLoading: bool
});

export const actionNotesSearchSuccess = (response) => ({
    type: C_NOTES_SEARCH_LOAD_SUCCESS,
    response
});

export const actionNotesSearchFailure = (errors) => ({
    type: C_NOTES_SEARCH_LOAD_FAILURE,
    errors
});

export const actionDoNotesSearch = (content = '', page = 0, rows = 10) => {

    return (dispatch) => {
        dispatch(actionNotesSearchIsLoading(true));
        dispatch(actionNoteFetchIsLoading(true));

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'text': content,
                'page': page,
                'rows': rows
            })
        };

        fetch('http://localhost:8080' + '/notes/user/0/search', options)
            .then((response) => response.json())
            .then((json) => {
                dispatch(actionNotesSearchSuccess(json));

                if (json.notes.length) {
                    let id = json.notes[0].id;
                    dispatch(actionDoNoteFetch(id));
                } else {
                    dispatch(actionNoteFetchSuccessEmpty());
                }
            })
            .catch(() => {
                dispatch(actionNotesSearchFailure())
            });
    }
};

