import React from 'react';
import { Link } from 'react-router-dom';
import './Unauthorized.css';

const Unauthorized = () => {
  return (
    <div className='unauth-main' style={{ textAlign: 'center', padding: '30vh', fontSize: '20px'}} >
      <h1>Pagina no encontrada.</h1>
      <p>Esta pagina no existe o no tienes permiso para verla.</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Unauthorized;
