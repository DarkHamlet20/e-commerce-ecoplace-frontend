import { useState } from 'react';
import axios from 'axios';

export default function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Agregando estado para manejar errores

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores anteriores antes de una nueva solicitud
    try {
      await axios.post('http://localhost:3000/users/login', { email, password }, { withCredentials: true });
      window.location.href = '/home'; // Corregido
    } catch (error) {
      console.error("Error de autenticación", error);
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales:', error); // Actualizar el estado de error
    }
  };

  return (
    <section className="bg-gray-50 ">
      <img className='w-screen h-screen object-cover absolute z-0' src="img/richard-horvath-cPccYbPrF-A-unsplash.jpg" alt="" />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 relative">
        <img className=' w-36 rounded-full relative top-4 shadow-[0px_3px_10px_4px_#e53e3e]' src="img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace.webp" alt="" />
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-white-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-black">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6 text-black" action="#"
              onSubmit={handleSubmit}>
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-black ">Your email</label>
                <input
                  id='email'
                  type="email"
                  name="email"
                  value={email}
                  className=" border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Password</label>
                <input
                  id='password'
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={password}
                  className=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => setPassword(e.target.value)}
                  required />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border rounded  focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-black">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline text-primary-500">Forgot password?</a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Sign in</button>
              <p className="text-sm font-light text-black">
                Do not have an account yet?
                <a href="#" className="font-medium text-primary-600 hover:underline text-primary-500">Sign up</a>
              </p>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}