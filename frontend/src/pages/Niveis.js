import React, { useState, useEffect } from 'react';
import api from '../services/api';
// import NivelForm from '../components/NivelForm';

function Niveis() {
    const nivelsPath = '/niveis';
    const [niveis, setNiveis] = useState([]);
    const [editingNivel, setEditingNivel] = useState(null);
    const [error, setError] = useState(null);


  useEffect(() => {
    fetchNiveis();
  }, []);

  const fetchNiveis = async () => {
    try {
        const response = await api.get(nivelsPath);
        setNiveis(response.data.data);    
    } catch (err) {
        console.debug('Error:', error.response.data.message);
        setError(err);
    }
  };

  const handleAdd = async (nivel) => {
    await api.post(nivelsPath, nivel);
    fetchNiveis();
  };

  const handleEdit = async (id, nivel) => {
    await api.put(`${nivelsPath}/${id}`, nivel);
    fetchNiveis();
  };

  const handleDelete = async (id) => {
    await api.delete(`${nivelsPath}/${id}`);
    fetchNiveis();
  };

  return (
    <div>
      <h1>Níveis</h1>
      {/* <NivelForm onSubmit={editingNivel ? handleEdit : handleAdd} nivel={editingNivel} /> */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nível</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {niveis.map(nivel => (
            <tr key={nivel.id}>
              <td>{nivel.id}</td>
              <td>{nivel.nivel}</td>
              <td>
                <button onClick={() => setEditingNivel(nivel)}>Editar</button>
                <button onClick={() => handleDelete(nivel.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Niveis;