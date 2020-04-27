import { quizReducer } from '../../../src/reducers/quizReducer';
import {
    FETCH_QUIZZES_REQUEST,
    FETCH_QUIZZES_SUCCES,
    FETCH_QUIZZES_FAILUR
} from '../../../src/actions/quizActionCreator';

describe('quizReducerのテスト', () => {
    it('action.type === FETCH_QUIZZES_REQUESTの時', () => {
        const action = {
            type: FETCH_QUIZZES_REQUEST
        };

        const newState = quizReducer(undefined, action);

        expect( newState ).toStrictEqual({
            isLoading: true,
            quizzes: [],
            error: null
        });
    });

    it('action.type === FETCH_QUIZZES_SUCCES', () => {
        const dummyData = [{
            question: 'a',
            correct_answer: 'b',
            incorrect_answer: ['c','d','e']
        }];

        const action = {
            type: FETCH_QUIZZES_SUCCES,
            data: dummyData
        };

        const currentState = {
            isLoading: false,
            quizzes: [],
            error: 'dummy'
        };

        const newState = quizReducer( currentState, action );

        expect( newState ).toStrictEqual({
            isLoading: false,
            quizzes: dummyData,
            error: 'dummy'
        });
    });

    it('action.type === FETCH_QUIZZES_FAILURの時', () => {
            const dummyError = 'ダミー';

            const action = {
                type: FETCH_QUIZZES_FAILUR,
                error: dummyError
            };

            const currentState = {
                isLoading: false,
                quizzes: [],
                error: null
            };

            const newState = quizReducer( currentState, action );

            expect( newState ).toStrictEqual({
                isLoading: false,
                quizzes: [],
                error: dummyError
            });
        })
})