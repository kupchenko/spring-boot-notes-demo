import {
    C_NOTE_FETCH_IS_LOADING,
    C_NOTE_FETCH_LOAD_FAILURE,
    C_NOTE_FETCH_LOAD_SUCCESS
} from "../reducers/noteFetchReducer";
import {C_NOTE_SELECT} from "../reducers/notesSearchReducer";

export const actionNoteFetchIsLoading = (bool) => ({
    type: C_NOTE_FETCH_IS_LOADING,
    isLoading: bool
});

export const actionNoteFetchSuccess = (response) => ({
    type: C_NOTE_FETCH_LOAD_SUCCESS,
    response
});

export const actionNoteFetchFailure = (errors) => ({
    type: C_NOTE_FETCH_LOAD_FAILURE,
    errors
});

export const actionNotesSelect = (id) => ({
    type: C_NOTE_SELECT,
    id
});

export const actionDoNoteFetch = (id) => {

    return (dispatch) => {
        dispatch(actionNoteFetchIsLoading(true));

        const options = {
            method: 'GET'
        };

        fetch('http://localhost:8080' + '/note/' + id, options)
            .then((response) => response.json())
            .then((json) => {
                dispatch(actionNoteFetchSuccess(json));
            })
            .catch(() => {
                dispatch(actionNoteFetchFailure())
            });
    }
};

export const actionDoNoteFetchWithSelect = (id) => {

    return (dispatch) => {
        dispatch(actionDoNoteFetch(id));
        dispatch(actionNotesSelect(id))
    }
};
