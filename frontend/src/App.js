import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Nivels from './pages/Niveis';
import Desenvolvedores from './pages/Desenvolvedores';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/niveis">Níveis</Link></li>
          <li><Link to="/desenvolvedores">Desenvolvedores</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/niveis" element={<Nivels/>} />
        <Route path="/desenvolvedores" element={<Desenvolvedores/>} />
      </Routes>
    </div>
  );
}

export default App;