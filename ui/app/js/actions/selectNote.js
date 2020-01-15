import {C_NOTE_SELECT} from "../reducers/notesSearchReducer";

export const actionNotesSearchSuccess = (id) => ({
    type: C_NOTE_SELECT,
    id
});

export const actionDoUpdateSelectedItem = (id) => {

    return (dispatch) => {
        dispatch(actionNotesSearchSuccess(id))
    }
};

