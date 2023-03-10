import React from "react"
import {nanoid} from "nanoid"


export default function Question(props) {
    //const [answerChecked, setAnswerChecked] = React.useState([])
   const {category, type, difficulty, question, correct_answer, incorrect_answers, id, answerChosen} = props.question
   //const [checked, setChecked] = React.useState(false)
   const [unsortedAnswers, setUnsortedAnswers] = React.useState(answerShuffle())   

   React.useEffect(()=>{
    const randomNumber = Math.ceil(Math.random()*incorrect_answers.length)
    let unsortedAnswers = incorrect_answers.slice(randomNumber)
    unsortedAnswers.push(correct_answer)
    for(let i=0;i<randomNumber;i++){
        unsortedAnswers.push(incorrect_answers[i])   
    }
    //let btnId = nanoid();
    unsortedAnswers = unsortedAnswers.map(
        answer => ({answer, id: nanoid(), checked: false})
    )       
   },[])

   function answerShuffle(){
            const randomNumber = Math.ceil(Math.random()*incorrect_answers.length)
            let unsortedAnswers = incorrect_answers.slice(randomNumber)
            unsortedAnswers.push(correct_answer)
            for(let i=0;i<randomNumber;i++){
                unsortedAnswers.push(incorrect_answers[i])   
            }
            //let btnId = nanoid();
            let unsortedAnswersWithIds = unsortedAnswers.map(
                answer => ({answer, id: nanoid(), checked: false})
            )       
        return unsortedAnswersWithIds
        }
           
    
    //console.log(unsortedAnswers)
    const answers = unsortedAnswers.map(answer =>
        <button //className={checked ? "chosen" : ""}
        key = {answer.id}
        onClick={() => {
            props.answerChecked(answer.answer, id)
            //checked = !checked
            //setChecked(oldChecked => !checked)
            //style = bnt_id === key? {backgroundColor: red} : {backgroundColor: F5F7FB}
            }
            
            }
        >
        {answer.answer}
        </button>  
        
    )
    return (
        <div>
        <p className="question">{question}</p>
        {answers}
        </div>
    )
}
