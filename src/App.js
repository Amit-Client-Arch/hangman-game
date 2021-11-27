import React from 'react';
import './styles/global.scss';
import HangMan from './components/Game/hangman';

const App = () => (
  <>
    <div className="wrapper">
      <h1>Hangman</h1>
      <h2>Vanilla JavaScript Hangman Game</h2>
      <p>
        Use the alphabet below to guess the word, or click hint to get
        a clue.
      </p>
    </div>
    <HangMan />
  </>
);

export default App;
