/* eslint-disable react/prop-types */
export default function UserComponent({ name, lastname, email, phone, city, country, street, zip, onLogoutAll }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <main className="rounded-lg shadow-lg w-[85%] mx-auto px-6 py-6 bg-white max-w-4xl">
        <div className="pb-6 border-b">
          <h1 className="pb-6 text-2xl font-semibold text-gray-700">Información Personal</h1>
          <div className="flex items-center space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <div className="ml-6">
              <h2 className="text-xl font-semibold text-gray-800">{name} {lastname}</h2>
              <p className="text-gray-600">Email: {email}</p>
              <p className="text-gray-600">Teléfono: {phone}</p>
            </div>
          </div>
        </div>
        <div className="pb-6 border-b">
          <h1 className="pb-6 text-2xl font-semibold text-gray-700">Dirección</h1>
          <div className="flex items-center space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <div className="ml-6">
              <h2 className="text-xl font-semibold text-gray-800">Ciudad: {city}, {country}</h2>
              <p className="text-gray-600">Calle: {street}</p>
              <p className="text-gray-600">Código Postal: {zip}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Configurar Cuenta</button>
          <button onClick={onLogoutAll} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">Cerrar Sesión en todos los dispositivos</button>
        </div>
      </main>
    </div>
  );
}
