import {C_NOTE_FETCH_IS_LOADING, C_NOTE_FETCH_LOAD_SUCCESS, C_NOTE_FETCH_LOAD_FAILURE} from "../reducers/noteFetchReducer";
import {actionDoUpdateSelectedItem} from "./selectNote";

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

export const actionDoNoteFetch = (id) => {

    return (dispatch) => {
        dispatch(actionNoteFetchIsLoading(true));

        const options = {
            method: 'GET'
        };

        fetch('http://localhost:8080'+'/note/' + id, options)
            .then((response) => response.json())
            .then((json) => {
                dispatch(actionNoteFetchSuccess(json));
                dispatch(actionDoUpdateSelectedItem(id))
            })
            .catch(() => {
                dispatch(actionNoteFetchFailure())
            });
    }
};

