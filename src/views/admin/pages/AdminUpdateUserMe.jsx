import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavComponent from "../components/AdminNavComponent";
import AdminSidebar from "../components/AdminSidebar";
import AdminFooterComponent from "../components/AdminFooterComponent";
import Swal from 'sweetalert2';

const AdminUpdateUserMe = () => {
  const [userData, setUserData] = useState({});
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const token = localStorage.getItem("auth_token");
  const navigate = useNavigate();

  useEffect(() => {
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
      });
  }, [token]);

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

  const handleNewPasswordChange = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (newConfirmPassword !== newPassword) {
      setConfirmPasswordError('Las contraseñas no coinciden');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!passwordError && !confirmPasswordError) {
      const updates = {
        name: userData.name,
        lastname: userData.lastname,
        email: userData.email,
        phone: userData.phone,
        street: userData.street,
        city: userData.city,
        country: userData.country,
        zip: userData.zip,
        currentPassword,
        newPassword
      };

      try {
        await axios.patch(
          "http://localhost:3000/users/me",
          updates,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        Swal.fire({
          title: 'Éxito',
          text: 'Perfil actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/admin/account');
        });
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al actualizar el perfil',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        console.error("Error updating user data:", error);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-grow flex flex-col">
        <AdminNavComponent />
        <main className="flex justify-center items-center flex-grow bg-gray-100 py-10">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Actualizar Perfil</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-gray-700">Nombre</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={userData.name || ''}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-gray-700">Apellido</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={userData.lastname || ''}
                  onChange={(e) => setuserData({ ...userData, lastname: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full border p-2 rounded"
                    value={userData.email || ''}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Teléfono</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={userData.phone || ''}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Calle</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={userData.street || ''}
                    onChange={(e) => setUserData({ ...userData, street: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Ciudad</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={userData.city || ''}
                    onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">País</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={userData.country || ''}
                    onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Código Postal</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={userData.zip || ''}
                    onChange={(e) => setUserData({ ...userData, zip: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Contraseña Actual</label>
                  <input
                    type="password"
                    className="w-full border p-2 rounded"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Nueva Contraseña</label>
                  <input
                    type="password"
                    className="w-full border p-2 rounded"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                  />
                  {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                </div>
                <div>
                  <label className="block text-gray-700">Confirmar Nueva Contraseña</label>
                  <input
                    type="password"
                    className="w-full border p-2 rounded"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
                </div>
                <div className="flex justify-end space-x-4">
                  <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Actualizar
                  </button>
                  <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600" onClick={() => navigate('/admin/account')}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </main>
          <AdminFooterComponent />
        </div>
      </div>
    );
  };
  
  export default AdminUpdateUserMe;