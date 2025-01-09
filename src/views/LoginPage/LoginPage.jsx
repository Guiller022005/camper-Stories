import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from 'lucide-react';
import campushm from '/src/assets/Campushm.png';
import './LoginPage.css';
import { endpoints } from '../../services/apiConfig';

const LoginPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Verificar si ya hay un token para redirigir al usuario
  useEffect(() => {
    if (token) {
      console.log("Usuario ya autenticado. Redirigiendo a /");
      navigate('/');
    }
  }, [token]);

  // Función para manejar el inicio de sesión
  const handleLogin = async (email, password) => {
    try {
      console.log("Iniciando sesión con:", email);
      const response = await fetch(endpoints.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        console.log("Inicio de sesión exitoso. Token recibido:", data.token);
        navigate('/');
      } else {
        console.error("Error de autenticación. Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
    }
  };

  return (
    <div className="login-container">
      {/* Main Container */}
      <div className="main-container">
        {/* Form Panel */}
        <div className="form-panel">
          <div className='form-logo'>
            <img src={campushm} alt="Campus" />
            <h1>Camper Stories</h1>
          </div>

          <h2>¡Bienvenido de nuevo, Camper!</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.email.value;
              const password = e.target.password.value;
              handleLogin(email, password);
            }}
          >
            <div className="form-group">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Correo electrónico"
                required
              />
            </div>

            <div className="form-group">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Contraseña"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Iniciar Sesión
            </button>
            <button type="button" className="btn btn-google">
              Continuar con Google
            </button>
          </form>

          <div className="toggle-form">
            <button
              className="toggle-btn"
              onClick={() => navigate('/campers/register')}
            >
              ¿No tienes cuenta aún? Regístrate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
