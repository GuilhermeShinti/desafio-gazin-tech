import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import Nivels from './pages/Niveis';
import Desenvolvedores from './pages/Desenvolvedores';

function App() {
  return (
    <div className="container">
        <div className='row'>
            <div className='col'>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <ul className='navbar-nav'>
                    <li className='nav-item'><NavLink to="/niveis" className={({ isActive }) => (isActive ? 'btn btn-primary' : 'btn')}>Níveis</NavLink></li>
                    <li className='nav-item'><NavLink to="/desenvolvedores" className={({ isActive }) => (isActive ? 'btn btn-primary' : 'btn')}>Desenvolvedores</NavLink></li>
                    </ul>
                </nav>   
            </div>         
        </div>
      <Routes className="row">
        <Route path="/niveis" element={<Nivels/>} />
        <Route path="/desenvolvedores" element={<Desenvolvedores/>} />
      </Routes>
    </div>
  );
}

export default App;