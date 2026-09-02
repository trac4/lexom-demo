import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {syllable} from 'syllable' //filler for when API does not return a word's syllable count
import { scorer, rateScore, rate } from '../utils/scorer'; //scoring algorithm
import { profanity } from '@hackertron/less-strict-profanity';
import { determineLongestWord } from '../utils/determineLongestWord';


export default function Question({time,setScore,setAnswer, answer, checkingWord, setCheckingWord, fetchedPrompt, setFetchedPrompt, prompt, setLongestWord}) {

const [messageForUser, setMessageForUser] = useState("");
const [entered, setEntered] = useState('')


// useEffect is needed so that the time message is shown to the user without error
//also needed to clear message for user
useEffect(() => {
    if (time <= 0) {
      setMessageForUser("Time's up!");
      setScore(prev => prev + 0);
    }

    if(fetchedPrompt === true) {
      setMessageForUser("")
      setFetchedPrompt(false)
    }
  }, [time, fetchedPrompt]); 
  
//Basic anti-cheats to prevent copy/pasting + similar tactics
  function illegalMoveDetected(e) {
    console.log(e)
    e.preventDefault();
    switch(e.type) {
      case 'paste':
        setMessageForUser("Pasting is not allowed");
        break;
      case 'drop':
        setMessageForUser("Dragging and dropping is not allowed");
    }
  }

  //function to handle invalid key presses
  function checkInavlid(e) {
    setMessageForUser(""); //clears any error message caused from prior key presses
    const { key, ctrlKey: ctrl, altKey: alt, shiftKey: shift } = e;
    const specialKeys = [shift];
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let otherKeys = [ "Backspace", "ArrowUp", "ArrowLeft", "ArrowRight", "ArrowDown", "Meta", 'Control', 'Alt', 'Shift', 'AudioVolumeDown', 'AudioVolumeUp', 'Delete', 'Home', 'PageUp', 'PageDown', 'MediaPlayPause', 'CapsLock', 'NumLock', "Enter" ];
    if (checkingWord) {
      otherKeys = otherKeys.filter(key => key !== 'Enter');
    } else {
      if(otherKeys.includes('Enter') === false ) otherKeys = [...otherKeys, 'Enter']
    }

    if (key === " ") {
      e.preventDefault();
      setMessageForUser("No spaces allowed");
    } else if (
      (!otherKeys.includes(key) && !alphabet.includes(key.toLowerCase()) && specialKeys.includes(true)) ||
      (!otherKeys.includes(key) && !alphabet.includes(key.toLowerCase()))
       
    ) {
      e.preventDefault(); 
      setMessageForUser('Invalid input, text must be letters only');
    }
  }

  //what to do with a submit
  async function handleSubmit(e, word) {
    e.preventDefault();
    setMessageForUser('Checking word...') //clears message caused by any posssible invalid actions
    setCheckingWord(true);
    const options = {
      method: "GET",
      url: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
      headers: {
        "x-rapidapi-key": 'b05486b67cmsh77e7581ac208fbep1b1854jsn96e57773bcb0',
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    };
    
  
    //only ping the api if something was typed into the input box upon submission
    if (word === "") setMessageForUser("Please type something into the input box");
    
    else {
      try {
        //intercept a curse word early so that an unnecessary api call is not made
        if (profanity.exists(word)) throw Error ('That word is not allowed.')

        const response = await axios.request(options);
        let freq = response.data.frequency || 3; //3 is the default value in case API does not list a frequency
        let syl = syllable(word)
        console.log(freq)
        console.log(syl)
        // console.log(response)
        console.log(response.data);
        // console.log(response.data.results.map(r => r.definition));
        // console.log(response.data.results?.map(r => r.partOfSpeech || null));
        const posFromApi = [response.data.results?.map(r => r.partOfSpeech || null)].flat().map(pos => String(pos))
        console.log(posFromApi)

        //eventual space for checking if the word submitted was valid...
        if (word.length < prompt.minLength) throw Error('That word is too short')
        
        if (prompt.beginningWith.length) {
          let validBeginner = false
          for (let beginningCharacter of prompt.beginningWith) {
            if (word.toLowerCase().startsWith(beginningCharacter)) {
              validBeginner = true;
              break;
            }
          }
          if (!validBeginner) throw Error ('The word does not begin with the correct letter(s)')
        }

        if (prompt.endingWith.length) {
          let validEnder = false
          for (let endingCharacter of prompt.endingWith) {
            if (word.toLowerCase().endsWith(endingCharacter)) {
              validEnder = true;
              break;
            }
          }
          if (!validEnder) throw Error ('The word does not end with the correct letter(s)')
        }

        if(syl < prompt.minSyllables) throw Error('The word you submitted has too few syllables')
          console.log(syl , prompt.minSyllables)
        if(prompt.acceptedWords.length && prompt.acceptedWords.indexOf(word) === -1) throw Error ('Invalid word submitted')
        

        //only once a word is valid can a score be given

        let score = scorer(word.toLowerCase(), freq, syl)
        setAnswer(word);
        setScore(prev=> prev + score);
        setMessageForUser(rateScore(score))
        setLongestWord(prev => determineLongestWord(prev,word))
      } catch (error) {
        if (error.message ==='Request failed with status code 404') error.message ='Invalid word submitted'
        setMessageForUser(error.message);
        
      }
      finally {
        setEntered('')
        setCheckingWord(false) //placed in the finally category so that a user can type again heading into the next question
      }
    }
  }

  return (
    <>

    
    <form className='game-question' action="" onSubmit={(e) => handleSubmit(e,entered.toLowerCase())}>
        <label htmlFor="user-input"><h2>{prompt.prompt || 'Fetching question...'}</h2></label>
        <div className="submission">
        <input
        type="text"
        name="entry"
        id="user-input"
        value={entered}
        onPaste={(e) => illegalMoveDetected(e)}
        onDrop={(e) => illegalMoveDetected(e)}
        onKeyDown={(e) => checkInavlid(e)}
        onChange={e => setEntered(e.target.value)}
        disabled = {time <= 0 || answer || checkingWord || prompt.prompt === undefined}
      />
            <button disabled = {time <= 0 || answer || checkingWord || prompt.prompt === undefined}>➡</button>
        </div> 
        <p id='message-for-user' style={{ color: (rate.includes(messageForUser))? 'green': 'crimson' }}>{messageForUser}</p>
    </form>
    
    </>
  );

}



