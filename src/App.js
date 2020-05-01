import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Quiz from './components/Quiz/Quiz';


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Home}/>
        <Route path="/Quiz" exact component={Quiz}/>
      </Router>
    </div>
  );
}

export default App;
