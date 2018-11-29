import { combineReducers } from 'redux';
import ArticleReducer from '../reducers/ArticleReducer';
import CommentReducer from '../reducers/CommentReducer';

export default combineReducers({
    article: ArticleReducer,
    comment: CommentReducer
})