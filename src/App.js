import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    
    const response = await api.post('repositories', {
      "title": `Bootcamp Rocketseat GoStack ${Date.now()}`,
      "url": "https://github.com/vinicius91carvalho/gostack-desafio-conceitos-reactjs",
      "techs": [
        "NodeJS",
        "JavaScript"
      ]
    })

    setRepositories([...repositories, response.data])

  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    if (response.status === 204)
      setRepositories(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(respository => {
            return (
              <li key={respository.id}>
                { respository.title }

                <button onClick={() => handleRemoveRepository(respository.id)}>
                  Remover
                </button>
              </li> 
            )
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
