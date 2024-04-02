import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Agregando estado para manejar errores

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores anteriores antes de una nueva solicitud
    try {
      const response = await axios.post('https://ecoplace.3.us-1.fl0.io/users/login', { email, password }, { withCredentials: true });
      console.log(response); // Es buena idea verificar la respuesta del servidor
      window.location.href = '/home'; // Corregido
    } catch (error) {
      console.error("Error de autenticación", error);
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.'); // Actualizar el estado de error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{color: 'red'}}>{error}</div>} {/* Mostrar mensaje de error si existe */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default LoginForm;