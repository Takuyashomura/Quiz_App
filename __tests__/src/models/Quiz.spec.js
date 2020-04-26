import Quiz from '../../../src/models/Quiz';

function createMockQuiz(){
    return {
        question: '問題',
        correctAnswer: '答え',
        incorrectAnswers:['不正解1','不正解2','不正解3' ]
    }
};

describe('models/Quiz.jsのテスト', () => {
    it('Quizインポートチェック', () => {
        expect( typeof Quiz ).toStrictEqual('function');
    });

    describe('constructor', () => {
        it('コンストラクタで渡した値を保持する', () => {
            const quizData = createMockQuiz();
            const quiz = new Quiz(quizData);

            expect( quiz._question ).toStrictEqual( quizData.question );
            expect( quiz._correctAnswer ).toStrictEqual( quizData.correctAnswer );
            expect( quiz._incorrectAnswers ).toStrictEqual( quizData.incorrectAnswers );
        });
    });

    describe('getter', () => {
        it('question/correctAnswerのgetterメソッドが使える', () => {
            const quizData = createMockQuiz();
            const quiz = new Quiz(quizData);

            expect( quiz.question ).toStrictEqual( quizData.question );
            expect( quiz.correctAnswer ).toStrictEqual( quizData.correctAnswer );
            expect( quiz.incorrectAnswers ).toStrictEqual( undefined );
        });
    });

    describe('shuffleメソッド', () => {
        it('シャッフルされる', () => {
            const quizData = createMockQuiz();
            const quiz = new Quiz(quizData);

            const shuffle1 = quiz.shuffleAnswers();
            const shuffle2 = quiz.shuffleAnswers();
            expect( shuffle1 ).not.toStrictEqual( shuffle2);
        });
    });

    describe('judgeCorrectAnswerメソッド', () => {
        it('選択した答えが正解であればtrue,違えばfalse', () => {
            const quizData = createMockQuiz();
            const quiz = new Quiz(quizData);

            expect( quiz.judgeCorrectAnswer(quizData.correctAnswer) ).toStrictEqual(true);

            quizData.incorrectAnswers.forEach(incorrectAnswer => {
                expect( quiz.judgeCorrectAnswer(incorrectAnswer) ).toStrictEqual(false);
            });
        });
    });

    describe('クラスメソッド', () => {
        describe('fetchAndCreateQuizzesメソッド', () => {
            it('10件のクイズインスタンスが返る', async () => {
                const quizzes = await Quiz.fetchAndCreateQuizzes();

                expect( Array.isArray( quizzes )).toStrictEqual(true);
                expect( quizzes.length ).toStrictEqual(10);
                quizzes.forEach(quiz => {
                    expect( quiz instanceof Quiz ).toStrictEqual(true);
                });
            });
        });
    })
})