'use client'
import React, {useState,useEffect} from 'react'
import Question from '../Components/Question'
import Timer2 from '../Components/Timer2';
import Score from '../Components/Score';
import axios from 'axios';

export default function GamePage() {

    
    const [time, setTime] = useState(8);
    const [score, setScore] = useState(0);
    const [answer, setAnswer] = useState(null);
    const [checkingWord, setCheckingWord] = useState(false) //disables form while a word is being checked for validty. reduces duplicate form submission, which would otherwise give player extra points
    
    //loading questions from database
    const [prompt, setPrompt] = useState({}) //errors will arise if an empty object is uninitialized
    const [questionNum, setQuestionNum] = useState(1)
    const [fetchedPrompt, setFetchedPrompt] = useState(false) //when made true, the message for user in Question component is cleared out via a useEffect
    
      useEffect(() => {
        async function test() {
          try {
            const {data} = await axios.get(`/api/game/question/${questionNum}`);
          setPrompt(prev => ({
            ...prev,
            ...data
          }))
          } catch (error) {
            console.log(error)
          }
          
        }
        test()
      }, [questionNum]);

    console.log(time)
    console.log(prompt)
    //to-do: improve state management
  return (
    <div className='game-screen'>
    
    <Timer2 time = {time} setTime = {setTime} answer = {answer}/>
    <Question time = {time} setScore = {setScore} setAnswer= {setAnswer} answer = {answer} checkingWord = {checkingWord} setCheckingWord = {setCheckingWord} fetchedPrompt={fetchedPrompt} setFetchedPrompt={setFetchedPrompt} prompt = {prompt}/>
    <Score score = {score}/>
    {(time <=0 || answer) && <div id='next-question'
     onClick={() => {
    setQuestionNum(prev => prev + 1);
    setTime(8);
    setFetchedPrompt(true)
    setAnswer(null)
  }}
     ><p>Next Question</p></div>}
    </div>
  )
}
