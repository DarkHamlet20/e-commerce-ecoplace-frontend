import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showErrorAlert, showConfirmationAlert } from "../../helpers/alerts";
import background from '../../../public/img/richard-horvath-cPccYbPrF-A-unsplash (1).jpg';
import logo from '../../../public/img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace (1).webp'

const ForgotPasswordComponent = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://34.201.92.59:3000/users/forgot-password", { email });
      localStorage.setItem('resetToken', response.data.resetToken); // Guarda el token en el almacenamiento local
      if (response.status === 200) {
        showConfirmationAlert(
          "Solicitud de restablecimiento de contraseña enviada",
          "Revisa tu correo electrónico para continuar con el restablecimiento de tu contraseña."
        ).then((result) => {
          if (result.isConfirmed) {
            navigate("/reset-password");
          }
        });
      }
    } catch (error) {
      console.error("Error solicitando restablecimiento de contraseña:", error);
      if (error.response && error.response.data && error.response.data.message) {
        showErrorAlert(
          "Error",
          error.response.data.message
        );
      } else {
        showErrorAlert(
          "Error",
          "Hubo un problema enviando la solicitud de restablecimiento de contraseña. Por favor, intenta nuevamente."
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
              Recupera tu contraseña
            </h1>
            <form className="space-y-4 md:space-y-4 text-black" onSubmit={handleForgotPassword}>
              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-black">
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
              <button
                type="submit"
                className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordComponent;
