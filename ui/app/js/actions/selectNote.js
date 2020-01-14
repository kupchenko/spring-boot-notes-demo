import {C_NOTES_SEARCH_LOAD_SUCCESS} from "../reducers/notesSearchReducer";

export const actionNotesSearchSuccess = (response) => ({
    type: C_NOTES_SEARCH_LOAD_SUCCESS,
    response
});

export const actionDoUpdateSelectedItem = (id, notesData) => {

    return (dispatch) => {
        let notes = notesData.notes.map((note) => {
            if (note.id === id) {
                console.log("Selected " + note.id);
                return {
                    ...note,
                    selected: true
                }
            }
            return {
                ...note,
                selected: false
            }
        });
        let newResponse = {
            notes: notes,
            pagination: notesData.pagination
        };
        dispatch(actionNotesSearchSuccess(newResponse))
    }
};

