import React, { useState, useEffect } from 'react';

import './App.css';

import api from './services/api';

import Header from './components/Header';

/**
 * Principais conceitos do React:
 *  Componentes
 *  Propriedades
 *  Estado
 */

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, [])

  async function handleAddProject() {
    // setProjects([...projects, `Novo projeto ${Date.now()}`]);

    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Rodolfo Oliveira'
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Projects" />

      <ul>
        {projects.map(project => <li key={project.id}>
          {project.title}
          <small>{project.owner}</small>
        </li>)}
      </ul>

      <button type="button" onClick={handleAddProject} >Adicionar projeto</button>
    </>
  );
};

export default App;