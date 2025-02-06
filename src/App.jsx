import React from 'react';
import AppRouter from './router/AppRouter';
import { ToastContainer, Bounce } from 'react-toastify';
import './styles/variables.css';
import './styles/base.css';

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <AppRouter />
    </div>
  );
}

export default App;
