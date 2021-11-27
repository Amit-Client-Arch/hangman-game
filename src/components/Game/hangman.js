/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import './hangman.scss';

const HangMan = () => {
  const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  let categories; // Array of topics
  let chosenCategory; // Selected catagory
  let word; // Selected word
  let guess; // Geuss
  let geusses = []; // Stored geusses
  let lives; // Lives
  let counter; // Count correct geusses
  let space; // Number of spaces in word '-'
  let catagoryName;
  let hints;

  let showLives;
  let showClue;
  let getHint;
  let resetButton;
  let letters;
  let correct;

  const getElements = () => {
    // Get elements
    showLives = document.getElementById('mylives');
    // const showCatagory = document.getElementById('scatagory');
    showClue = document.getElementById('clue');
    getHint = document.getElementById('hint');
    resetButton = document.getElementById('reset');
    letters = document.createElement('ul');
    correct = document.createElement('ul');
    catagoryName = document.getElementById('catagoryName');
  };

  // Select Catagory
  const selectCat = () => {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML =
        'The Chosen Category Is Premier League Football Teams';
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = 'The Chosen Category Is Films';
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = 'The Chosen Category Is Cities';
    }
  };

  // Create geusses ul
  const result = () => {
    const wordHolder = document.getElementById('hold');

    for (let i = 0; i < word.length; i++) {
      correct.setAttribute('class', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === '-') {
        guess.innerHTML = '-';
        space = 1;
      } else {
        guess.innerHTML = '_';
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  };

  // Show lives
  const comments = () => {
    showLives.innerHTML = `You have ${lives} lives`;
    if (lives < 1) {
      showLives.innerHTML = 'Game Over';
    }
    for (let i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = 'You Win!';
      }
    }
  };

  // Hangman
  const canvas = () => {
    const myStickman = document.getElementById('stickman');
    const context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = '#fff';
    context.lineWidth = 2;
  };

  const head = () => {
    const myStickman = document.getElementById('stickman');
    const context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const draw = ($pathFromx, $pathFromy, $pathTox, $pathToy) => {
    const myStickman = document.getElementById('stickman');
    const context = myStickman.getContext('2d');
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  };

  const frame1 = () => {
    draw(0, 150, 150, 150);
  };

  const frame2 = () => {
    draw(10, 0, 10, 600);
  };

  const frame3 = () => {
    draw(0, 5, 70, 5);
  };

  const frame4 = () => {
    draw(60, 5, 60, 15);
  };

  const torso = () => {
    draw(60, 36, 60, 70);
  };

  const rightArm = () => {
    draw(60, 46, 100, 50);
  };

  const leftArm = () => {
    draw(60, 46, 20, 50);
  };

  const rightLeg = () => {
    draw(60, 70, 100, 100);
  };

  const leftLeg = () => {
    draw(60, 70, 20, 100);
  };

  const drawArray = [
    rightLeg,
    leftLeg,
    rightArm,
    leftArm,
    torso,
    head,
    frame4,
    frame3,
    frame2,
    frame1,
  ];

  // Animate man
  const animate = () => {
    const drawMe = lives;
    drawArray[drawMe]();
  };

  // OnClick Function
  const check = (list) => {
    list.onclick = () => {
      const geuss = list.innerHTML;
      list.setAttribute('class', 'alphabet__letter active');
      list.onclick = null;
      for (let i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        }
      }
      const j = word.indexOf(geuss);
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    };
  };

  // create alphabet ul
  const buttons = () => {
    const myButtons = document.getElementById('buttons');

    for (let i = 0; i < alphabet.length; i++) {
      letters.classList.add('alphabet');
      const list = document.createElement('li');
      list.classList.add('alphabet__letter');
      list.innerHTML = alphabet[i];
      check(list);
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  };

  // Play
  const play = () => {
    categories = [
      [
        'everton',
        'liverpool',
        'swansea',
        'chelsea',
        'hull',
        'manchester-city',
        'newcastle-united',
      ],
      ['alien', 'dirty-harry', 'gladiator', 'finding-nemo', 'jaws'],
      ['manchester', 'milan', 'madrid', 'amsterdam', 'prague'],
    ];

    chosenCategory =
      categories[Math.floor(Math.random() * categories.length)];
    word =
      chosenCategory[
        Math.floor(Math.random() * chosenCategory.length)
      ];
    word = word.replace(/\s/g, '-');
    console.log(word);
    buttons();

    geusses = [];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
    canvas();
  };

  useEffect(() => {
    getElements();
    play();

    getHint.onclick = () => {
      hints = [
        [
          'Based in Mersyside',
          'Based in Mersyside',
          'First Welsh team to reach the Premier Leauge',
          'Owned by A russian Billionaire',
          'Once managed by Phil Brown',
          '2013 FA Cup runners up',
          "Gazza's first club",
        ],
        [
          'Science-Fiction horror film',
          '1971 American action film',
          'Historical drama',
          'Anamated Fish',
          'Giant great white shark',
        ],
        [
          'Northern city in the UK',
          'Home of AC and Inter',
          'Spanish capital',
          'Netherlands capital',
          'Czech Republic capital',
        ],
      ];

      const catagoryIndex = categories.indexOf(chosenCategory);
      const hintIndex = chosenCategory.indexOf(word);
      showClue.innerHTML = `Clue: - ${hints[catagoryIndex][hintIndex]}`;
    };

    // Reset

    resetButton.onclick = () => {
      document.querySelectorAll('.guess').forEach((e) => e.remove());
      document
        .querySelectorAll('.alphabet__letter')
        .forEach((e) => e.remove());

      showClue.innerHTML = '';
      const myStickman = document.getElementById('stickman');
      const context = myStickman.getContext('2d');
      context.clearRect(0, 0, 400, 400);
      play();
    };
  }, []);

  return (
    <div className="wrapper">
      <div id="buttons" />
      <p id="catagoryName" />
      <div id="hold" />
      <p id="mylives" />
      <p id="clue">Clue -</p>
      <canvas id="stickman">
        This Text will show if the Browser does NOT support HTML5
        Canvas tag
      </canvas>
      <div className="container">
        <button type="button" id="hint">
          Hint
        </button>
        <button type="button" id="reset">
          Play again
        </button>
      </div>
    </div>
  );
};

export default HangMan;
