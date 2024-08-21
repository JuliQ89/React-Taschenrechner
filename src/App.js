import { useState, useEffect} from "react";
import Display from "./components/Display";
import Button from "./components/Button";
import ErrorMsg from "./components/ErrorMsg";
import History from "./components/History";
import ApiRequest from "./components/ApiRequest";

function App() {
  // "http://localhost:3500/histories";
  // "npx json-server -p 3500 -w data/history.json";
  const API_URL = "http://localhost:3500";
  const [inputValue, setInputValue] = useState("");
  const [resultValue, setResultValue] = useState("");
  const [lastResult, setLastResult] = useState(0);
  const [histories, setHistory] = useState([]);
  const [errors, setErrors] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_URL}/histories`);
      if (!response.ok) throw new Error("Fehler bei Api Anfrage!");
      let json = await response.json();
      setHistory(json);
    } catch(err) {
      setErrors([...errors, err.message]);
    };
  };

  const handleNotOperatorBtnClick = (buttonText) => {
    setInputValue(inputValue + buttonText);
  };
  
  // Operation Funktions
  const handleFakulty = (value) => {
    if (value !== "") {
      let number = Number(value);
      console.log(Number(value));
      let fakultaet = number;
      while (true) {
        if (!(number <= 1)) {
          number -= 1;
          fakultaet *= number;
        } else {
          setInputValue(value);
          appendCalculation(value, fakultaet);
          break;
        };
      };
    };
  };
  
  const handleMathOp = (typ, value) => {
    if (value !== "") {
      let number = Number(value);
      let changedNumber = Math[typ](number);
      setInputValue(value);
      appendCalculation(String(value), changedNumber);
    };
  };

  // === API ===
  const appendCalculation = (calculation, result) => {
    let historyObj = {
      calculation,
      result,
      id: crypto.randomUUID()
    };
    setHistory([...histories, historyObj]);
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(historyObj)
    }
    const apiResult = ApiRequest(`${API_URL}/histories`, postOptions);
    console.log(apiResult);
    setLastResult(result);
    setResultValue(result);
  };
  // === API ===

  const clearAll = () => {
    setInputValue("");
    setResultValue("");
    setErrors([]);
  };

  const takeLastResult = () => {
    setInputValue(lastResult);
  };

  const calculateResult = () => {
    let result;
    if (inputValue !== "") {
      try {
        // eslint-disable-next-line
        result = eval(inputValue);
        appendCalculation(inputValue, result);
        setErrors([]);
      } catch(err) {
          setErrors([...errors, String(err)]);
      };
    };
  };

  const deleteLast = () => {
    if (inputValue !== "") {
      let changedValue = inputValue;
      changedValue = changedValue.slice(0, -1)
      setInputValue(changedValue);
    };
  };

  return (
    <div className="wrapper">

      <div className="taschenrechnerContainer">
        <ErrorMsg 
          errors={errors}
        />
        <Display 
          inputValue={inputValue}
          setInputValue={setInputValue}
          resultValue={resultValue}
          setResultValue={setResultValue}
        />

        <div className="taschenrechnerTasten">
          <Button buttonText="&pi;" classes={"operator"} handleonClick={() => {handleNotOperatorBtnClick("3.14159265359")}} />
          <Button buttonText="ANS" classes={"operator"} handleonClick={() => {takeLastResult()}} />
          <Button buttonText="DEL" classes={"operator"} handleonClick={() => {deleteLast()}} />
          <Button buttonText="%" classes={"operator"} handleonClick={() => {handleNotOperatorBtnClick("%")}} />
          <Button buttonText="AC" classes={"operator"} handleonClick={() => {clearAll()}} />

          <Button buttonText="x!" classes={"operator"} handleonClick={() => {handleFakulty(inputValue)}} />
          <Button buttonText="7" classes={""} handleonClick={() => {handleNotOperatorBtnClick("7")}} />
          <Button buttonText="8" classes={""} handleonClick={() => {handleNotOperatorBtnClick("8")}} />
          <Button buttonText="9" classes={""} handleonClick={() => {handleNotOperatorBtnClick("9")}} />
          <Button buttonText="/" classes={"operator"} handleonClick={() => {handleNotOperatorBtnClick("/")}} />

          <Button buttonText="sin" classes={"operator"} handleonClick={() => {handleMathOp("sin", inputValue)}} />
          <Button buttonText="4" classes={""} handleonClick={() => {handleNotOperatorBtnClick("4")}} />
          <Button buttonText="5" classes={""} handleonClick={() => {handleNotOperatorBtnClick("5")}} />
          <Button buttonText="6" classes={""} handleonClick={() => {handleNotOperatorBtnClick("6")}} />
          <Button buttonText="*" classes={"operator"} handleonClick={() => {handleNotOperatorBtnClick("*")}} />
          
          <Button buttonText="cos" classes={"operator"} handleonClick={() => {handleMathOp("cos", inputValue)}} />
          <Button buttonText="1" classes={""} handleonClick={() => {handleNotOperatorBtnClick("1")}} />
          <Button buttonText="2" classes={""} handleonClick={() => {handleNotOperatorBtnClick("2")}} />
          <Button buttonText="3" classes={""} handleonClick={() => {handleNotOperatorBtnClick("3")}} />
          <Button buttonText="-" classes={"operator"} handleonClick={() => {handleNotOperatorBtnClick("-")}} />

          <Button buttonText="tan" classes={"operator"} handleonClick={() => {handleMathOp("tan", inputValue)}} />
          <Button buttonText="0" classes={""} handleonClick={() => {handleNotOperatorBtnClick("0")}} />
          <Button buttonText="." classes={""} handleonClick={() => {handleNotOperatorBtnClick(".")}} />
          <Button buttonText="=" classes={"result"} handleonClick={() => {calculateResult()}} />
          <Button buttonText="+" classes={"operator"} handleonClick={() => {handleNotOperatorBtnClick("+")}} />
        </div>
      </div>

      <History 
        histories={histories}
        setHistory={setHistory}
        setInputValue={setInputValue}
        setResultValue={setResultValue}
        API_URL = {API_URL}
        fetchHistory={fetchHistory}
      />
    </div>
  );
}

export default App;

