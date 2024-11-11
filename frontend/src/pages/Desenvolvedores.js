import React, { useState, useEffect } from 'react';
import api from '../services/api';
// import DesenvolvedorForm from '../components/DesenvolvedorForm';

function Desenvolvedores() {
    const desenvolvedorPath = '/desenvolvedores';
    const [desenvolvedores, setDesenvolvedores] = useState([]);
    const [editingDesenvolvedor, setEditingDesenvolvedor] = useState(null);
    const [error, setError] = useState(null);
    
  useEffect(() => {
    fetchDesenvolvedores();
  }, []);

  const fetchDesenvolvedores = async () => {
    try {
        const response = await api.get(desenvolvedorPath);
        setDesenvolvedores(response.data.data);      
    } catch (err) {
        console.debug('Error:', err.response.data.message);
        setError(err);
    }
  };

  const handleAdd = async (desenvolvedor) => {
    await api.post(desenvolvedorPath, desenvolvedor);
    fetchDesenvolvedores();
  };

  const handleEdit = async (id, desenvolvedor) => {
    await api.put(`${desenvolvedorPath}/${id}`, desenvolvedor);
    fetchDesenvolvedores();
  };

  const handleDelete = async (id) => {
    await api.delete(`${desenvolvedorPath}/${id}`);
    fetchDesenvolvedores();
  };

  return (
    <div>
      <h1>Desenvolvedores</h1>
      {/* <DesenvolvedorForm onSubmit={editingDesenvolvedor ? handleEdit : handleAdd} desenvolvedor={editingDesenvolvedor} /> */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Sexo</th>
            <th>Data de Nascimento</th>
            <th>Hobby</th>
            <th>Nível</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {desenvolvedores.map(desenvolvedor => (
            <tr key={desenvolvedor.id}>
              <td>{desenvolvedor.id}</td>
              <td>{desenvolvedor.nome}</td>
              <td>{desenvolvedor.sexo}</td>
              <td>{desenvolvedor.data_nascimento}</td>
              <td>{desenvolvedor.hobby}</td>
              <td>{desenvolvedor.nivel_id}</td>
              <td>
                <button onClick={() => setEditingDesenvolvedor(desenvolvedor)}>Editar</button>
                <button onClick={() => handleDelete(desenvolvedor.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Desenvolvedores;