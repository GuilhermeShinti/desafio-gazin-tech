import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import NivelForm from './NivelForm';

function Niveis() {
    const nivelsPath = '/niveis';
    const [niveis, setNiveis] = useState([]);
    const [editingNivel, setEditingNivel] = useState(null);
    const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(false);

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

  const handleEdit = async (nivel) => {
    await api.put(`${nivelsPath}/${nivel.id}`, nivel);
    fetchNiveis();
  };

  const handleDelete = async (id) => {
    try {
        await api.delete(`${nivelsPath}/${id}`);
        setNiveis(niveis.filter(nivel => nivel.id !== id));
    } catch (err) {
        const errorMessage = err.response?.data?.message || err.response?.data?.error?.message;
        console.log('Error:', errorMessage);
        showError(errorMessage);
    }
  };

    const showError = (message) => {
        setError(message);
        setTimeout(() => {
            setError(null);
        }, 3000); 
    };  

    const handleClickOpenForm = () => {
        setIsActive(!isActive);
        setEditingNivel(null);
    }

    const fillForm = (nivel) => {
        setEditingNivel(nivel);
        setIsActive(true);
    }

    const handleSubmit = (nivel) => {
        if (editingNivel) {
            handleEdit(nivel);
        } else {
            handleAdd(nivel);
        }
        setIsActive(false);
        setEditingNivel(null);
    }

  return (
    <div>
        {error && (
            <div className="alert alert-danger mt-2" role="alert">
                {error}
            </div>      
        )}         
        <div className='row'>
        
            <div className='col'>
                <h1>Níveis</h1>  
            </div>
            <div className='col text-end'>
                <button onClick={handleClickOpenForm} className="btn btn-primary my-2" type="button">
                    Form
                </button>                
            </div>
        </div>


        <div className={`collapse ${isActive ? 'show' : ''}`}>
            <NivelForm onSubmit={handleSubmit} nivel={editingNivel} />
        </div>                 
      
      <div className='table-responsive'>
        <table className='table table-striped table-bordered align-middle'>
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
                    <button type="button" className="btn btn-warning" onClick={() => fillForm(nivel)}>Editar</button>
                    <button type="button" className="btn btn-danger mx-2" onClick={() => handleDelete(nivel.id)}>Remover</button>
                    </td>
                </tr>
                ))
                )}          
            </tbody>
        </table>
      </div>
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