import React from "react"
import Intro from "./Intro"
import Question from "./Question"
import {nanoid} from "nanoid"

export default function App() {
    //console.log(nanoid())
    const [quiz, setQuiz] = React.useState(false)
    const [questions, setQuestions] = React.useState([{
        id: 0,
        category: "",
        type: "",
        difficulty: "",
        question: "",
        correct_answer: "",
        incorrect_answers: [""],
        //answerChosen: false,
        correctAnswerChecked: false
    }])
    
    
    function startQuiz(){
        setQuiz(oldQuiz => !oldQuiz)
    }
    
  
  React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                let qArray = []
                for(let i=0;i<data.results.length;i++){
                    let question = {
                        ...data.results[i],
                        id: nanoid(),
                        //answerChosen: false,
                        correctAnswerChecked: false
                    }
                    qArray.push(question)
                }
               setQuestions(qArray)
            })  
    }, [])
          
    //console.log(questions)
    
    
    function questionsArray() {
        return (
            questions.map( question => 
                <Question 
                    key={question.id} 
                    question={question} 
                    answerChecked={answerChecked}
                />)
        )
    }
    //console.log(questions)
 
    function answerChecked(answer, id){
        let questionAnswered

        questions.map( question => {
            if(question.id === id){
                questionAnswered = question
            }
        })
        if(answer === questionAnswered.correct_answer){
            console.log(`good answer!`)
        }else {
            console.log(`Wrong! Correct answer is ${questionAnswered.correct_answer}`)
        }

      /*
      setQuestions(oldQuestions => 
        oldQuestions.map( question => {
            return question.id === id ? 
                {...question, answerChosen: true} :
                {...question, answerChosen: false}
        }
            )
      )
      */
      setQuestions(oldQuestions => 
        oldQuestions.map( question => {
            return answer === question.correct_answer ? 
                {...question, correctAnswerChecked: !question.correctAnswerChecked} :
                question
        }
            )
      )
      
    }

    function checkAllAnswers() {
        questions.map (question => {
            console.log(question.correctAnswerChecked)
        })
    }
   
    
    return (
        <div className="intro--container">
        { quiz 
        ?
        <div>
        {questionsArray()}
        <button
        onClick={checkAllAnswers}
        >
          
         Check answers 
        </button>
        </div>
        : 
        <Intro startQuiz={startQuiz}/>
        }
        </div>
    )
}