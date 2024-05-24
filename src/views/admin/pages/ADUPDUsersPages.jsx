import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import { showErrorAlert, showConfirmationAlert } from '../../../helpers/alerts';
import AdminFooterComponent from '../components/AdminFooterComponent';

const ADUPDUsersPages = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    country: '',
    zip: '',
    role: '',
  });

  const token = localStorage.getItem('auth_token');
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchUserDetails();
    fetchRoles();
  }, [id, token]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/admin/users/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = response.data;
      setFormData({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        street: user.street,
        city: user.city,
        country: user.country,
        zip: user.zip,
        role: user.role._id,
      });
    } catch (error) {
      console.error('Error fetching user details', error);
      showErrorAlert('Error al obtener detalles del usuario');
    }
  };

  const fetchRoles = async () => {
    try {
      const rolesResponse = await axios.get('http://localhost:3000/roles', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoles(rolesResponse.data);
    } catch (error) {
      console.error('Error fetching roles', error);
      showErrorAlert('Error al obtener roles');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:3000/users/admin/users/${id}`,
        {
          ...formData,
          role: formData.role,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await showConfirmationAlert('¡Éxito!', 'Usuario actualizado correctamente.', 'success', 'Aceptar');
      navigate('/admin/users/view');
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      showErrorAlert('Error al actualizar el usuario');
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-grow">
        <AdminNavComponent />
        <div className="p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => navigate('/admin/users/view')}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Regresar
              </button>
              <h1 className="text-2xl font-semibold">Editar Usuario</h1>
            </div>
            <form onSubmit={handleSubmit}>
              {Object.entries(formData).map(
                ([key, value]) =>
                  key !== 'role' && (
                    <div key={key} className="mb-4">
                      <label
                        htmlFor={key}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      <input
                        type="text"
                        name={key}
                        id={key}
                        value={value}
                        onChange={handleChange}
                        readOnly={key === 'email'}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  )
              )}
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {roles.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.roleName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
        <AdminFooterComponent />
      </div>
    </div>
  );
};

export default ADUPDUsersPages;
