import { combineReducers } from 'redux';
import { quizReducer } from './quizReducer';

const rootReducer = combineReducers({
    quizInfo: quizReducer
});

export default rootReducer;