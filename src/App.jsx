import React from "react"
import Intro from "./Intro"
import Question from "./Question"
import Questions from "./Questions"
import { nanoid } from "nanoid"

export default function App() {
    const [quiz, setQuiz] = React.useState(true)
    const [showCorrect, setShowCorrect] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [questionsWithAnswers, setQuestionsWithAnswers] = React.useState([{
        id: 0,
        question: "",
        answers: [],
        correctAnswer: "",
        selectedAnswer: ""
    }])

    function startQuiz() {
        setQuiz(oldQuiz => !oldQuiz)
    }

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                setQuestions(data.results)
                let questionsWithAnswersArray = []
                data.results.map(result => {
                    let answersArray = result.incorrect_answers
                    answersArray.push(result.correct_answer)
                    answersArray = answersShuffle(answersArray)
                    //answersArray.push(answer)
                    let question = {
                        id: nanoid(),
                        question: result.question,
                        answers: answersArray,
                        correctAnswer: result.correct_answer,
                        selectedAnswer: ""
                    }
                    questionsWithAnswersArray.push(question)
                })
                setQuestionsWithAnswers(questionsWithAnswersArray)
            })
    }, [])


    function answersShuffle(arrayOfAnswers) {
        const randomNumber = Math.ceil(Math.random() * arrayOfAnswers.length)
        for (let i = 0; i < randomNumber; i++) {
            let answer = arrayOfAnswers.pop()
            arrayOfAnswers.unshift(answer)
        }
        return arrayOfAnswers
    }

    function generateQuestion(questionAndAnswer) {
        return <Question
            key={questionAndAnswer.id}
            question={questionAndAnswer}
            selectAnswer={selectAnswer}
            showCorrect={showCorrect}
        />
    }

    function generateQuestions(questionsAndAnswers) {
        const questionsAndAnswersArray = questionsAndAnswers.map(questionAndAnswer => generateQuestion(questionAndAnswer))
        return <Questions questions={questionsAndAnswersArray} />
    }
    function selectAnswer(answeredQuestion, selectedAnswer) {
        setQuestionsWithAnswers(oldQuestionsWithAnswers => {
            return oldQuestionsWithAnswers.map(questionWithAnswer => {
                return answeredQuestion === questionWithAnswer.question ?
                    { ...questionWithAnswer, selectedAnswer: selectedAnswer } :
                    questionWithAnswer
            })
        })
    }

    function checkAnswers() {
        questionsWithAnswers.map(q => console.log(q.selectedAnswer))
        setShowCorrect(oldShowCorrect => !oldShowCorrect)

    }

    return (
        <div className="intro--container">
            {quiz
                ?
                <div >
                    <Intro startQuiz={startQuiz} />
                </div>
                :
                <div>
                    {generateQuestions(questionsWithAnswers)}
                    <button
                        className="check--button"
                        onClick={checkAnswers}
                    >Check Answers</button>
                </div>
            }
        </div>
    )


}