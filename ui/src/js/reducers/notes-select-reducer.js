import {C_NOTE_SELECT,} from "../actions/action-type";

const notesSelectInitialState = {
    id: 0
};

export const notesSelectReducer = (state = notesSelectInitialState, action) => {

    switch (action.type) {

        case C_NOTE_SELECT: {
            return {...state, id: action.id};
        }

        default:
            return state
    }
};
