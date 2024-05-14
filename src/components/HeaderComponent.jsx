// import { useNavigate } from 'react-router-dom'
// import { useEffect, useState } from 'react'
// import axios from 'axios'
// import { NavLink } from 'react-router-dom'
// import { SearchComponent } from './SearchComponent'

// const HeaderComponent = ({handleSide}) => {


//   const navigate = useNavigate()

//   // const handleUser = () => {
//   //   navigate('/user')
//   // }

//   // const handleCart = () => {
//   //   navigate('/cart')

//   const [userData, setUserData] = useState({});
//   const token = localStorage.getItem('auth_token');

//   useEffect(() => {
//     if (token) {
//       axios.get('https://ecoplace-api.zeabur.app/users/me', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       })
//       .then(response => setUserData(response.data))
//       .catch(error => {
//         console.error('There was an error with the request:', error);
//         // Optionally, you can handle errors here or show a message to the user
//       });
//     }
//   }, [token]);

//   console.log(userData);

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem('auth_token');
//       if (!token) {
//         console.error("No se encontro el token de autenticacion.");
//       }
//       await axios.post('https://ecoplace-api.zeabur.app/users/logout', {}, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       localStorage.removeItem('auth_token');
//       // Si la petición es exitosa, elimina el token de localStorage y llama a onLogout
//       navigate('/login')
//     } catch (error) {
//       console.error("Error al cerrar sesión:", error);
//       // Manejar cualquier error aquí, por ejemplo, mostrando un mensaje al usuario
//     }
//   };

//   const [show, setShow] = useState(false)
//   const [drop, setDrop] = useState(false)
  

//   return (
//       <header className='h-20 fixed top-0 w-full z-50 '>
//       <nav className="bg-white border-gray-200 dark:bg-gray-900 h-full">
//         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//           <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
//             <img src="public/img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace (1).webp" className="h-12 rounded-full" alt="EcoPlace Logo" />
//             <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">EcoPlace</span>
//           </NavLink>
//           <div className="flex text-white items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//             <button onClick={() => setShow(!show)} type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
//               <span className="sr-only">Open user menu</span>
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
//               </svg>
//             </button>
//             <div className={`"z-50 right-10  top-16 absolute my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 2xl:right-80 " id="user-dropdown" ${show ? 'block' : 'hidden'}`}>
//               <div className="px-4 py-3">
//                 <span className="block text-sm text-gray-900 dark:text-white">{userData.name} {userData.lastname}</span>
//                 <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{userData.email}</span>
//               </div>
//               <ul className="py-2" aria-labelledby="user-menu-button">
//                 <li>
//                   <a href="/user" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Acount</a>
//                 </li>
//                 <li>
//                   <NavLink to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="/user" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Orders</NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="/login" onClick={() => handleLogout()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</NavLink>
//                 </li>
//               </ul>
//             </div>
//             <button onClick={() => setDrop(!drop)} data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
//               <span className="sr-only">Open main menu</span>
//               <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
//               </svg>
//             </button>
//           </div>
//           <div className={`"items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-user" ${drop ? 'block' : 'hidden'}`}>
//             <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//               <li>
//                 <NavLink to="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</NavLink>
//               </li>
//               <li>
//                 <NavLink to="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</NavLink>
//               </li>
//               <li>
//                 <NavLink to="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</NavLink>
//               </li>
//               <li>
//                 <NavLink to="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</NavLink>
//               </li>
//               <li>
//                 <NavLink to="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</NavLink>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//       <div>
//         <h1 onClick={() => handleSide()} className='bg-gray-900 text-white py-3 select-none cursor-pointer hover:bg-gray-700 transition-all px-4 smm:hidden'>Categories</h1>
//       </div>

//     </header>
//   )
// }

// export default HeaderComponent
