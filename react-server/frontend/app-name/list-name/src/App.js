import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [listNames, setListNames] = useState([]);
  const [sortName, setsortName] = useState("");
  const[firstName, setfirstName] = useState("");

  
  //GET
  const carregarNomes = () => {
    fetch('http://localhost:8686/name').then((response) => {
      
      response.json().then((data) => {
        setListNames(data);
        console.log(data);
      })
    }, (error) => {
      console.log(error)
    })
  }
  useEffect(() => {
    carregarNomes();
  }, [])

  const gerarNome = () => {
    const index = Math.floor(Math.random() * listNames.length);
    setsortName(listNames[index].firstName);
  }

  //POST
  
  const criarNome = () => {
    fetch('http://localhost:8686/name', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        firstName: firstName
      })
    })
    .then(() => {
      carregarNomes();
    })
  }
  return (
    <div className="App">
      <button onClick={carregarNomes}>Carregar nomes</button>
      <button onClick={gerarNome}>Sortear</button>
      <div>
        <ul>
          {listNames.map(nome => (
            <li key={nome.id}>{nome.firstName}</li>
          ))}
          
        </ul>
        <span><h2>Sorteado:</h2> {sortName}</span>
      </div>
      <hr/>
      <div className='form'>
        <label>
          <h5>Adcionar nome:</h5>
          <input placeholder='first name' type='text' value={firstName} onChange={(e) => setfirstName(e.target.value)}></input>
        </label>
        <button onClick={criarNome}>Adcionar</button>
      </div>
     
    </div>
  );
}

export default App;
