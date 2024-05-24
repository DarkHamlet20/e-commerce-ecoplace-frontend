import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../AuthSlice';
import { showErrorAlert, showConfirmationAlert } from '../../helpers/alerts';

export default function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Agregando estado para manejar errores
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores anteriores antes de una nueva solicitud
    try {
      const response = await axios.post('http://34.201.92.59:3000/users/login', { email, password });
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('userRole', response.data.role);
      dispatch(setCredentials({
        token: response.data.token,
        role: response.data.role,
      }));
      
      // Redirección basada en el rol después del inicio de sesión exitoso
      showConfirmationAlert("Inicio de Sesión", "¡Has iniciado sesión exitosamente!").then(result => {
        if (result.isConfirmed) {
          switch (response.data.role) {
            case 'Admin':
              navigate('/admin');
              break;
            case 'Seller':
              navigate('/seller');
              break;
            case 'Customer':
              navigate('/user');
              break;
            default:
              navigate('/');
          }
        }
      });

    } catch (error) {
      console.error('Login Error:', error);
      // Mostrar alerta de error usando la función personalizada
      showErrorAlert("Error de autenticación", "Por favor verifique sus credenciales e inténtelo nuevamente.");
    }
  };

  const [Show, setShow] = useState(true);

  return (
    <section className="bg-gray-50 ">
      <img
        className="w-screen h-screen object-cover absolute z-0"
        src="img/richard-horvath-cPccYbPrF-A-unsplash (1).jpg"
        alt=""
      />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 relative">
        <img
          className=" w-36 rounded-full relative top-4 shadow-[0px_3px_10px_4px_#e53e3e] cursor-pointer"
          src="img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace (1).webp"
          alt=""
          onClick={() => navigate('/')}
        />
        <div className="w-full bg-white rounded-lg shadow-[0px_0px_10px_5px_#e53e3e] dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800  hover:shadow-[0px_0px_20px_10px_#e53e3e] transition-shadow">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8  hover:shadow-[0px_0px_20px_10px_#e53e3e] transition-shadow">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-black">
              Inicia Sesion en tu Cuenta
            </h1>
            <form
              className="space-y-4 md:space-y-6 text-black"
              action="#"
              onSubmit={handleSubmit}
            >
              {error && <div style={{ color: "red" }}>{error}</div>}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black "
                >
                  Tu Correo
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  className="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Contraseña
                </label>

                <div className="flex">
                  <input
                    id="password"
                    type={Show ? "password" : "text"}
                    name="password"
                    placeholder="••••••••"
                    value={password}
                    className="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    onClick={() => setShow((prev) => !prev)}
                    className="my-auto rounded-r-lg p-[10px] bg-gray-700 text-white hover:bg-slate-500 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <a
                  href="/forgot-password"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Olvidaste contraseña?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:scale-y-110 transition-all"
              >
                Iniciar Sesion
              </button>

              <p className="text-sm font-light text-black">
                No tienes cuenta todavia?{" "}
                <a
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Registrarse
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
