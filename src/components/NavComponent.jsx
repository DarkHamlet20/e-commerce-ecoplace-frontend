/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import logo from '../../public/img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace (1).webp';
import { roles } from "../types/roles";

const NavComponent = ({ handleSide }) => {
  const navigate = useNavigate();

  // const handleUser = () => {
  //   navigate('/user')
  // }

  const redirectToCart = () => {
    navigate("/cart");
  };

  const [userData, setUserData] = useState({});
  const [userCart, setUserCart] = useState([]);
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => setUserData(response.data))
        .catch((error) => {
          console.error("There was an error with the request:", error);
          // Optionally, you can handle errors here or show a message to the user
        });

      axios.get("http://localhost:3000/carts", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => setUserCart(response.data))
        .catch((error) => {
          console.error("There was an error with the request:", error);
          // Optionally, you can handle errors here or show a message to the user
        });
    }
  }, [token]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        console.error("No se encontro el token de autenticacion.");
      }
      await axios.post(
        "http://localhost:3000/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("auth_token");
      localStorage.removeItem("userRole");
      // Si la petición es exitosa, elimina el token de localStorage y llama a onLogout
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Manejar cualquier error aquí, por ejemplo, mostrando un mensaje al usuario
    }
  };

  const [show, setShow] = useState(false);
  const [drop, setDrop] = useState(false);

  return (
    <>
      <nav className="bg-gray-900 smm:h-auto h-36">
        <div className="flex items-center justify-around p-4">
          {/* Logo */}

          <div>
            <NavLink
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="mr-3 rounded-full h-16" alt="EcoPlace Logo" />
              <span className="text-xl font-semibold whitespace-nowrap text-white">EcoPlace</span>
            </NavLink>
          </div>

          {/* NavButton */}

          <div>
            <ul className={`smm:flex md:w-96 right-16 top-24 flex-row smm:bg-transparent rounded bg-gray-800 items-center smm:static absolute md:mt-0 justify-around ${drop ? 'flex' : 'hidden'} `}>
              <li>
                <NavLink
                  to="/"
                  className="block py-2 px-3 text-white  rounded md:bg-transparent md:p-0"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="block py-2 px-3 rounded md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
                >
                  About
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="#"
                  className="block py-2 px-3 rounded md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
                >
                  Contact
                </NavLink>
              </li>
              {/* <button onClick={redirectToCart} className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                  <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                </button> */}
            </ul>
          </div>

          {/* Action buttons cart */}

          <div className="flex relative z-50 text-white items-center space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="mr-4">
              <button onClick={redirectToCart} className="text-white  hover:text-gray-300">
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                {
                  userCart?.items?.length !== 0
                    ? <span className="bg-red-700 text-xs rounded-full px-1 absolute top-2.5 left-3">{userCart?.items?.length}</span>
                    : ""
                }
              </button>
            </div>
            <div>
              <button
                onClick={() => setShow(!show)}
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>

              </button>
            </div>



            <div
              className={`"z-50 top-16 right-1 absolute my-4 text-base list-none divide-y  rounded-lg shadow bg-gray-700 divide-gray-600 " id="user-dropdown" ${show ? "block" : "hidden"
                }`}
            >

              <div className="px-4 py-3">
                <span className="block text-sm text-white">
                  {userData.name} {userData.lastname}
                </span>
                <span className="block text-sm truncate text-gray-400">
                  {userData.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    href="/user"
                    className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                  >
                    Acount
                  </a>
                </li>
                {
                  (userData?.role !== roles.seller)
                    ? ''
                    : <li>
                      <a
                        href={`/seller`}
                        className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                }
                <li>
                  <NavLink
                    to="#"
                    className="block px-4 py-2 text-sm   hover:bg-gray-600 text-gray-200 hover:text-white"
                  >
                    Settings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/order-confirmation"
                    className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                  >
                    Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    onClick={() => handleLogout()}
                    className="block px-4 py-2 text-sm   hover:bg-gray-600 text-gray-200 hover:text-white"
                  >
                    Sign out
                  </NavLink>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setDrop(!drop)}
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg smm:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600 "
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>

      </nav>
      <div>
        <h1
          onClick={() => handleSide()}
          className="bg-gray-900 text-white py-3 select-none cursor-pointer hover:bg-gray-700 transition-all px-4 smm:hidden"
        >
          Categories
        </h1>
      </div>
    </>
  );
};

export default NavComponent;