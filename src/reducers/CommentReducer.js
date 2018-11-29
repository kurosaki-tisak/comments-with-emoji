import {
    GET_COMMENT,
    GET_COMMENT_SUCCESS,
    GET_COMMENT_FAIL,
    POST_COMMENT,
    POST_COMMENT_SUCCESS,
    POST_COMMENT_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    comments: [],
    comment: {},
    loading: '',
    error: ''
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case GET_COMMENT:
            return { ...state, loading: true };
        case GET_COMMENT_SUCCESS:
            return { ...state, comments: action.payload, loading: false, error: '' };
        case GET_COMMENT_FAIL:
            return { ...state, loading: false, error: action.error };
        case POST_COMMENT:
            return { ...state, loading: true };
        case POST_COMMENT_SUCCESS:
            return { ...state, comment: action.payload, loading: false };
        case POST_COMMENT_FAIL:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    };
};