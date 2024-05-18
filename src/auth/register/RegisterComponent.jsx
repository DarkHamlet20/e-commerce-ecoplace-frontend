import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showErrorAlert, showConfirmationAlert } from "../../helpers/alerts";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError('La contraseña debe tener un mínimo de 8 caracteres');
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError('La contraseña debe contener al menos una letra mayúscula');
    } else if (!/[a-z]/.test(password)) {
      setPasswordError('La contraseña debe contener al menos una letra minúscula');
    } else if (!/[0-9]/.test(password)) {
      setPasswordError('La contraseña debe contener al menos un número');
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (newConfirmPassword !== password) {
      setConfirmPasswordError('Las contraseñas no coinciden');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!passwordError && !confirmPasswordError) {
      try {
        await axios.post("http://localhost:3000/users/register", {
          email,
          password,
          name,
          lastname,
          phone,
          street,
          city,
          country,
          zip,
        });

        showConfirmationAlert(
          "Registro exitoso",
          "¡Te has registrado exitosamente!"
        ).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      } catch (error) {
        console.error("Error durante el registro:", error);
        showErrorAlert(
          "Registro fallido",
          "Por favor, revisa los detalles e intenta nuevamente."
        );
      }
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col justify-center items-center">
      <img
        className="w-screen h-screen object-cover absolute z-0"
        src="img/richard-horvath-cPccYbPrF-A-unsplash (1).jpg"
        alt=""
      />
      <div className="relative z-10 w-full max-w-md mx-auto">
        <img
          className="w-36 rounded-full mx-auto mb-1 shadow-[0px_3px_10px_4px_#e53e3e]"
          src="img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace (1).webp"
          alt=""
        />
        <div className="w-full bg-white rounded-lg shadow-[0px_0px_10px_5px_#e53e3e] dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800  hover:shadow-[0px_0px_20px_10px_#e53e3e] transition-shadow">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-black text-center">
              Crea tu cuenta
            </h1>

            <form
              className="space-y-2 md:space-y-2 text-black"
              action="#"
              onSubmit={handleRegister}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-black "
                >
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="name@company.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-black"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={password}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  onChange={handlePasswordChange}
                  required
                />
                {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-1 text-sm font-medium text-black"
                >
                  Confirmar Contraseña
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={confirmPassword}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  onChange={handleConfirmPasswordChange}
                  required
                />
                {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
              </div>

              {/* Info */}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Nombre
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Apellido
                  </label>
                  <input
                    id="lastname"
                    type="text"
                    name="lastname"
                    placeholder="Apellido"
                    value={lastname}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    type="number"
                    name="phone"
                    placeholder="Teléfono"
                    value={phone}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="street"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Calle
                  </label>
                  <input
                    id="street"
                    type="text"
                    name="street"
                    placeholder="Calle"
                    value={street}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Ciudad
                  </label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="Ciudad"
                    value={city}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    País
                  </label>
                  <input
                    id="country"
                    type="text"
                    name="country"
                    placeholder="País"
                    value={country}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="zip"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Código Postal
                  </label>
                  <input
                    id="zip"
                    type="number"
                    name="zip"
                    placeholder="Código Postal"
                    value={zip}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    onChange={(e) => setZip(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Registrarse
              </button>
              <p className="text-sm font-light text-black">
                ¿Ya tienes una cuenta?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Iniciar sesión
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
