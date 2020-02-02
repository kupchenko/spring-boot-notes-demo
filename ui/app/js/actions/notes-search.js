import {
    C_NOTES_SEARCH_IS_LOADING,
    C_NOTES_SEARCH_LOAD_FAILURE,
    C_NOTES_SEARCH_LOAD_SUCCESS,
    C_NOTES_SEARCH_UPDATE_QUERY
} from "./action-type";
import {
    actionDoNoteFetchWithSelect,
    actionNoteFetchFailure,
    actionNoteFetchIsLoading,
    actionNoteFetchSuccessEmpty
} from "./note-select";
import ApiService from "../service/api.service";
import appConfig from "../config/config-app";

export const actionNotesSearchIsLoading = (bool) => ({
    type: C_NOTES_SEARCH_IS_LOADING,
    isLoading: bool
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

export const actionUpdateSearchQuery = (searchQuery) => ({
    type: C_NOTES_SEARCH_UPDATE_QUERY,
    searchQuery
});

export const actionDoNotesSearch = (searchQuery = '', page = 0, rows = 10) => {

    return (dispatch) => {
        dispatch(actionNotesSearchIsLoading(true));
        dispatch(actionNoteFetchIsLoading(true));

        ApiService.fetch(`${appConfig.API_URL_BASE}/notes/user/0`, {
            'text': searchQuery,
            'page': page,
            'rows': rows
        }).then((json) => {
            dispatch(actionNotesSearchSuccess(json, searchQuery));
            if (json.notes.length) {
                let id = json.notes[0].id;
                dispatch(actionDoNoteFetchWithSelect(id));
            } else {
                dispatch(actionNoteFetchSuccessEmpty());
            }
        }).catch((errors) => {
            console.log('[search] Error occurred...\n' + errors);
            dispatch(actionNotesSearchFailure(errors));
            dispatch(actionNoteFetchFailure());
        });
    }
};