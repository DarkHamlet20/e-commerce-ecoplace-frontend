import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUserCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../public/img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace (1).webp";
import { roles } from "../types/roles";
import { useDispatch } from "react-redux";
import { removeCredentials } from "../auth/AuthSlice";

const NavComponent = ({
  handleSide,
  resetCategory,
  cartCount,
  fetchCart,
  toggleCategories,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const redirectToCart = () => {
    navigate("/cart");
  };

  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://34.201.92.59:3000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => setUserData(response.data))
        .catch((error) => {
          console.error("There was an error with the request:", error);
        });

      fetchCart();
    }
  }, [token, fetchCart]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        console.error("No se encontró el token de autenticación.");
      }
      await axios.post(
        "http://34.201.92.59:3000/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("auth_token");
      localStorage.removeItem("userRole");
      dispatch(removeCredentials());
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const [show, setShow] = useState(false);
  const [drop, setDrop] = useState(false);

  const isHomePageOrProductsPage = location.pathname === "/" || location.pathname.includes("/products");

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-green-600 p-4 shadow-lg relative z-50">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="cursor-pointer flex items-center space-x-3"
            >
              <NavLink
                to="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
                onClick={resetCategory}
              >
                <img src={logo} className="h-16" alt="EcoPlace Logo" />
                <span className="text-xl font-semibold text-white">
                  EcoPlace
                </span>
              </NavLink>
            </div>
          </div>

          {/* NavLinks */}
          <div className="hidden md:flex space-x-6 justify-center flex-grow">
            <NavLink
              to="/"
              className="text-white hover:text-gray-300 transition-colors"
              onClick={resetCategory}
            >
              Home
            </NavLink>
            <NavLink
              to="#"
              className="text-white hover:text-gray-300 transition-colors"
            >
              About
            </NavLink>
            <NavLink
              to="#"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Contact
            </NavLink>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-4 relative">
            <button
              onClick={redirectToCart}
              className="relative text-white hover:text-gray-300 transition-colors"
            >
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setShow(!show)}
              className="text-white hover:text-gray-300 transition-colors relative z-50"
            >
              <FontAwesomeIcon icon={faUserCircle} size="lg" />
            </button>
          </div>
        </div>

        {/* Toggle Button and Categories */}
        {isHomePageOrProductsPage && (
          <button
            onClick={toggleCategories}
            className="text-white hover:text-gray-300 transition-colors relative z-50 ml-4 mt-4"
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
            <span className="ml-2 text-white">Categorías</span>
          </button>
        )}

        {/* Dropdown Menu */}
        <div className={`md:hidden ${drop ? "block" : "hidden"} mt-4`}>
          <NavLink
            to="/"
            className="block py-2 px-4 text-white hover:bg-blue-700 hover:bg-opacity-75 rounded"
            onClick={resetCategory}
          >
            Home
          </NavLink>
          <NavLink
            to="#"
            className="block py-2 px-4 text-white hover:bg-blue-700 hover:bg-opacity-75 rounded"
          >
            About
          </NavLink>
          <NavLink
            to="#"
            className="block py-2 px-4 text-white hover:bg-blue-700 hover:bg-opacity-75 rounded"
          >
            Contact
          </NavLink>
        </div>

        {/* User Dropdown */}
        <div
          className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ${
            show ? "block" : "hidden"
          } z-50`}
        >
          {token ? (
            <>
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900">
                  {userData.name} {userData.lastname}
                </span>
                <span className="block text-sm text-gray-500 truncate">
                  {userData.email}
                </span>
              </div>
              <ul>
                <li>
                  <NavLink
                    to="/user"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    Account
                  </NavLink>
                </li>
                {userData?.role === roles.seller && (
                  <li>
                    <NavLink
                      to={`/seller`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink
                    to="/order-customer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    onClick={() => handleLogout()}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    Sign out
                  </NavLink>
                </li>
              </ul>
            </>
          ) : (
            <ul>
              <li>
                <NavLink
                  to="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Login
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavComponent;
