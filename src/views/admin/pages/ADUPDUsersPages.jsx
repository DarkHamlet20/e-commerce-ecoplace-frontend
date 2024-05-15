import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import { showErrorAlert, showConfirmationAlert } from '../../../helpers/alerts';
import AdminFooterComponent from "../components/AdminFooterComponent";
import '../styles/AdminUPUsers.css';

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
    role: '', // Mantén esto vacío hasta obtener el valor del servidor
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
        `http://34.201.92.59:3000/users/admin/users/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = response.data;

      // Asigna el ID del rol y no solo el nombre
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        street: user.street,
        city: user.city,
        country: user.country,
        zip: user.zip,
        role: user.role._id, // Asegúrate de asignar el ObjectId
      }));
    } catch (error) {
      console.error('Error fetching user details', error);
      showErrorAlert('Error al obtener detalles del usuario');
    }
  };

  const fetchRoles = async () => {
    try {
      const rolesResponse = await axios.get('http://34.201.92.59:3000/roles', {
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
        `http://34.201.92.59:3000/users/admin/users/${id}`,
        {
          ...formData,
          role: formData.role, // Asegúrate de enviar el ID correcto
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
    <div className="edit-user-page">
      <AdminSidebar />
      <div className="main-content">
        <AdminNavComponent />
        <div className="form-container">
          <div className="card">
            <div className="header">
              <h1>Editar Usuario</h1>
              <button onClick={() => navigate('/admin/users/view')} className="btn btn-secondary">
                Regresar
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {Object.entries(formData).map(
                ([key, value]) =>
                  key !== 'role' && (
                    <div key={key} className="form-group">
                      <label htmlFor={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      <input
                        type="text"
                        name={key}
                        id={key}
                        value={value}
                        onChange={handleChange}
                        readOnly={key === 'createdAt' || key === 'email'}
                        className="form-control"
                      />
                    </div>
                  )
              )}
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-control"
                >
                  {roles.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.roleName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group text-center">
                <button type="submit" className="btn btn-primary">
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <AdminFooterComponent />
    </div>
  );
};

export default ADUPDUsersPages;
