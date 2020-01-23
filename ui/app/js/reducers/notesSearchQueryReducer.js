import {C_NOTES_SEARCH_QUERY} from "../actions/action-type";

const notesSearchQueryInitialState = {
    query: ''
};

export const notesSearchQueryReducer = (state = notesSearchQueryInitialState, action) => {

    switch (action.type) {

        case C_NOTES_SEARCH_QUERY: {
            return {...state, query: action.query};
        }

        default:
            return state
    }
};
