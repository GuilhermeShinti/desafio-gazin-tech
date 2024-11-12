import React, { useState, useEffect } from 'react';

const NivelForm = ({ nivel, onSubmit }) => {
    const [nivelName, setNivelName] = useState('');

    useEffect(() => {
        if (nivel) {
            setNivelName(`teste`);
        } else {
            setNivelName('');
        }
    }, [nivel]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ id: nivel?.id, nivel: nivelName });
        setNivelName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-12'>
                    <label  className="form-label">Nível:</label>
                    <input
                        type="text"
                        className="form-control" 
                        value={nivelName}
                        onChange={(e) => setNivelName(e.target.value)}
                        required
                    />                    
                </div>
                <div className='col-12 text-end'>                  
                    <button type="submit" className='btn btn-primary my-2'>
                        {nivel ? 'Editar Nível' : 'Adicionar Nível'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default NivelForm;