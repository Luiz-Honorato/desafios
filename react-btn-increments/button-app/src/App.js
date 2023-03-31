import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const [counter, setCounter] = useState(0);
  const [num, setNum] = useState(0);
  
  function setValue(newValue) {
    if (newValue >= 0) {
      setCounter(newValue);
    }
  }

  function gerarNum () {
    const nGerado = Math.floor(Math.random() * (counter + 1));
    setNum(nGerado);
  }
  
  return (
    <div className="App">
      <button  onClick={() => setValue(counter - 1)}>-1</button>
      <button  onClick={() => setValue(counter - 10)}>-10</button>
      <button  onClick={() => setValue(counter - 100)}>-100</button>
      <span>Valor: {counter}</span>
      <button  onClick={() => setValue(counter + 1)}>+1</button>
      <button  onClick={() => setValue(counter + 10)}>+10</button>
      <button  onClick={() => setValue(counter + 100)}>+100</button><br></br>
      <span><button onClick={gerarNum}>Gerar Número</button>  {num}</span>
    </div>
  );
}

export default App;
