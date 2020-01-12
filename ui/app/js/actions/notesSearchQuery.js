import {C_NOTES_SEARCH_QUERY} from "../reducers/notesSearchQueryReducer";

export const actionSaveNotesSearchQuery = (query) => ({
    type: C_NOTES_SEARCH_QUERY,
    query: query
});

export const actionDoSaveNotesSearchQuery = (query = '') => {
    return (dispatch) => {
        dispatch(actionSaveNotesSearchQuery(query));
    }
};

