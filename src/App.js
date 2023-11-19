import { useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import './styles.css';
import api from "./services/api";

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState('');

  async function handleSearch(){
    if(input === ''){
      alert("Informe um CEP!")
      return;
    }
    try{
      const response = await api.get(`${input}/json`)
      console.log(response.data)
      setCep(response.data)
      setInput('')

    }catch{
      alert("Ops! Parece que algo deu errado na busca.")
      setInput("")

    }
  }

  return (
    <div className="container">

      <h1 className="title"
      style={{ whiteSpace: 'nowrap' }}>Buscador de CEP</h1>
      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite um CEP..."
        value={input}
        onChange={(e) => setInput(e.target.value) }
        />
        <button 
        className="buttonSearch"
        onClick={handleSearch}
        >
        <FaSearchLocation size={25} color="#fff"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
       <main className="main">
        <h2>CEP: {cep.cep}</h2>
        <span>Rua: {cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>Cidade: {cep.localidade + ' - ' + cep.uf}</span>
      </main> 
      )};
      

    </div>
  );
}

export default App;
