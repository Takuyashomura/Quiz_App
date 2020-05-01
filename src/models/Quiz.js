import _ from 'lodash';
import he from 'he';
import QuizFetcher from '../dataFetcher/QuizFetcher';

class Quiz {
    constructor({question,correctAnswer,incorrectAnswers}){

        this._question = question;
        this._correctAnswer = correctAnswer;
        this._incorrectAnswers = [...incorrectAnswers];
    };

    get question(){
        return this._question;
    }

    get correctAnswer(){
        return this._correctAnswer;
    }

    //選択肢をシャッフルさせる（lodashの_.shuffleを使う）
    shuffleAnswers(){
        return _.shuffle([this._correctAnswer, ...this._incorrectAnswers]);
    }

    //選択した回答が正解か判定する
    judgeCorrectAnswer(answer){
        return answer === this._correctAnswer;
    }

    static async fetchAndCreateQuizzes(){
        //QUizFetcherからクイズリストを作成
        const quizList = await QuizFetcher.fetch();

        return Quiz.createQuizInstancesWithData(quizList.results);
    }

    static createQuizInstancesWithData(quizDataList){
        //クイズインスタンスの作成
        return quizDataList.map(quizData => {
            return{
                question: he.decode(quizData.question),
                correctAnswer: he.decode(quizData.correct_answer),
                incorrectAnswers: quizData.incorrect_answers.map(str => he.decode(str))
            }
        })
        .map(quizData => {
            return new Quiz(quizData);
        })
    }
   /*static async fetchAndCreateQuizzes(){
    const QuizList = await QuizFetcher.fetch();

        return QuizList.results.map(result => {
            return {
                question: he.decode(result.question),
                correctAnswer: he.decode(result.correct_answer),
                incorrectAnswers: result.incorrect_answers.map(str => he.decode(str))
            }
        })
        .map(quizData => {
            return new Quiz(quizData);
    });*/
};

export default Quiz;