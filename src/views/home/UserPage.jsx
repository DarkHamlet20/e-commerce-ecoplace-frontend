import { useEffect, useState } from 'react';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';

const UserPage = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    // Obtener el valor de la cookie de autenticación desde el localStorage

    // Verificar si la cookie de autenticación está presente y es válida
    if (!token) {
      // Puedes hacer cualquier verificación adicional aquí, como validar el token con el servidor
      setAuthenticated(false);
    }

    setAuthenticated(true);

    axios.get('https://api.example.com/data', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
        // Otros encabezados opcionales según sea necesario
      }
    }).then(
      response => setUserData(response.data)
    )
      .catch(error => {
        // Manejar errores de la solicitud
        console.error('There was an error with the request:', error);
      });
  }, [token]);

  // Redirigir al usuario a la página de inicio de sesión si no está autenticado
  // if (!authenticated) {
  //   return <Redirect to="/login" />;
  // }

  // Si el usuario está autenticado, renderizar el componente privado
  return (
    <>
      <div>
        <p>Nombre: <span>{userData?.name}</span></p>
        <p>Apellido: <span>{userData?.lastname}</span></p>
      </div>
    </>
  )
}

export default UserPage