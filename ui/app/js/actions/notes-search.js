import {C_NOTES_SEARCH_IS_LOADING, C_NOTES_SEARCH_LOAD_FAILURE, C_NOTES_SEARCH_LOAD_SUCCESS} from "./action-type";
import {
    actionDoNoteFetchWithSelect,
    actionNoteFetchFailure,
    actionNoteFetchIsLoading,
    actionNoteFetchSuccessEmpty
} from "./note-select";

export const actionNotesSearchIsLoading = (bool, searchQuery) => ({
    type: C_NOTES_SEARCH_IS_LOADING,
    isLoading: bool,
    searchQuery
});

export const actionNotesSearchSuccess = (response, searchQuery) => ({
    type: C_NOTES_SEARCH_LOAD_SUCCESS,
    response,
    searchQuery
});

export const actionNotesSearchFailure = (errors) => ({
    type: C_NOTES_SEARCH_LOAD_FAILURE,
    errors
});

export const actionDoNotesSearch = (searchQuery = '', page = 0, rows = 10) => {

    return (dispatch) => {
        dispatch(actionNotesSearchIsLoading(true, searchQuery));
        dispatch(actionNoteFetchIsLoading(true));

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'text': searchQuery,
                'page': page,
                'rows': rows
            })
        };

        fetch('http://localhost:8080' + '/notes/user/0/search', options)
            .then(handleErrors)
            .then((json) => {
                dispatch(actionNotesSearchSuccess(json, searchQuery));

                if (json.notes.length) {
                    let id = json.notes[0].id;
                    dispatch(actionDoNoteFetchWithSelect(id));
                } else {
                    dispatch(actionNoteFetchSuccessEmpty());
                }
            })
            .catch((errors) => {
                console.log('[search] Error occurred...\n' + errors);
                dispatch(actionNotesSearchFailure(errors));
                dispatch(actionNoteFetchFailure());
            });
    }
};

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}