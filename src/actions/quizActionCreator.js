import axios from 'axios';
import quizModel from '../models/Quiz';

const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

export const FETCH_QUIZZES_REQUEST = 'FETCH_QUIZZES_REQUEST';
export const FETCH_QUIZZES_SUCCES = 'FETCH_QUIZZES_SUCCES';
export const FETCH_QUIZZES_FAILUR = 'FETCH_QUIZZES_FAILUR';

export const fetchQuizzes = ()=> {
    return async ( dispatch ) => {
        dispatch( fetchQuizzesRequest() );
        try{
            const response = await axios.get(API_URL);
            const results = response.data.results;
            const data = quizModel.createQuizInstancesWithData( results );

            dispatch( fetchQuizzesSucces( data ) );
        }catch (error){
            dispatch( fetchQuizzesFailur( error ) );
        };
    };
};
    const fetchQuizzesRequest = () =>{
        return {
            type: FETCH_QUIZZES_REQUEST,
        };
    };

    const fetchQuizzesSucces = ( data ) => {
        return {
            type: FETCH_QUIZZES_SUCCES,
            data
        };
    };

    const fetchQuizzesFailur = ( error ) => {
        return {
            type: FETCH_QUIZZES_FAILUR,
            error
        };
    };
