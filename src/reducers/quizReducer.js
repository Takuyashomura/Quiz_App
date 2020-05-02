import { FETCH_QUIZZES_REQUEST,
        FETCH_QUIZZES_SUCCES,
        FETCH_QUIZZES_FAILUR,
        FETCH_QUIZZES_RESET
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
                isLoading: false,
                quizzes: action.data,
                error: null
            }

        case FETCH_QUIZZES_FAILUR:
            return{
                ...state,
                isLoading: false,
                error: action.error
            }
        
        case FETCH_QUIZZES_RESET:
            return{
                ...state,
                isLoading: false,
                quizzes: [],
                error: null
            }
        default:
            return state;
    };
};