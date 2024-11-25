import React, { useState, useEffect, useRef } from 'react'

const Stopwatch = () => {

  const [isRunning, setIsRunning] = useState(false);
  const [elaspedTime, setElapsedTime] = useState(0);
  const internvalIdRef = useRef(null);
  const startTimerRef = useRef(0);

  useEffect(() => {

    if(isRunning){
      internvalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimerRef.current);
      }, 10)
    }

    return () => {
      clearInterval(internvalIdRef.current); 
    }



  }, [isRunning])

  function start(){
    setIsRunning(true);
    startTimerRef.current =Date.now() -elaspedTime;
    console.log(startTimerRef.current);

  }

  function stop() {
    setIsRunning(false);

  }
  function reset() {

    setElapsedTime(0);
    setIsRunning(false);
  }
  function formatTime() {
    let hours = Math.floor(elaspedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elaspedTime / (1000 * 60 ) % 60);
    let seconds = Math.floor(elaspedTime / (1000)  % 60);
    let miliseconds = Math.floor(elaspedTime  % 1000 / 10);

      hours = String(hours).padStart(2, '0');
      minutes = String(minutes).padStart(2, '0');
      seconds = String(seconds).padStart(2, '0');
      miliseconds = String(miliseconds).padStart(2, '0');

    return `${minutes}:${seconds}:${miliseconds}`;

  }


  return (
    <div className='stopwatch'>
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button className='start-button' onClick={start}>Start</button>  
        <button className='stop-button' onClick={stop}>Stop</button>
        <button className='reset-button' onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

export default Stopwatch
