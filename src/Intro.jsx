import React from "react"

export default function Intro(props) {
    
    
    return (
        <div>
        <h1>Quizzical</h1>
        <h3>Some description if needed</h3>
        <button onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}