import {C_NOTES_SEARCH_IS_LOADING, C_NOTES_SEARCH_LOAD_FAILURE, C_NOTES_SEARCH_LOAD_SUCCESS} from "./action-type";
import {
    actionDoNoteFetchWithSelect,
    actionNoteFetchIsLoading,
    actionNoteFetchSuccess,
    actionNoteFetchSuccessEmpty
} from "./note-select";
import ApiService from "../service/api.service";

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

        ApiService.fetch('http://localhost:8080/notes/user/0', {
            'text': searchQuery,
            'page': page,
            'rows': rows
        }).then((json) => {
            dispatch(actionNoteFetchSuccess(json));
            dispatch(actionNotesSearchSuccess(json, searchQuery));
            if (json.notes.length) {
                let id = json.notes[0].id;
                dispatch(actionDoNoteFetchWithSelect(id));
            } else {
                dispatch(actionNoteFetchSuccessEmpty());
            }
        })
    }
};