import React from 'react'
import { useState, useEffect } from 'react';

const Timer = (props) => {
    const {initialHours = 0 , initialMinute = 0, initialSeconds = 0} = props;
    const [minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    const [hours , setHours] = useState(initialHours);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    if(hours === 0 ) {
                        clearInterval(myInterval)
                    }
                    else {
                        setHours(hours - 1)
                        setMinutes(59)
                        setSeconds(59)
                    }
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <div>
        { minutes === 0 && seconds === 0
            ? <h1>meeting ended</h1>
            : <h1> {hours}:{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
    )
}

export default Timer;