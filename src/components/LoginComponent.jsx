import { useState } from 'react';
import axios from 'axios';

export default function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Agregando estado para manejar errores
  const [count, setCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores anteriores antes de una nueva solicitud
    try {
      await axios.post('http://localhost:3000/users/login', { email, password }, { withCredentials: true });
      window.location.href = '/home'; // Corregido
    } catch (error) {
      console.error("Error de autenticación", error);
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.'); // Actualizar el estado de error
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setCount(count + 1);
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label htmlFor="email">Correo Electrónico</label>
        <input
          name='email'
          id='email'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input
          name='password'
          id='password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
      </div>
      <button className='border-2 border-black p-1 font-bold' type="submit">Iniciar sesión</button>

      <div>
        <p>Cuentas: {count}</p>
        <button onClick={handleClick}>Click!</button>
      </div>
    </form>
  );
}