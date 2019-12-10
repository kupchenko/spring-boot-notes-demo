import {C_REQUEST_IS_LOADING, C_REQUEST_LOAD_FAILURE, C_REQUEST_LOAD_SUCCESS} from "../reducers/request";

export const actionRequestIsLoading = (bool) => ({
    type: C_REQUEST_IS_LOADING,
    isLoading: bool
});

export const actionRequestLoadSuccess = (response) => ({
    type: C_REQUEST_LOAD_SUCCESS,
    response
});

export const actionRequestLoadFailure = (errors) => ({
    type: C_REQUEST_LOAD_FAILURE,
    errors
});

export const actionDoRequest = (request) => {

    return (dispatch) => {
        dispatch(actionRequestIsLoading(true));

        const options = {
            method: 'POST',
            body: request.query
        };

        fetch('/notes/user/0/search', options)
            .then((response) => response.json())
            .then((json) => {
                dispatch(actionRequestLoadSuccess(json))
            })
            .catch(() => {
                dispatch(actionRequestLoadFailure())
            });
    }
};

