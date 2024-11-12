import React, { useState, useEffect } from 'react';

const DesenvolvedorForm = ({ desenvolvedor, onSubmit }) => {
    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [hobby, setHobby] = useState('');
    const [nivel, setNivel] = useState('');

    useEffect(() => {
        if (desenvolvedor) {
            setNome(desenvolvedor.nome);
            setSexo(desenvolvedor.sexo);
            setDataNascimento(desenvolvedor.data_nascimento);
            setHobby(desenvolvedor.hobby);
            setNivel(desenvolvedor.nivel_id);
        } else {
            cleanForm();
        }
    }, [desenvolvedor]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ nome, sexo, dataNascimento, hobby, nivel });
        cleanForm();
    };

    const cleanForm = () => {
        setNome('');
        setSexo('');
        setDataNascimento('');
        setHobby('');
        setNivel('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='row'>
                <div>
                    <label className="form-label">Nome:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />                    
                    </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <label className="form-label">Sexo:</label>
                    <select
                        value={sexo}
                        className="form-select" 
                        onChange={(e) => setSexo(e.target.value)}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </select>
                </div>
                <div className='col'>
                    <label className="form-label">Data de Nascimento:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                        required
                    />
                </div>                
            </div>
            <div className='row'>
                <div className='col'>
                    <label className="form-label">Hobby:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={hobby}
                        onChange={(e) => setHobby(e.target.value)}
                        required
                    />
                </div>
                <div className='col'>
                    <label className="form-label">Nível:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nivel}
                        onChange={(e) => setNivel(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="row ">
                <div className="col-12 text-end">
                    <button type="submit" className='btn btn-primary my-2'>
                        {desenvolvedor ? 'Editar Desenvolvedor' : 'Adicionar Desenvolvedor'}
                    </button>
                </div>
            </div>      
        </form>
    );
};

export default DesenvolvedorForm;