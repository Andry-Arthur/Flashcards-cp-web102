import { useState } from 'react'
import './App.css'
import Flashcard from './components/Flashcard'

function App() {
  const [countCards, setCountCards] = useState(10)
  const [cardId, setCardId] = useState(1)
  return (
    <div className="App">
      <div className="header">
        <h1>Linear Algebra Midterm 1</h1>
        <h3>Need to get ready for your first Linear Algebra Exam? These are the flashcards for you!</h3>
        <h4>Number of cards: {countCards}</h4>
        <Flashcard question="Linear Equation" 
        answer="an equation that can be written in the form ax_1+ax_2+... a_n+x_n=b, where a_1,...,a_n are coefficient real or complex numbers. x_1, ... x_n are variables and b is a constant."
        id={cardId} />
      </div>
    </div>
  )
}

export default App
