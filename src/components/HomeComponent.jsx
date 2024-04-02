import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/me', {withCredentials: true});
        setUserData(response.data);
      } catch (error) {        
        // Redirigir al usuario a la página de inicio de sesión en caso de error
        console.error('Error al obtener los datos del usuario:', error);
        window.location.href = '/login';
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h1>Bienvenido, {userData.name}!</h1>
          <p>Email: {userData.email}</p>
          {/* Mostrar otros datos del usuario según sea necesario */}
          <button onClick={() => history.push('/perfil')}>Ver perfil</button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default HomePage;



// import React, { useEffect, useState } from 'react'; // Importar useHistory para manejar las redirecciones de ruta
// import axios from 'axios'; // Importar Axios para hacer solicitudes HTTP

// function HomePage() {
//   const [userData, setUserData] = useState(null); // Estado para almacenar los datos del usuario// Obtener el objeto de historial de navegación

//   const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
//   const cookies = document.cookie;

//   useEffect(() => {
//     // Obtener el token de autenticación de la cookie
//     console.log(cookies);

//     axios.get('http://localhost:3000/users/me', {
//       headers: {
//         'Authorization': 'Bearer ' + token.split('=')[1] // Extraer el token de la cookie y establecer el encabezado de autorización
//       }
//     })
//       .then(response => {
//         // Manejar la respuesta del servidor
//         const userData = response.data.userData;
//         // Establecer los datos del usuario en el estado
//         setUserData(userData);
//       })
//       .catch(error => {
//         // Manejar el error
//         console.error('Error al obtener los datos del usuario:', error);
//         // Redirigir al usuario a la página de inicio de sesión en caso de error
//         window.location.href = '/src/pages/login.astro';
//       });
//   }, [token]); // Este efecto se ejecuta solo una vez al montar el componente y cuando history cambia

//   return (
//     <div>
//       {userData ? ( // Si hay datos de usuario, mostrar la información del perfil
//         <div>
//           <h1>Bienvenido, {userData.username}!</h1>
//           <p>Email: {userData.email}</p>
//           {/* Mostrar otros datos del usuario según sea necesario */}
//           <button onClick={() => history.push('/perfil')}>Ver perfil</button> {/* Botón para acceder a la página de perfil */}
//         </div>
//       ) : (
//         <p>Cargando...</p> // Mostrar un mensaje de carga mientras se obtienen los datos del usuario
//       )}
//     </div>
//   );
// }

// export default HomePage;