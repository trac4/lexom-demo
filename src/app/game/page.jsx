'use client'
import React, {useState,useEffect} from 'react'
import Question from '../Components/Question'
import Timer2 from '../Components/Timer2';
import Score from '../Components/Score';
import axios from 'axios';
import Link from 'next/link';

export default function GamePage() {

    const timeLimit = 8
    const [time, setTime] = useState(timeLimit);
    const [score, setScore] = useState(0);
    const [answer, setAnswer] = useState(null);
    const [checkingWord, setCheckingWord] = useState(false) //disables form while a word is being checked for validty. reduces duplicate form submission, which would otherwise give player extra points
    
    //loading questions from database
    const [prompt, setPrompt] = useState({}) //errors will arise if an empty object is uninitialized
    const [questionNum, setQuestionNum] = useState(1)
    const [fetchedPrompt, setFetchedPrompt] = useState(false) //when made true, the message for user in Question component is cleared out via a useEffect
    const [result, setResult] = useState(false)
    
      useEffect(() => {
        async function test() {
          setPrompt({}) //prompt object is made empty, timer won't be shown until the object is refilled with new questions
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
    console.log(score)

    async function submitScore () {
      const res = await axios.post('/api/game/leaderboard', {score})
      console.log(res.data)
      setResult(true)
    }


    
    const timerStartsSoon = <h2 id="timer">Timer will start soon</h2>
    
    //will show either the button to get the next question or to submit user's score
    const next = questionNum !== 2? <div className='next-question'
     onClick={() => {
    setQuestionNum(prev => prev + 1);
    setTime(timeLimit);
    setFetchedPrompt(true)
    setAnswer(null)
  }}
     ><p>Next Question</p></div> : 
     <div className='next-question'
     onClick={submitScore}
     ><p>Submit Score</p></div>
  return (
    <div className='game-screen'>
    
    {prompt.prompt? <Timer2 time = {time} setTime = {setTime} answer = {answer}/> : timerStartsSoon}

    <Question time = {time} setScore = {setScore} setAnswer= {setAnswer} answer = {answer} checkingWord = {checkingWord} setCheckingWord = {setCheckingWord} fetchedPrompt={fetchedPrompt} setFetchedPrompt={setFetchedPrompt} prompt = {prompt}/>

    <Score score = {score}/>

    {(time <=0 || answer) && !checkingWord && !result && next}
    
    {result && <div className='game-results'>
      <h3>You placed 1st</h3>
      <Link href='/leaderboard'>View Leaderboard</Link>
    </div>}
    
    </div>
  )
}
