import {
    GET_ARTICLE_BY_ID,
    GET_ARTICLE_BY_ID_SUCCESS,
    GET_ARTICLE_BY_ID_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    article: {},
    loading: '',
    error: ''
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case GET_ARTICLE_BY_ID:
            return { ...state, loading: true };
        case GET_ARTICLE_BY_ID_SUCCESS:
            return { ...state, article: action.payload, loading: false, error: '' };
        case GET_ARTICLE_BY_ID_FAIL:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    };
};
