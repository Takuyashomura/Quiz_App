import React from 'react';
import Button from '../Button/Button';

const Home = ( {history} ) => {
    return(
        <div>
        <Button onClickHandler={() => {
            history.push('Quiz/');
        }} >クイズを始める</Button>
        </div>
    )
}

export default Home;