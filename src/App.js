import "./App.css";
import { useState, useEffect } from "react";
import { NumberFormatBase } from "react-number-format";
import { NumericFormat } from "react-number-format";
function App() {
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
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
    setInput(curState);
  }, [curState]);

  useEffect(() => {
    setInput("0");
  }, []);
  const operatorType = (e) => {
    if(e.target.innerText==="Mod"){
    setTotal(false);
    setOperator("%");
    setPreState(curState);
    setCurState("");
    return;
    }
    setTotal(false);
    setOperator(e.target.innerText);
    if (curState === "") return;
    if (preState !== "") {
      equals();
    } else {
      setPreState(curState);
      setCurState("");
    }
  };

  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }
    let cal;
    switch (operator) {
      case "/":
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;

      case "%":
          cal = String(parseFloat(preState) % parseFloat(curState));
          break;

      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "X":
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState));
        break;
      default:
        return;
    }
    setInput("");
    setPreState(cal);
    setCurState("");
  };

  const minusPlus = () => {
    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1));
    } else {
      setCurState("-" + curState);
    }
  };



  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("0");
  };
  const backspace = () => {
    setCurState(curState.slice(0,curState.length - 1));
  }
  return (
    <>
    <div className='box1'>
      <div className='box2'>
        <div className='screen'>
          {input !== "" || input === "0" ? (
            <NumberFormatBase
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumberFormatBase
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
        </div>
        <div className='btn clear' onClick={reset}>
          AC
        </div>
        <div className='btn light-gray' onClick={operatorType}>
          Mod
        </div>
        <div className='btn light-gray' onClick={minusPlus}>
          +/-
        </div>
        <div className='btn orange' onClick={operatorType}>
          /
        </div>
        <div className='btn' onClick={inputNum}>
          7
        </div>
        <div className='btn' onClick={inputNum}>
          8
        </div>
        <div className='btn' onClick={inputNum}>
          9
        </div>
        <div className='btn orange' onClick={operatorType}>
          X
        </div>
        <div className='btn' onClick={inputNum}>
          4
        </div>
        <div className='btn' onClick={inputNum}>
          5
        </div>
        <div className='btn' onClick={inputNum}>
          6
        </div>
        <div className='btn orange' onClick={operatorType}>
          +
        </div>
        <div className='btn' onClick={inputNum}>
          1
        </div>
        <div className='btn' onClick={inputNum}>
          2
        </div>
        <div className='btn' onClick={inputNum}>
          3
        </div>
        <div className='btn orange' onClick={operatorType}>
          -
        </div>
        <div className='btn zero' onClick={inputNum}>
          0
        </div>
        <div className='btn' onClick={inputNum}>
          .
        </div>
        <div className='btn plus' onClick={equals}>
          =
        </div>
        <div className='btn red' onClick={backspace}>
          BS
        </div>
      </div>
    </div>
    <a href="https://github.com/rahuldubey123"><footer id="footer" >©Developed by rahul dubey</footer></a>
    </>
  );
}

export default App;
