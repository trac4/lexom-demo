'use client';
import React, {useEffect,useState} from 'react'
import axios from 'axios';
import SpinnerLoader from '../Components/SpinnerLoader';

export default function page() {
  const [prompt, setPrompt] = useState({}) //errors will arise if an empty object is uninitialized
  const [questionNum, setQuestionNum] = useState(1)

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

  
  console.log(prompt)

  return (
    <div>{prompt.prompt}
      <button onClick={() => {
    setQuestionNum(prev => prev + 1)
  }}>next question</button>

    <SpinnerLoader></SpinnerLoader>
    </div>
    
  )
}
