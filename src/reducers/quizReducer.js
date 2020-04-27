import { FETCH_QUIZZES_REQUEST,
        FETCH_QUIZZES_SUCCES,
        FETCH_QUIZZES_FAILUR
} from '../actions/quizActionCreator';

//State初期値
const initialState = {
    isLoading: false,
    quizzes: [],
    error: null
};

export const quizReducer = (state = initialState, action) =>{
    switch(action.type){
        case FETCH_QUIZZES_REQUEST :
            return{
                ...state,
                isLoading: true
            }
        
        case FETCH_QUIZZES_SUCCES:
            return{
                ...state,
                quizzes: action.data,
                isLoading: false
            }

        case FETCH_QUIZZES_FAILUR:
            return{
                ...state,
                error: action.error,
                isLoading: false
            }
        default:
            return state;
    };
};