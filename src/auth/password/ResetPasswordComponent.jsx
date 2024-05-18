import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorAlert, showConfirmationAlert } from "../../helpers/alerts";
import background from '../../../public/img/richard-horvath-cPccYbPrF-A-unsplash (1).jpg';
import logo from '../../../public/img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace (1).webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ResetPasswordComponent = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const { token } = useParams();
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

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!passwordError && !confirmPasswordError) {
      try {
        await axios.post(`http://localhost:3000/users/reset-password/${token}`, { password });
        showConfirmationAlert(
          "Restablecimiento de contraseña exitoso",
          "Tu contraseña ha sido restablecida exitosamente."
        ).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      } catch (error) {
        console.error("Error restableciendo contraseña:", error);
        showErrorAlert(
          "Error",
          "Hubo un problema restableciendo tu contraseña. Por favor, intenta nuevamente."
        );
      }
    }
  };

  return (
    <section className="bg-gray-50 ">
      <img
        className="w-screen h-screen object-cover absolute z-0"
        src={background}
        alt=""
      />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 relative">
        <img
          className=" w-36 rounded-full relative top-4 shadow-[0px_3px_10px_4px_#e53e3e]"
          src={logo}
          alt=""
        />
        <div className="w-full bg-white rounded-lg shadow-[0px_0px_10px_5px_#e53e3e] dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800  hover:shadow-[0px_0px_20px_10px_#e53e3e] transition-shadow">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl text-center">
              Restablecer Contraseña
            </h1>
            <form className="space-y-4 md:space-y-4 text-black" onSubmit={handleResetPassword}>
              <div className="relative">
                <label htmlFor="password" className="block mb-1 text-sm font-medium text-black">
                  Nueva Contraseña
                </label>
                <div className="flex">
                  <input
                    id="password"
                    type={showPassword ? "password" : "text"}
                    name="password"
                    placeholder="••••••••"
                    value={password}
                    className="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    onChange={handlePasswordChange}
                    required
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="my-auto rounded-r-lg p-[10px] bg-gray-700 text-white hover:bg-slate-500 transition-all cursor-pointer"
                  >
                    {showPassword ? (
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
                    ) : (
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
                          d="M3.98 8.223A10.477 10.477 0 0 1 12 6c4.638 0 8.573 3.007 9.963 7.178a1.012 1.012 0 0 1 0 .639c-.373 1.097-.975 2.12-1.783 3.003M9.872 14.063A3 3 0 0 0 15 12m-3-3a3 3 0 0 0-2.128 5.063M6.238 17.761A10.478 10.478 0 0 1 2.036 12a1.012 1.012 0 0 1 0-.639c.354-1.042.871-2.025 1.518-2.915M15 19.5l-9-9"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
              </div>
              <div className="relative">
                <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-black">
                  Confirmar Nueva Contraseña
                </label>
                <div className="flex">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "password" : "text"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={confirmPassword}
                    className="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="my-auto rounded-r-lg p-[10px] bg-gray-700 text-white hover:bg-slate-500 transition-all cursor-pointer"
                  >
                    {showConfirmPassword ? (
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
                    ) : (
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
                          d="M3.98 8.223A10.477 10.477 0 0 1 12 6c4.638 0 8.573 3.007 9.963 7.178a1.012 1.012 0 0 1 0 .639c-.373 1.097-.975 2.12-1.783 3.003M9.872 14.063A3 3 0 0 0 15 12m-3-3a3 3 0 0 0-2.128 5.063M6.238 17.761A10.478 10.478 0 0 1 2.036 12a1.012 1.012 0 0 1 0-.639c.354-1.042.871-2.025 1.518-2.915M15 19.5l-9-9"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Restablecer Contraseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordComponent;
