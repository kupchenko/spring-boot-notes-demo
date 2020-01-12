export const C_NOTES_SEARCH_QUERY = 'C_NOTES_SEARCH_QUERY'

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
