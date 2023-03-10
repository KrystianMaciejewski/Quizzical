import React from "react"
import { decode } from 'html-entities';


export default function Question(props) {
    const { answers, question, selectedAnswer, correctAnswer } = props.question
    const answerButtons = answers.map((answer, index) =>
        <button
            className={`
                ${selectedAnswer === answer ? "chosen" : ""} 
                ${props.showCorrect && selectedAnswer === answer && correctAnswer === answer ? "correct" : ""}
                ${props.showCorrect && selectedAnswer === answer && correctAnswer !== answer ? "incorrect" : ""}
                ${props.showCorrect && selectedAnswer !== answer ? "faded" : ""}
            `}
            key={index}
            onClick={() => props.selectAnswer(question, answer)}
        >{decode(answer)}</button>)

    return (
        <div className="question--container">
            <p className="question--question">{decode(question)}</p>
            <p>{answerButtons}</p>
        </div>
    )
}
