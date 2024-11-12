import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
// import DesenvolvedorForm from '../components/DesenvolvedorForm';

function Desenvolvedores() {
    const desenvolvedorPath = '/desenvolvedores';
    const [desenvolvedores, setDesenvolvedores] = useState([]);
    const [editingDesenvolvedor, setEditingDesenvolvedor] = useState(null);
    const [error, setError] = useState(null);
    

    const fetchDesenvolvedores = useCallback(async () => {
        try {
            const response = await api.get(desenvolvedorPath);
            setDesenvolvedores(response.data.data);
        } catch (err) {
            console.log('Error:', err.response?.data?.message);
            showError(err.response?.data?.message);
        }
    }, []);

    useEffect(() => {
        fetchDesenvolvedores();
    }, [fetchDesenvolvedores]);

  const handleAdd = async (desenvolvedor) => {
    await api.post(desenvolvedorPath, desenvolvedor);
    fetchDesenvolvedores();
  };

  const handleEdit = async (id, desenvolvedor) => {
    await api.put(`${desenvolvedorPath}/${id}`, desenvolvedor);
    fetchDesenvolvedores();
  };

  const handleDelete = async (id) => {
    try {
        await api.delete(`${desenvolvedorPath}/${id}`);
        setDesenvolvedores(desenvolvedores.filter(desenvolvedor => desenvolvedor.id !== id));
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

      <h1>Desenvolvedores</h1>  
        {error && (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>      
        )}       
      {/* <DesenvolvedorForm onSubmit={editingDesenvolvedor ? handleEdit : handleAdd} desenvolvedor={editingDesenvolvedor} /> */}
      <table className='table table-striped  table-bordered align-middle'>
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
            {desenvolvedores.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">Nenhum desenvolvedor encontrado.</td>
              </tr>
            ) : (
              desenvolvedores.map(desenvolvedor => (
                <tr key={desenvolvedor.id}>
                  <td className="col-1">{desenvolvedor.id}</td>
                  <td className="col-2">{desenvolvedor.nome}</td>
                  <td className="col-1">{desenvolvedor.sexo}</td>
                  <td className="col-1">{desenvolvedor.data_nascimento}</td>
                  <td className="col-2">{desenvolvedor.hobby}</td>
                  <td className="col-2">{desenvolvedor.nivel_id}</td>
                  <td className="col-3">
                    <button className="btn btn-warning mx-1" onClick={() => setEditingDesenvolvedor(desenvolvedor)}>Editar</button>
                    <button className="btn btn-danger mx-1" onClick={() => handleDelete(desenvolvedor.id)}>Remover</button>
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

export default Desenvolvedores;