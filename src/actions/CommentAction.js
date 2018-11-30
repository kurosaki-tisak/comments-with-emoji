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

export const postComment = ({ articleID, comment, createAt, user }) => {
    return async (dispatch) => {
        dispatch({ type: POST_COMMENT });

        try {
            const { data } = await axios.post(`${API}/comments`, {
                id: 3,
                body: comment,
                postId: articleID,
                postAt: createAt,
                user: user
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                  }
            });
            dispatch(postCommentSuccess(data));
        } catch (error) {
            dispatch(postCommentFailure(error));
        }
    }
}