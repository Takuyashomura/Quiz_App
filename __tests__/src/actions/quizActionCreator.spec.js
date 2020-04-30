import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {FETCH_QUIZZES_REQUEST,
        FETCH_QUIZZES_SUCCES,
        FETCH_QUIZZES_FAILUR,
        fetchQuizzes} from '../../../src/actions/quizActionCreator';
import quizModel from '../../../src/models/Quiz';

jest.mock('axios');

const middlewares = [ thunk ];
const mockStore = configureMockStore( middlewares );

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

describe('quizActionCreatorのテスト' ,() => {
    
    it('fetch成功時、FETCH_QUIZZES_SUCCESと一緒にクイズデータが返される',async () => {
        const expectedResults = [{
            question: 'a',
            correct_answer: 'b',
            incorrect_answers: ['c','d','e']
        }];

        axios.get.mockResolvedValue({
            data:{
                results: expectedResults
            }
        });


        const store = mockStore();
        await store.dispatch( fetchQuizzes() );
        expect( store.getActions() ).toStrictEqual([
            {
                type: FETCH_QUIZZES_REQUEST
            },
            {
                type: FETCH_QUIZZES_SUCCES,
                data: quizModel.createQuizInstancesWithData(expectedResults)
            }
        ]);
    });

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

    it('fetch失敗時,FETCH_QUIZZES_FAILURと一緒にエラーメッセージが表示される', async () => {
        const expectedError = {
            message: 'エラーです'
        }

        axios.get.mockRejectedValue( expectedError );

        const store = mockStore();
        await store.dispatch( fetchQuizzes());
        expect( store.getActions() ).toStrictEqual([
        {
            type: FETCH_QUIZZES_REQUEST
        },
        {
            type:FETCH_QUIZZES_FAILUR,
            error: expectedError
        }
        ]);
    });
});
