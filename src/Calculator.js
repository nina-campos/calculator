import React, { useEffect, useState } from 'react';
import './Calculator.css';
//import NumberFormat from 'react-number-format'

export default function Calculator() {
   const [preState, setPreState] = useState("");
   const [curState, setCurState] = useState("");
   const [input, setInput] = useState(0);
   const [operator, setOperator] = useState(null);
   const [total, setTotal] = useState(false);


   const inputNum = (e) => {
      if (curState.includes(".") && e.target.innerText === ".") return;

      if (total) {
         setPreState("");
      }
      curState
         ? setCurState((pre) => pre + e.target.innerText)
         : setCurState(e.target.innerText);
      setTotal(false);
   };
   useEffect(() => {
      setInput(curState)
   }, [curState]);

   useEffect(() => {
      setInput("0")
   }, []);

   const operatorType = (e) => {
      setTotal(false)
      setOperator(e.target.innerText)
      if (curState === "") return
      if (preState !== "") {
         equals()
      }
      setPreState(curState)
      setCurState("")
   };
   const equals = (e) => {
      let cal
      switch (operator) {
         case "/":
            cal = String(parseFloat(preState) / parseFloat(curState));
            break;
         case "+":
            cal = String(parseFloat(preState) + parseFloat(curState));
            break;
         case "-":
            cal = String(parseFloat(preState) - parseFloat(curState));
            break;
         case "X":
            cal = String(parseFloat(preState) * parseFloat(curState));
            break;

         default:
            break;
      }

      if (e?.target.innerText === "=") {
         setTotal(true)
         setCurState(cal)
         setPreState(cal)
      }else{
         setInput("")
         setPreState(cal)
         setCurState("")
      }
   }

   const minusPlus = () => {
      if (curState.charAt(0) === "-") {
         setCurState(curState.substring(1));
      } else {
         setCurState("-" + curState);
      }
   };

   const percent = () => {
      preState
         ? setCurState(String((parseFloat(curState) / 100) * preState))
         : setCurState(String(parseFloat(curState) / 100));
   };

   const reset = () => {
      setPreState("");
      setCurState("");
      setInput("0");
   }
   return (

      <div className="wrapper">
         <h1 className="result">{input}
         </h1>
         <button onClick={reset}>AC</button>
         <button onClick={minusPlus}>+/-</button>
         <button onClick={percent} >%</button>
         <button className="btn" onClick={operatorType}>/</button>
         <button className="btns" onClick={inputNum} >7</button>
         <button className="btns" onClick={inputNum} >8</button>
         <button className="btns" onClick={inputNum}>9</button>
         <button className="btn" onClick={operatorType}>X</button>
         <button className="btns" onClick={inputNum} >4</button>
         <button className="btns" onClick={inputNum} >5</button>
         <button className="btns" onClick={inputNum}>6</button>
         <button className="btn" onClick={operatorType}>-</button>
         <button className="btns" onClick={inputNum} >1</button>
         <button className="btns" onClick={inputNum}>2</button>
         <button className="btns" onClick={inputNum} >3</button>
         <button className="btn" onClick={operatorType}>+</button>
         <button className="btns" onClick={inputNum} >0</button>
         <button className="btns" onClick={inputNum} >.</button>
         <button className="btns" onClick={operatorType}>-</button>
         <button className="btn" onClick={equals}>=</button>


      </div>

   )
}