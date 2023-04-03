import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [listNames, setListNames] = useState([]);
  const [sortName, setsortName] = useState("");
  const[First_name, setFirst_name] = useState("");
  const[Last_name, setLast_name] = useState("")
  
  //GET
  const carregarNomes = () => {
    fetch('http://localhost:8686/name').then((response) => {
      console.log("Deu bom")
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
    console.log('Deu bom')
    const index = Math.floor(Math.random() * listNames.length);
    setsortName(listNames[index].First_name);
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
        First_name: 'Novo haha',
        Last_name: 'GGFGFG'
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
            <li key={nome.id}>{nome.First_name}</li>
          ))}
          
        </ul>
        <span><h2>Sorteado:</h2> {sortName}</span>
      </div>
      <div className='form'>
        <label>
          <input placeholder='first name' type='text' value={First_name} onChange={(e) => setFirst_name(e.target.value)}></input>
        </label>
        
        <label>
          <input placeholder='last name' type='text' value={Last_name} onChange={(e) => setLast_name(e.target.value)}></input>
        </label>
        <button onClick={criarNome}>Adcionar</button>
      </div>
     
    </div>
  );
}

export default App;
