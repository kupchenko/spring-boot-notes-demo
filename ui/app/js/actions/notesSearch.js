import {
    C_NOTES_SEARCH_IS_LOADING,
    C_NOTES_SEARCH_LOAD_FAILURE,
    C_NOTES_SEARCH_LOAD_SUCCESS
} from "../reducers/notesSearchReducer";
import {actionDoNoteFetch} from "./noteFetch";

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

export const actionDoNotesSearch = (content = '') => {

    return (dispatch) => {
        dispatch(actionNotesSearchIsLoading(true));

        const options = {
            method: 'POST',
            headers: {
                'test': 'test',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'text': content
            })
        };

        fetch('http://localhost:8080' + '/notes/user/0/search', options)
            .then((response) => response.json())
            .then((json) => {
                let notes = json.notes.map((note, index) => {
                    if (index) {
                        return note;
                    }
                    return {
                        ...note,
                        selected: true
                    }
                });
                let modifiedJson = {
                    notes: notes,
                    pagination: json.pagination
                };
                console.log(modifiedJson);
                dispatch(actionNotesSearchSuccess(modifiedJson));
                let id = json.notes[0].id;
                dispatch(actionDoNoteFetch(id))
            })
            .catch(() => {
                dispatch(actionNotesSearchFailure())
            });
    }
};

