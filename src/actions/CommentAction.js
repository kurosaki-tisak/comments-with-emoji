import axios from 'axios';

import {
    GET_COMMENT,
    GET_COMMENT_SUCCESS,
    GET_COMMENT_FAIL,
    POST_COMMENT,
    POST_COMMENT_SUCCESS,
    POST_COMMENT_FAIL
} from './types';

const API = 'https://my-json-server.typicode.com/kurosaki-tisak/json-demo';

const getCommentSuccess = (comments) => {
    return {
        type: GET_COMMENT_SUCCESS,
        payload: comments
    }
}

const getCommentFailure = (err) => {
    return {
        type: GET_COMMENT_FAIL,
        error: err
    }
}

export const getCommentList = ({ articleID }) => {
    return async (dispatch) => {
        dispatch({ type: GET_COMMENT });

        try {
            const { data } = await axios.get(`${API}/comments`);
            dispatch(getCommentSuccess(data));
        } catch (error) {
            dispatch(getCommentFailure(error));
        }
    }
}

const postCommentSuccess = (comment) => {
    return {
        type: POST_COMMENT_SUCCESS,
        payload: comment
    }
}

const postCommentFailure = (err) => {
    return {
        type: POST_COMMENT_FAIL,
        error: err
    }
}

export const postComment = ({ articleID, comments, user }) => {
    return async (dispatch) => {
        dispatch({ type: POST_COMMENT });

        try {
            const result = await axios.post(`${API}/comments`, {
                articleID, comments, user
            });
            dispatch(postCommentSuccess(result));
        } catch (error) {
            dispatch(postCommentFailure(error));
        }
    }
}