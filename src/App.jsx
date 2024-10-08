import { useState } from 'react'
import './App.css'
import Flashcard from './components/Flashcard'

function App() {
  const flashcards = [
    {
      id: 0,
      question: "Start!",
      answer: "Press the next arrow to start the flashcards :)"
    },
    {
      id: 1,
      question: "Linear Equation",
      answer: "an equation that can be written in the form ax_1+ax_2+... a_n+x_n=b, where a_1,...,a_n are coefficient real or complex numbers. x_1, ... x_n are variables and b is a constant."
    },
    {
      id: 2,
      question: "System of linear equation",
      answer: "a collection of one or more linear equations involving the same variables"
    },
    {
      id: 3,
      question: "Solution (of the system)",
      answer: "is a list of numbers that make each equation a true statement when the numbers are substituted into the variables respectively."
    },
    {
      id: 4,
      question: "Linear system equivalence",
      answer: "when the linear systems have the same solution set."
    },
    {
      id: 5,
      question: "Consistent",
      answer: "when a system has either one or infinitely many solutions."
    },
    {
      id: 6,
      question: "Inconsistent",
      answer: "when a system has no solution."
    },
    {
      id: 7,
      question: "Uniqueness of the reduced echelon form",
      answer: "Each matrix is row equivalent to one and only one reduced echelon matrix."
    },
    {
      id: 8,
      question: "Pivot position",
      answer: "A location in a matrix that corresponds to a leading 1 in its reduced echelon form."
    },
    {
      id: 9,
      question: "Pivot column",
      answer: "A column that contains a pivot position."
    },
    {
      id: 10,
      question: "Pivot",
      answer: "A nonzero number in a pivot position is used to create zeros (in the rows below it) via row operations."
    },
    {
      id: 11,
      question: "Existence and uniqueness theorem",
      answer: "1) A linear system is consistent if and only if the rightmost column of the augmented matrix is not a pivot column, i.e., the echelon form has no rows such as [0 ... 0 | b] where b ≠ 0.\n2) If a system is consistent, and it has no free variables, it has a unique solution. If it has at least one free variable, it has infinitely many solutions."
    },
    {
      id: 12,
      question: "Parallelogram Rule for Addition",
      answer: "If u and v in R² are represented as points in the plane, then u+v corresponds to the fourth vertex of the parallelogram whose other vertices are u, 0, and v."
    },
    {
      id: 13,
      question: "Linear combination",
      answer: "A sum of scalar multiples of vectors. The scalars are called the weights."
    },
    {
      id: 14,
      question: "Span",
      answer: "The set of all linear combinations of a vector."
    }
  ];
  
  const [countCards, setCountCards] = useState(flashcards.length);
  const [cardId, setCardId] = useState(0);
  const [countSteak, setCountSteak] = useState(0);
  const [countLongStreak, setCountLongStreak] = useState(0);
  const [cardColor, setCardColor] = useState('');
  const currentCard = flashcards.find(card => card.id === cardId);
  const [cardSequence, setCardSequence] = useState(shuffleArray([...Array(flashcards.length-1).keys()].map(i => i + 1)));

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const changeCard = () => {
    setCardId(prevId => {
      const nextIndex = (cardSequence.indexOf(prevId) + 1) % cardSequence.length;
      return cardSequence[nextIndex];
    });
  }

  const previousCard = () => {
    setCardId(prevId => {
      const prevIndex = cardSequence.indexOf(prevId) - 1;
      if (prevIndex < 0) {
        return prevId; // Don't change the card if we're at the beginning
      }
      return cardSequence[prevIndex];
    });
  }

  const shuffleCards = () => {
    setCardSequence(shuffleArray([...Array(flashcards.length-1).keys()].map(i => i + 1)));
    setCardId(0); // Reset to the start card
  }

  const checkGuess = () => {
    const userGuess = document.querySelector('.guess-input').value.trim().toLowerCase();
    const correctAnswer = currentCard.answer.trim().toLowerCase();
    
    // Simple similarity check: check if the correct answer is a substring of the user guess or vice versa
    const isSimilar = userGuess && (userGuess.includes(correctAnswer) || correctAnswer.includes(userGuess));

    if (isSimilar) {
      setCardColor('green');
      setTimeout(() => {
      setCardColor('');
      }, 1500);
      setCountSteak(countSteak + 1);
      document.querySelector('.guess-input').value = ''; // Reset the input
      changeCard(); // Move to the next card
      if (countSteak + 1 > countLongStreak) {
        setCountLongStreak(countSteak + 1);
      }
    } else {
      setCardColor('red');
      setTimeout(() => {
        setCardColor('');
      }, 1500);
      setCountSteak(0);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Linear Algebra Midterm 1</h1>
        <h3>Need to get ready for your first Linear Algebra Exam? These are the flashcards for you!</h3>
        <h4>Number of cards: {countCards-1}</h4> {/* -1 because the first card is the start card */}
        <h4>🔥Current streak: {countSteak} | ❤️‍🔥 Current longest streak: {countLongStreak}</h4>
      </div>
      <Flashcard id={currentCard.id} question={currentCard.question} answer={currentCard.answer} cardColor={cardColor} />
      <div className="guess-section">
        <h4>What is the term/definition?</h4>
        <input 
          type="text" 
          placeholder="Your guess..." 
          className="guess-input"
        />
        <button className="submit-button" onClick={checkGuess}>Submit</button>
      </div>
      <div className="navigation-buttons">
        <button className="previous-card-button" onClick={previousCard}>Previous Card</button>
        <button className="new-card-button" onClick={changeCard}>Next Card</button>
        <button className="shuffle-button" onClick={shuffleCards}>Shuffle Cards</button>
      </div>
    </div>
  )
}
export default App;