import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
// import NivelForm from '../components/NivelForm';

function Niveis() {
    const nivelsPath = '/niveis';
    const [niveis, setNiveis] = useState([]);
    const [editingNivel, setEditingNivel] = useState(null);
    const [error, setError] = useState(null);

    const fetchNiveis = useCallback(async () => {
        try {
            const response = await api.get(nivelsPath);
            setNiveis(response.data.data);    
        } catch (err) {
            console.log('Error:', err.response?.data?.message);
            showError(err.response?.data?.message);
        }
    }, []);

    useEffect(() => {
        fetchNiveis();
    }, [fetchNiveis]);

  const handleAdd = async (nivel) => {
    await api.post(nivelsPath, nivel);
    fetchNiveis();
  };

  const handleEdit = async (id, nivel) => {
    await api.put(`${nivelsPath}/${id}`, nivel);
    fetchNiveis();
  };

  const handleDelete = async (id) => {
    try {
        await api.delete(`${nivelsPath}/${id}`);
        setNiveis(niveis.filter(nivel => nivel.id !== id));
    } catch (err) {
        console.log('Error:', err.response?.data?.message);
        showError(err.response?.data?.message);
    }
  };

    const showError = (message) => {
        setError(message);
        setTimeout(() => {
            setError(null);
        }, 3000); 
    };  

  return (
    <div className='table-responsive'>
      <h1>Níveis</h1>
      {error && (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>      
        )}          
      {/* <NivelForm onSubmit={editingNivel ? handleEdit : handleAdd} nivel={editingNivel} /> */}
      <table className='table table-striped  table-bordered align-middle'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nível</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
            {niveis.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">Nenhum nível encontrado.</td>
              </tr>
            ) : (
                niveis.map(nivel => (
                <tr key={nivel.id}>
                <td className='col-1'>{nivel.id}</td>
                <td className='col-8'>{nivel.nivel}</td>
                <td className='col-3'>
                  <button type="button" className="btn btn-warning" onClick={() => setEditingNivel(nivel)}>Editar</button>
                  <button type="button" className="btn btn-danger" onClick={() => handleDelete(nivel.id)}>Remover</button>
                </td>
              </tr>
              ))
            )}          
        </tbody>
      </table>
        <nav aria-label="...">
            <ul className="pagination justify-content-end">
                <li className="page-item disabled">
                    <button className="page-link" aria-disabled="true">Previous</button>
                </li>
                <li className="page-item disabled">
                    <button className="page-link">1</button>
                </li>
                <li className="page-item disabled">
                    <button className="page-link">Next</button>
                </li>
            </ul>
        </nav>
    </div>
  );
}

export default Niveis;