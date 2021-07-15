import { useState } from "react";


export default function useVisualMode(initialState) {

  const [mode, setMode] = useState(initialState);
  const [history, setHistory] = useState([initialState]);

  function transition(newMode, replace = false){
    setMode(newMode);

      if(replace) {
        const tempHistory = [...history];
        tempHistory.pop();
        setHistory([...tempHistory, newMode]);
      } else {
        setHistory([...history, newMode]);
      } 
   }

  function back(){ 

    if (history.length > 1) {
      history.pop();
      setHistory([...history]);
      setMode(history[history.length-1]);
    }
  
  }

  return { mode, transition, back };
}
 