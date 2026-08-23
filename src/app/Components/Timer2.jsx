import React, {useState, useEffect, useRef} from "react";

//new timer that calculates remaining time using the computer's clock, eliminates throttling issues caused when tab is not active
// timer based off the code in here: https://community.articulate.com/discussions/discuss/javascript-countdown-timer-stops-when-tab-minimized/1224299

const Timer2 = ({time, setTime, answer}) => {

  

    useEffect(() => {
    let duration = new Date().getTime() + (time*1000);
    let id = setInterval(() => {
      
      let curr = new Date().getTime();
      let count = (duration - curr);
      console.log(Math.round(count/1000))
      

      if (count <= 0) {
        clearInterval(id)
        if (!answer) setTime(0); //timer jumps up to one without this line, being put in a conditional statement also prevents the timer from showing zero if an answer was given with ~1s left
        return;
      }

      if (answer) {
        clearInterval(id)
        return;
      }

      setTime(prev => Math.round(count/1000))
    }, 1000);
    
    

    return () => clearInterval(id);
  }, [time, answer]);

    return (
        <h2 id="timer"style={{ color: (time > 3)? 'black': 'crimson' }}>{time}</h2>
    )
}

export default Timer2