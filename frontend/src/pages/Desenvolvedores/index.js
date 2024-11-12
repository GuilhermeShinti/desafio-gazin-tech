import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import DesenvolvedorForm from './DesenvolvedorForm';

function Desenvolvedores() {
    const desenvolvedorPath = '/desenvolvedores';
    const [desenvolvedores, setDesenvolvedores] = useState([]);
    const [editingDesenvolvedor, setEditingDesenvolvedor] = useState(null);
    const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(false);
    

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

  const handleEdit = async (desenvolvedor) => {
    await api.put(`${desenvolvedorPath}/${desenvolvedor.id}`, desenvolvedor);
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

    const handleClickOpenForm = () => {
        setEditingDesenvolvedor(null);
        setIsActive(!isActive);
    }

    const fillForm = (desenvolvedor) => {
        setEditingDesenvolvedor(desenvolvedor);
        setIsActive(true);
    }

    const handleSubmit = (desenvolvedor) => {
        if (editingDesenvolvedor) {
            handleEdit(desenvolvedor);
        } else {
            handleAdd(desenvolvedor);
        }
        setIsActive(false);
        setEditingDesenvolvedor(null);
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
                <h1>Desenvolvedores</h1>  
            </div>
            <div className='col text-end'>                   
                <button onClick={handleClickOpenForm} className="btn btn-primary my-2" type="button">
                    Form
                </button>                
            </div>
        </div>

        <div className={`collapse ${isActive ? 'show' : ''}`}>
            <DesenvolvedorForm onSubmit={handleSubmit} desenvolvedor={editingDesenvolvedor} />
        </div>        

        <div className='table-responsive'>
            <table className='table table-striped table-bordered align-middle'>
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
                            <button className="btn btn-warning mx-1" onClick={() => fillForm(desenvolvedor)}>Editar</button>
                            <button className="btn btn-danger mx-1" onClick={() => handleDelete(desenvolvedor.id)}>Remover</button>
                        </td>
                        </tr>
                    ))
                    )}
                </tbody>
            </table>
        </div>
        <nav aria-label="">
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