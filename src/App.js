import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {

  const [repos, setRepos] = useState([]);

  async function handleAddRepository() {
    // TODO
    const resp = await api.post('repositories', {
      title: `Novo repositorio...${Date.now()}`,
      url: `http://github.com/${Date.now()}`,
      techs: ["tch-1", "tech-2"],
      likes: "0"
    });

    const newRepos = resp.data;

    setRepos([...repos, newRepos]);

  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);

    setRepos(repos.filter(rps => rps.id != id));
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepos(response.data);
    });
  }, []);

  return (
    <div>
    <ul data-testid="repository-list">
      {repos.map(rps => <li key={rps.id}>{rps.title}
        <button onClick={() => handleRemoveRepository(rps.id)}>
          Remover
    </button>
      </li>)}
    </ul>
    <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
