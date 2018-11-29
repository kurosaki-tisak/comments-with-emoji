import { combineReducers } from 'redux';
import CommentReducer from '../reducers/CommentReducer';

export default combineReducers({
    comment: CommentReducer
})