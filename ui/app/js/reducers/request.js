export const C_REQUEST_IS_LOADING = 'C_REQUEST_LIST_IS_LOADING'
export const C_REQUEST_LOAD_SUCCESS = 'C_REQUEST_LIST_LOAD_SUCCESS'
export const C_REQUEST_LOAD_FAILURE = 'C_REQUEST_LIST_LOAD_FAILURE'

const initialState = {
    isLoading: false,
    hasErrors: false,
    isSuccess: false,
    errors: null,
    response: null
}

export const requestReducer = (state = initialState, action) => {

    switch (action.type) {

        case C_REQUEST_IS_LOADING:
            return {...state, isLoading: action.isLoading, hasErrors: false};

        case C_REQUEST_LOAD_SUCCESS: {
            return {...state, isSuccess: true, isLoading:false, hasErrors: false, response: action.response};
        }

        case C_REQUEST_LOAD_FAILURE: {
            return {...state, isSuccess: false, isLoading:false, hasErrors: true, errors: action.errors};
        }

        default:
            return state
    }
}
