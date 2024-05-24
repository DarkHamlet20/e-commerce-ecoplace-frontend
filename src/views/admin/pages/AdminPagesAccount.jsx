import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faMapMarkerAlt, faCog } from "@fortawesome/free-solid-svg-icons";
import AdminNavComponent from "../components/AdminNavComponent";
import AdminSidebar from "../components/AdminSidebar";
import AdminFooterComponent from "../components/AdminFooterComponent";

const AdminPagesAccount = () => {
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://34.201.92.59:3000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUserData(response.data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [token]);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-col flex-grow">
        <AdminNavComponent />
        <div className="flex-grow p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Cuenta del Administrador</h2>
              <Link
                to="/admin/account/settings"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              >
                <FontAwesomeIcon icon={faCog} className="mr-2" />
                Configurar Cuenta
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                <FontAwesomeIcon icon={faUserCircle} size="4x" className="mr-4" />
                <div>
                  <p className="text-lg font-medium">{userData?.name} {userData?.lastname}</p>
                  <p className="text-gray-600">{userData?.email}</p>
                  <p className="text-gray-600">{userData?.phone}</p>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} size="4x" className="mr-4" />
                <div>
                  <p className="text-lg font-medium">Dirección</p>
                  <p className="text-gray-600">{userData?.street}, {userData?.city}</p>
                  <p className="text-gray-600">{userData?.country}, {userData?.zip}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AdminFooterComponent />
      </div>
    </div>
  );
};

export default AdminPagesAccount;
