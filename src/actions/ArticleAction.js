import axios from 'axios';

import {
    GET_ARTICLE_BY_ID,
    GET_ARTICLE_BY_ID_SUCCESS,
    GET_ARTICLE_BY_ID_FAIL
} from './types';

const API = 'https://my-json-server.typicode.com/kurosaki-tisak/json-demo';

const getArticleByIdSuccess = (article) => {
    return {
        type: GET_ARTICLE_BY_ID_SUCCESS,
        payload: article
    }
}

const getArticleByIdFailure = (err) => {
    return {
        type: GET_ARTICLE_BY_ID_FAIL,
        error: err
    }
}

export const getArticleById = ({ articleID }) => {
    return async (dispatch) => {
        dispatch({ type: GET_ARTICLE_BY_ID });

        try {
            const result = await axios.get(`${API}/posts`);
            dispatch(getArticleByIdSuccess(result));
        } catch (error) {
            dispatch(getArticleByIdFailure(error));
        }
    }
}

