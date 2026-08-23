import React, {useState, useEffect} from "react";


const Timer = ({time, setTime, answer}) => {


    useEffect(() => {
    let id;
    if (time <= 0) return; //timer hits
    
    if (!answer) {
    id = setInterval(() => {
      setTime((timer) => timer - 1);
    }, 1000);
    } else if (answer) clearInterval(id);
    

    return () => clearInterval(id);
  }, [answer, time]);

    return (
        <h2 id="timer">{time > 0? time : 0}</h2>
    )
}

export default Timer