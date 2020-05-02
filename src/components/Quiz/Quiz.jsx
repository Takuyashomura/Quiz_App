import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { fetchQuizzes } from '../../actions/quizActionCreator';
import '../../models/Quiz.js';
import './Quiz.css';

class Quiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: 0,
            numberOfCorrect: 0
        };
    };
    componentDidMount() {
        this.restart();
    };

    restart() {
        this.setState({
            currentIndex: 0,
            numberOfCorrect: 0
        })
        this.props.fetchQuizzes();
    }

    selectAnswer(quiz, answer) {
        let { currentIndex, numberOfCorrect } = this.state;
        const isCorrect = quiz.judgeCorrectAnswer(answer);

        if (isCorrect) {
            numberOfCorrect ++;
            alert('Correct answer!');
        } else {
            alert(`Wrong answer....this correct answer is${quiz.correctAnswer}`);
        }
        currentIndex ++;
        this.setState({
            currentIndex,
            numberOfCorrect
        });
    };

    render() {
        const { quizzes } = this.props.quizInfo;
        const { currentIndex } = this.state;
        if (quizzes.length === 0 ) {
            return this.renderLoading();
        }
        if (quizzes.length > 0 && currentIndex < quizzes.length) {
            return this.renderQuiz();
        }
        if (quizzes.length > 0 && quizzes.length <= currentIndex) {
            return this.renderResult();
        }
    }

    renderLoading() {
        return (
            <div>
                <p>読み込み中・・・</p>
                <hr />
                <Link to={'/'}>トップページに戻る</Link>
            </div>
        );
    }

    renderQuiz() {
        const { quizzes } = this.props.quizInfo;
        const { currentIndex } = this.state;
        const quiz = quizzes[currentIndex];
        const answers = quiz.shuffleAnswers().map((answer, index) => {
            return (
                <li key={index}>
                    <Button onClickHandler={() => {
                        this.selectAnswer(quiz, answer);
                    }}>{answer}</Button>
                </li>
            );
        });

        return (
            <div>
                <p>{quiz.question}</p>
                <ul className='quiz-list'>{answers}</ul>
                <hr />
                <Link to={'/'}>トップページに戻る</Link>
            </div>
        )
    }

    renderResult() {
        const { quizzes } = this.props.quizInfo;
        const { numberOfCorrect } = this.state;
        return (
            <div>
                <h1>クイズ結果</h1>
                <p>{`${numberOfCorrect}/${quizzes.length}correct!`}</p>
                <Button onClickHandler={() => this.restart()}>リスタート</Button>
                <hr />
                <Link to={'/'}>トップページに戻る</Link>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        quizInfo: state.quizInfo
    }
};

const mapDispatchToProps = { fetchQuizzes };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Quiz);