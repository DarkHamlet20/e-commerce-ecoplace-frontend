import React, { useEffect, useState } from 'react'; // Importar useHistory para manejar las redirecciones de ruta
import axios from 'axios'; // Importar Axios para hacer solicitudes HTTP

function HomePage() {
  const [userData, setUserData] = useState(null); // Estado para almacenar los datos del usuario// Obtener el objeto de historial de navegación

  useEffect(() => {
    // Obtener el token de autenticación de la cookie
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));

    if (!token) {
      // Si no hay token, redirigir al usuario a la página de inicio de sesión
      window.location.href('/login');
    } else {
      // Si hay token, enviar una solicitud al backend para obtener los datos del usuario
      axios.get('https://ecoplace.3.us-1.fl0.io/users/me', { 
        headers: {
          'Authorization': 'Bearer ' + token.split('=')[1] // Extraer el token de la cookie y establecer el encabezado de autorización
        }
      })
        .then(response => {
          // Manejar la respuesta del servidor
          const userData = response.data.userData;
          // Establecer los datos del usuario en el estado
          setUserData(userData);
        })
        .catch(error => {
          // Manejar el error
          console.error('Error al obtener los datos del usuario:', error);
          // Redirigir al usuario a la página de inicio de sesión en caso de error
          window.location.href('/login');
        });
    }
  }, []); // Este efecto se ejecuta solo una vez al montar el componente y cuando history cambia

  return (
    <div>
      {userData ? ( // Si hay datos de usuario, mostrar la información del perfil
        <div>
          <h1>Bienvenido, {userData.username}!</h1>
          <p>Email: {userData.email}</p>
          {/* Mostrar otros datos del usuario según sea necesario */}
          <button onClick={() => history.push('/perfil')}>Ver perfil</button> {/* Botón para acceder a la página de perfil */}
        </div>
      ) : (
        <p>Cargando...</p> // Mostrar un mensaje de carga mientras se obtienen los datos del usuario
      )}
    </div>
  );
}

export default HomePage;
